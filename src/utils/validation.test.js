import { describe, it, expect } from 'vitest'
import {
  isEmail,
  passwordStrength,
  validateSignIn,
  validateSignUp,
  validateReview,
  validateContact,
  validateBookingStep,
  validateBooking,
  toISODate,
} from './validation'

describe('isEmail', () => {
  it('accepts normal addresses and rejects malformed ones', () => {
    expect(isEmail('bride@example.com')).toBe(true)
    expect(isEmail('  groom@studio.co.in ')).toBe(true)
    expect(isEmail('nope')).toBe(false)
    expect(isEmail('a@b')).toBe(false)
    expect(isEmail('')).toBe(false)
  })
})

describe('passwordStrength', () => {
  it('scores from 0 to 4', () => {
    expect(passwordStrength('')).toBe(0)
    expect(passwordStrength('abc')).toBe(1)
    expect(passwordStrength('Abcdefgh12!')).toBe(3)
    expect(passwordStrength('Abcdefghij12!')).toBe(4)
  })
})

describe('validateSignIn', () => {
  it('requires a valid email and a password', () => {
    expect(validateSignIn({ email: '', password: '' })).toEqual({
      email: expect.any(String),
      password: expect.any(String),
    })
    expect(validateSignIn({ email: 'a@b.com', password: 'x' })).toEqual({})
  })
})

describe('validateSignUp', () => {
  const valid = { name: 'Asha', email: 'asha@example.com', password: 'lovely123', confirmPassword: 'lovely123', acceptTerms: true }

  it('passes for complete input', () => {
    expect(validateSignUp(valid)).toEqual({})
  })

  it('flags weak passwords, mismatches and unaccepted terms', () => {
    expect(validateSignUp({ ...valid, password: 'short1', confirmPassword: 'short1' }).password).toMatch(/8 characters/)
    expect(validateSignUp({ ...valid, password: 'lettersonly', confirmPassword: 'lettersonly' }).password).toMatch(/number/)
    expect(validateSignUp({ ...valid, confirmPassword: 'different1' }).confirmPassword).toBeDefined()
    expect(validateSignUp({ ...valid, acceptTerms: false }).acceptTerms).toBeDefined()
  })
})

describe('validateReview', () => {
  it('requires name, a 1–5 rating and a meaningful message', () => {
    const errors = validateReview({ name: '', rating: 0, message: 'too short' })
    expect(Object.keys(errors).sort()).toEqual(['message', 'name', 'rating'])
    expect(validateReview({ name: 'Riya', rating: 5, message: 'An absolutely wonderful experience!' })).toEqual({})
    expect(validateReview({ name: 'Riya', rating: 6, message: 'An absolutely wonderful experience!' }).rating).toBeDefined()
  })
})

describe('validateContact', () => {
  it('requires every field', () => {
    expect(Object.keys(validateContact({})).sort()).toEqual(['email', 'message', 'name', 'subject'])
    expect(validateContact({ name: 'A', email: 'a@b.co', subject: 'general', message: 'Hello there, lovely work!' })).toEqual({})
  })
})

describe('validateBookingStep', () => {
  const today = new Date(2026, 8, 30) // 30 Sep 2026

  it('rejects past or same-day dates', () => {
    expect(validateBookingStep(0, { date: '2026-09-30', venue: 'Goa', guests: '100-200' }, today).date).toMatch(/future/)
    expect(validateBookingStep(0, { date: '2027-02-14', venue: 'Goa', guests: '100-200' }, today)).toEqual({})
  })

  it('requires a collection on step 1', () => {
    expect(validateBookingStep(1, {}, today).packageId).toBeDefined()
    expect(validateBookingStep(1, { packageId: 'signature' }, today)).toEqual({})
  })

  it('validates contact details on step 2', () => {
    const errors = validateBookingStep(2, { partnerOne: 'A', partnerTwo: '', email: 'bad', phone: 'abc' }, today)
    expect(Object.keys(errors).sort()).toEqual(['email', 'partnerTwo', 'phone'])
  })

  it('validateBooking merges all steps', () => {
    expect(Object.keys(validateBooking({}, today)).length).toBeGreaterThan(5)
  })
})

describe('toISODate', () => {
  it('formats local dates without timezone drift', () => {
    expect(toISODate(new Date(2027, 0, 5))).toBe('2027-01-05')
  })
})
