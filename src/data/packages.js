// Placeholder collections and pricing — edit freely.
export const packages = [
  {
    id: 'essentials',
    name: 'Essentials',
    tagline: 'For intimate weddings & elopements',
    price: 85000,
    coverage: 'Up to 8 hours · 1 day',
    features: [
      'Lead photographer',
      '400+ hand-edited photographs',
      'Private online gallery',
      'Sneak peek within 72 hours',
      'Full gallery in 4 weeks',
    ],
  },
  {
    id: 'signature',
    name: 'Signature',
    tagline: 'Our most-loved collection',
    price: 145000,
    coverage: 'Up to 10 hours/day · 2 days',
    featured: true,
    features: [
      'Lead + second photographer',
      '900+ hand-edited photographs',
      'Pre-wedding session',
      '40-page fine art album',
      'Sneak peek within 72 hours',
      'Private online gallery',
    ],
  },
  {
    id: 'heirloom',
    name: 'Heirloom',
    tagline: 'Every ritual, the complete story',
    price: 245000,
    coverage: 'Full coverage · 3 days',
    features: [
      'Two photographers + cinematographer',
      '1,500+ hand-edited photographs',
      'Destination pre-wedding shoot',
      'Cinematic highlight film',
      'Two heirloom albums + parent albums',
      'Priority editing (3 weeks)',
    ],
  },
]

export const addOns = [
  { id: 'engagement', name: 'Engagement / pre-wedding session', price: 25000 },
  { id: 'second-shooter', name: 'Additional photographer (per day)', price: 18000 },
  { id: 'drone', name: 'Drone coverage', price: 15000 },
  { id: 'same-day-edit', name: 'Same-day slideshow', price: 20000 },
  { id: 'extra-album', name: 'Additional fine art album', price: 22000 },
]

export const includedWithEvery = [
  'Colour grading in our signature film-inspired style',
  'Private online gallery to share with family',
  'Full print release for personal use',
  'Planning call & personalised shot list',
  'Travel within the city included',
]

export const getPackage = (id) => packages.find((p) => p.id === id) ?? null

export function estimateTotal(packageId, addOnIds = []) {
  const base = getPackage(packageId)?.price ?? 0
  const extras = addOns.filter((a) => addOnIds.includes(a.id)).reduce((sum, a) => sum + a.price, 0)
  return base + extras
}
