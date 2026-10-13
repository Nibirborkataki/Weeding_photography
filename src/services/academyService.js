import { read, write, simulateLatency, createId, ServiceError } from './storage'
import { validateAcademyEnquiry, hasErrors } from '../utils/validation'
import { applyRedeemCode, normaliseCode } from '../utils/redeem'
import { batches, resolveInterest } from '../data/academy'

const ENQUIRIES = 'academy-enquiries'
const REF_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

function makeReference() {
  let code = ''
  for (let i = 0; i < 6; i++) code += REF_CHARS[Math.floor(Math.random() * REF_CHARS.length)]
  return `PSA-${code}`
}

/** Saves an Academy enquiry, re-checking any redeem code (as a backend would). */
export async function createEnquiry(data, today = new Date()) {
  const errors = validateAcademyEnquiry(data)
  if (hasErrors(errors)) throw new ServiceError('Please check the highlighted fields.', errors)

  const interest = resolveInterest(data.interest, data.mode)
  if (!interest) throw new ServiceError('Please choose what you’d like to learn.', { interest: 'Please choose an option.' })

  const code = normaliseCode(data.redeemCode)
  let redeem = null
  if (code) {
    redeem = applyRedeemCode(code, interest, today)
    if (!redeem.ok) throw new ServiceError(redeem.error, { redeemCode: redeem.error })
  }
  await simulateLatency(800)

  const batch = batches.find((b) => b.id === data.batchId && b.courseId === interest.item?.id && b.mode === interest.mode)
  const enquiry = {
    id: createId(),
    reference: makeReference(),
    createdAt: new Date().toISOString(),
    name: data.name.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    kind: interest.kind,
    itemId: interest.item?.id ?? null,
    itemName: interest.item?.name ?? 'Not sure yet',
    mode: interest.mode,
    batchId: batch?.id ?? null,
    experience: data.experience ?? '',
    message: data.message?.trim() ?? '',
    fee: interest.amount,
    redeemCode: redeem?.code ?? null,
    discount: redeem?.discount ?? 0,
    total: interest.amount == null ? null : interest.amount - (redeem?.discount ?? 0),
  }
  write(ENQUIRIES, [enquiry, ...read(ENQUIRIES, [])])
  return enquiry
}

export async function listEnquiries() {
  return read(ENQUIRIES, [])
}
