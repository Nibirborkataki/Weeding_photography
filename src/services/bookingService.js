import { read, write, simulateLatency, createId, ServiceError } from './storage'
import { validateBooking, hasErrors, needsGuestCount, needsPartnerName } from '../utils/validation'
import { addOnsFor, estimateTotal } from '../data/packages'

const BOOKINGS = 'bookings'
const REF_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

function makeReference() {
  let code = ''
  for (let i = 0; i < 6; i++) code += REF_CHARS[Math.floor(Math.random() * REF_CHARS.length)]
  return `PSS-${code}`
}

export async function createBooking(data) {
  const errors = validateBooking(data)
  if (hasErrors(errors)) throw new ServiceError('Some booking details are missing.', errors)
  await simulateLatency(900)

  // Only keep add-ons that belong to the chosen service.
  const allowed = new Set(addOnsFor(data.serviceId).map((a) => a.id))
  const chosenAddOns = (data.addOns ?? []).filter((id) => allowed.has(id))

  const booking = {
    id: createId(),
    reference: makeReference(),
    status: 'pending',
    createdAt: new Date().toISOString(),
    serviceId: data.serviceId,
    occasion: data.occasion,
    date: data.date,
    venue: data.venue.trim(),
    guests: needsGuestCount(data.serviceId) ? data.guests : '',
    packageId: data.packageId,
    addOns: chosenAddOns,
    name: data.name.trim(),
    partnerName: needsPartnerName(data.serviceId) ? data.partnerName.trim() : '',
    company: data.company?.trim() ?? '',
    email: data.email.trim(),
    phone: data.phone.trim(),
    message: data.message?.trim() ?? '',
    // null when the package is quoted per project (e.g. commercial campaigns)
    estimatedTotal: estimateTotal(data.packageId, chosenAddOns),
  }
  write(BOOKINGS, [booking, ...read(BOOKINGS, [])])
  return booking
}

export async function listBookings() {
  return read(BOOKINGS, [])
}
