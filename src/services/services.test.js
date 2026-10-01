import { describe, it, expect } from 'vitest'
import * as auth from './authService'
import { createBooking, listBookings } from './bookingService'
import { addReview, listReviews, summarizeReviews } from './reviewService'
import { sendMessage } from './contactService'
import { seedReviews } from '../data/reviews'
import { estimateTotal } from '../data/packages'

const account = { name: 'Asha Rao', email: 'Asha@Example.com', password: 'lovely123', confirmPassword: 'lovely123', acceptTerms: true }

describe('authService (mock)', () => {
  it('signs up, persists the session and never exposes the password hash', async () => {
    const user = await auth.signUp(account)
    expect(user).toMatchObject({ name: 'Asha Rao', email: 'asha@example.com', provider: 'password' })
    expect(user).not.toHaveProperty('passwordHash')
    expect(auth.getCurrentUser()).toEqual(user)
  })

  it('rejects duplicate emails', async () => {
    await auth.signUp(account)
    await expect(auth.signUp(account)).rejects.toMatchObject({ fieldErrors: { email: expect.any(String) } })
  })

  it('signs in with the right password only', async () => {
    await auth.signUp(account)
    await auth.signOut()
    expect(auth.getCurrentUser()).toBeNull()

    await expect(auth.signIn({ email: 'asha@example.com', password: 'wrong-pass1' })).rejects.toThrow(/Incorrect/)
    const user = await auth.signIn({ email: ' ASHA@example.com ', password: 'lovely123' })
    expect(user.email).toBe('asha@example.com')
  })

  it('simulates Google sign-in', async () => {
    const user = await auth.signInWithGoogle()
    expect(user.provider).toBe('google')
    expect(auth.getCurrentUser()).toEqual(user)
  })
})

describe('bookingService (mock)', () => {
  const booking = {
    date: '2099-02-14',
    venue: 'Taj Lake Palace, Udaipur',
    guests: '200-400',
    packageId: 'signature',
    addOns: ['drone'],
    partnerOne: 'Asha',
    partnerTwo: 'Vikram',
    email: 'asha@example.com',
    phone: '+91 98765 43210',
  }

  it('creates a booking with a reference and estimated total', async () => {
    const created = await createBooking(booking)
    expect(created.reference).toMatch(/^AUR-[A-Z2-9]{6}$/)
    expect(created.status).toBe('pending')
    expect(created.estimatedTotal).toBe(estimateTotal('signature', ['drone']))
    expect(await listBookings()).toHaveLength(1)
  })

  it('refuses incomplete bookings', async () => {
    await expect(createBooking({ ...booking, email: '' })).rejects.toMatchObject({ fieldErrors: { email: expect.any(String) } })
  })
})

describe('reviewService (mock)', () => {
  it('lists seed reviews and puts new reviews first', async () => {
    expect(await listReviews()).toHaveLength(seedReviews.length)
    const review = await addReview({ name: 'Nisha', rating: 5, message: 'Our photographs are simply magical.' })
    const all = await listReviews()
    expect(all).toHaveLength(seedReviews.length + 1)
    expect(all[0].id).toBe(review.id)
  })

  it('summarises ratings', () => {
    const summary = summarizeReviews([{ rating: 5 }, { rating: 4 }, { rating: 5 }])
    expect(summary).toEqual({ count: 3, average: 4.7, distribution: { 5: 2, 4: 1, 3: 0, 2: 0, 1: 0 } })
    expect(summarizeReviews([]).average).toBe(0)
  })
})

describe('contactService (mock)', () => {
  it('validates before sending', async () => {
    await expect(sendMessage({})).rejects.toThrow()
    const sent = await sendMessage({ name: 'A', email: 'a@b.co', subject: 'general', message: 'Hello, we love your work!' })
    expect(sent.id).toBeDefined()
  })
})
