import { read, write, simulateLatency, createId, ServiceError } from './storage'
import { validateBooking, hasErrors } from '../utils/validation'
import { estimateTotal } from '../data/packages'

const BOOKINGS = 'bookings'
const REF_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

function makeReference() {
  let code = ''
  for (let i = 0; i < 6; i++) code += REF_CHARS[Math.floor(Math.random() * REF_CHARS.length)]
  return `AUR-${code}`
}

export async function createBooking(data) {
  const errors = validateBooking(data)
  if (hasErrors(errors)) throw new ServiceError('Some booking details are missing.', errors)
  await simulateLatency(900)

  const booking = {
    id: createId(),
    reference: makeReference(),
    status: 'pending',
    createdAt: new Date().toISOString(),
    date: data.date,
    venue: data.venue.trim(),
    guests: data.guests,
    packageId: data.packageId,
    addOns: data.addOns ?? [],
    partnerOne: data.partnerOne.trim(),
    partnerTwo: data.partnerTwo.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    message: data.message?.trim() ?? '',
    estimatedTotal: estimateTotal(data.packageId, data.addOns),
  }
  write(BOOKINGS, [booking, ...read(BOOKINGS, [])])
  return booking
}

export async function listBookings() {
  return read(BOOKINGS, [])
}
