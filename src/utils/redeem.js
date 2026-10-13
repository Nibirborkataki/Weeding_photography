import { redeemCodes } from '../data/redeemCodes'
import { formatPrice } from '../config/site'
import { toISODate } from './validation'

export const normaliseCode = (code) => String(code ?? '').trim().toUpperCase()

/**
 * Checks a redeem code against what's being bought.
 * @param {string} rawCode
 * @param {{ kind?: 'course' | 'workshop' | 'undecided', amount?: number | null }} purchase
 * @returns {{ ok: true, code, label, discount, total } | { ok: false, error }}
 */
export function applyRedeemCode(rawCode, { kind, amount } = {}, today = new Date()) {
  const code = normaliseCode(rawCode)
  if (!code) return { ok: false, error: 'Enter a code to apply.' }

  const offer = redeemCodes.find((c) => c.code === code)
  if (!offer) return { ok: false, error: 'That code isn’t valid.' }
  if (offer.validUntil && toISODate(today) > offer.validUntil) return { ok: false, error: 'That code has expired.' }
  if (kind !== 'course' && kind !== 'workshop') return { ok: false, error: 'Choose a course or workshop first.' }
  if (!offer.appliesTo.includes(kind)) {
    return { ok: false, error: kind === 'workshop' ? 'This code works on courses only.' : 'This code works on workshops only.' }
  }
  if (amount == null) return { ok: false, error: 'Choose how you’d like to learn first.' }
  if (offer.minAmount && amount < offer.minAmount) {
    return { ok: false, error: `Valid on fees above ${formatPrice(offer.minAmount)}.` }
  }

  const discount = offer.type === 'percent' ? Math.round((amount * offer.value) / 100) : Math.min(offer.value, amount)
  return { ok: true, code, label: offer.label, discount, total: amount - discount }
}
