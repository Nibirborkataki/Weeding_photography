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

  it('requires a known service and an occasion on step 0', () => {
    expect(Object.keys(validateBookingStep(0, {}, today)).sort()).toEqual(['occasion', 'serviceId'])
    expect(validateBookingStep(0, { serviceId: 'made-up', occasion: 'x' }, today).serviceId).toBeDefined()
    expect(validateBookingStep(0, { serviceId: 'ceremonies', occasion: 'Mundan ceremony' }, today)).toEqual({})
  })

  it('rejects past or same-day dates', () => {
    const base = { serviceId: 'weddings', venue: 'Goa', guests: '150-300' }
    expect(validateBookingStep(1, { ...base, date: '2026-09-30' }, today).date).toMatch(/future/)
    expect(validateBookingStep(1, { ...base, date: '2027-02-14' }, today)).toEqual({})
  })

  it('asks for a guest count only for weddings and ceremonies', () => {
    const base = { date: '2027-02-14', venue: 'Studio' }
    expect(validateBookingStep(1, { ...base, serviceId: 'ceremonies' }, today).guests).toBeDefined()
    expect(validateBookingStep(1, { ...base, serviceId: 'commercial' }, today)).toEqual({})
    expect(validateBookingStep(1, { ...base, serviceId: 'portraits' }, today)).toEqual({})
  })

  it('requires a package that belongs to the chosen service', () => {
    expect(validateBookingStep(2, { serviceId: 'weddings' }, today).packageId).toBeDefined()
    expect(validateBookingStep(2, { serviceId: 'weddings', packageId: 'celebration' }, today).packageId).toBeDefined()
    expect(validateBookingStep(2, { serviceId: 'weddings', packageId: 'signature' }, today)).toEqual({})
    expect(validateBookingStep(2, { serviceId: 'commercial', packageId: 'campaign' }, today)).toEqual({})
  })

  it('validates contact details on step 3, with a partner name only for weddings', () => {
    const contact = { name: 'A', email: 'bad', phone: 'abc' }
    expect(Object.keys(validateBookingStep(3, { ...contact, serviceId: 'weddings' }, today)).sort()).toEqual(['email', 'partnerName', 'phone'])
    expect(Object.keys(validateBookingStep(3, { ...contact, serviceId: 'ceremonies' }, today)).sort()).toEqual(['email', 'phone'])
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
