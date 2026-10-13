// PLACEHOLDER redeem codes for the Academy. These live in the frontend only so
// the discount can be previewed — real codes must be validated by the backend.
export const redeemCodes = [
  { code: 'FIRSTFRAME', type: 'percent', value: 10, label: '10% off your first course', appliesTo: ['course'] },
  {
    code: 'EARLYBIRD',
    type: 'flat',
    value: 2000,
    label: '₹2,000 early-bird discount',
    appliesTo: ['course'],
    minAmount: 10000,
    validUntil: '2026-12-31',
  },
  { code: 'PRISMFAMILY', type: 'percent', value: 15, label: '15% off for Prism Snap clients & alumni', appliesTo: ['course', 'workshop'] },
  { code: 'WORKSHOP20', type: 'percent', value: 20, label: '20% off any weekend workshop', appliesTo: ['workshop'] },
]

/** The code we advertise on the site. */
export const featuredCode = redeemCodes[0]
