import { describe, it, expect } from 'vitest'
import { applyRedeemCode, normaliseCode } from './redeem'

const today = new Date(2026, 9, 13) // 13 Oct 2026

describe('applyRedeemCode', () => {
  it('normalises case and whitespace', () => {
    expect(normaliseCode('  firstFrame ')).toBe('FIRSTFRAME')
    expect(applyRedeemCode(' firstframe ', { kind: 'course', amount: 14999 }, today)).toMatchObject({ ok: true, code: 'FIRSTFRAME' })
  })

  it('applies percentage and flat discounts', () => {
    expect(applyRedeemCode('FIRSTFRAME', { kind: 'course', amount: 14999 }, today)).toMatchObject({ discount: 1500, total: 13499 })
    expect(applyRedeemCode('EARLYBIRD', { kind: 'course', amount: 24999 }, today)).toMatchObject({ discount: 2000, total: 22999 })
    expect(applyRedeemCode('WORKSHOP20', { kind: 'workshop', amount: 3499 }, today)).toMatchObject({ discount: 700, total: 2799 })
  })

  it('rejects unknown, expired or mismatched codes', () => {
    expect(applyRedeemCode('', { kind: 'course', amount: 100 }, today).ok).toBe(false)
    expect(applyRedeemCode('NOPE', { kind: 'course', amount: 100 }, today).error).toMatch(/valid/)
    expect(applyRedeemCode('EARLYBIRD', { kind: 'course', amount: 24999 }, new Date(2027, 0, 5)).error).toMatch(/expired/)
    expect(applyRedeemCode('FIRSTFRAME', { kind: 'workshop', amount: 3499 }, today).error).toMatch(/courses only/)
    expect(applyRedeemCode('WORKSHOP20', { kind: 'course', amount: 14999 }, today).error).toMatch(/workshops only/)
    expect(applyRedeemCode('FIRSTFRAME', { kind: 'undecided', amount: null }, today).error).toMatch(/Choose a course/)
  })

  it('enforces minimum fees', () => {
    expect(applyRedeemCode('EARLYBIRD', { kind: 'course', amount: 9999 }, today).error).toMatch(/above/)
  })
})
