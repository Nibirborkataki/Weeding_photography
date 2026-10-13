// Placeholder collections and pricing per service — edit freely.
// `price: null` means the package is quoted per project.
export const packages = [
  // Weddings
  {
    id: 'essentials',
    serviceId: 'weddings',
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
    serviceId: 'weddings',
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
    serviceId: 'weddings',
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

  // Ceremonies & rituals
  {
    id: 'moments',
    serviceId: 'ceremonies',
    name: 'Moments',
    tagline: 'For intimate pujas & home rituals',
    price: 18000,
    coverage: 'Up to 3 hours',
    features: ['One photographer', '150+ edited photographs', 'Family group portraits', 'Online gallery in 10 days'],
  },
  {
    id: 'celebration',
    serviceId: 'ceremonies',
    name: 'Celebration',
    tagline: 'Rice ceremonies, mundans & namkarans',
    price: 32000,
    coverage: 'Up to 6 hours',
    featured: true,
    features: [
      'Photographer + assistant',
      '350+ edited photographs',
      'Candid + ritual coverage',
      '20-page keepsake album',
      'Online gallery in 10 days',
    ],
  },
  {
    id: 'family-heritage',
    serviceId: 'ceremonies',
    name: 'Family Heritage',
    tagline: 'Full-day functions & big gatherings',
    price: 55000,
    coverage: 'Full day',
    features: [
      'Two photographers',
      '600+ edited photographs',
      'Highlight film (2–3 min)',
      '30-page fine art album',
      'Sneak peek within 48 hours',
    ],
  },

  // Commercial & advertising
  {
    id: 'half-day',
    serviceId: 'commercial',
    name: 'Half-day Shoot',
    tagline: 'Products, menus & quick campaigns',
    price: 25000,
    coverage: 'Up to 4 hours · studio or on location',
    features: ['Shot list & lighting plan', '15 retouched hero images', 'Web & print-ready exports', 'Delivery in 5 working days'],
  },
  {
    id: 'full-day',
    serviceId: 'commercial',
    name: 'Full-day Shoot',
    tagline: 'Lookbooks, catalogues & jewellery',
    price: 45000,
    coverage: 'Up to 8 hours · studio or on location',
    featured: true,
    features: [
      'Creative direction call',
      '35 retouched hero images',
      'Styling & set coordination',
      'Social crops (1:1, 4:5, 9:16)',
      'Delivery in 7 working days',
    ],
  },
  {
    id: 'campaign',
    serviceId: 'commercial',
    name: 'Campaign',
    tagline: 'Multi-day brand campaigns',
    price: null,
    coverage: 'Scoped to your brief',
    features: [
      'Concept & moodboards',
      'Models, stylists & locations',
      'Photo + motion content',
      'Usage licensing for ads',
      'Dedicated producer',
    ],
  },

  // Portraits & family
  {
    id: 'mini-session',
    serviceId: 'portraits',
    name: 'Mini Session',
    tagline: 'A quick, relaxed portrait session',
    price: 9000,
    coverage: '45 minutes · 1 location',
    features: ['15 edited photographs', 'One outfit', 'Online gallery in 7 days'],
  },
  {
    id: 'portrait-session',
    serviceId: 'portraits',
    name: 'Signature Session',
    tagline: 'Maternity, couples & family',
    price: 16000,
    coverage: 'Up to 2 hours · 2 locations',
    featured: true,
    features: ['40 edited photographs', 'Two outfits', 'Posing & styling guidance', 'Online gallery in 7 days'],
  },
  {
    id: 'newborn-family',
    serviceId: 'portraits',
    name: 'Newborn & Family',
    tagline: 'At home, in the first weeks',
    price: 22000,
    coverage: 'Up to 3 hours · at home',
    features: ['50 edited photographs', 'Newborn props & wraps', 'Family & sibling portraits', 'Two fine art prints'],
  },
]

export const addOns = [
  { id: 'engagement', name: 'Engagement / pre-wedding session', price: 25000, services: ['weddings'] },
  { id: 'second-shooter', name: 'Additional photographer (per day)', price: 18000, services: ['weddings', 'ceremonies'] },
  { id: 'drone', name: 'Drone coverage', price: 15000, services: ['weddings', 'ceremonies'] },
  { id: 'same-day-edit', name: 'Same-day slideshow', price: 20000, services: ['weddings'] },
  { id: 'extra-album', name: 'Additional fine art album', price: 22000, services: ['weddings', 'ceremonies'] },
  { id: 'highlight-film', name: 'Highlight film (2–3 min)', price: 12000, services: ['ceremonies', 'portraits'] },
  { id: 'extra-hour', name: 'Extra hour of coverage', price: 4000, services: ['ceremonies', 'portraits'] },
  { id: 'reels', name: 'Short-form reels for social', price: 18000, services: ['commercial'] },
  { id: 'retouch-pack', name: '10 extra retouched images', price: 6000, services: ['commercial'] },
  { id: 'models-styling', name: 'Model & stylist coordination', price: 15000, services: ['commercial'] },
  { id: 'framed-print', name: 'Framed fine art print', price: 4500, services: ['portraits', 'ceremonies'] },
]

export const includedWithEvery = [
  'Colour grading in our signature film-inspired style',
  'Private online gallery to share and download',
  'Planning call & personalised shot list',
  'Full print release for personal use',
  'Travel within the city included',
]

export const getPackage = (id) => packages.find((p) => p.id === id) ?? null
export const packagesFor = (serviceId) => packages.filter((p) => p.serviceId === serviceId)
export const addOnsFor = (serviceId) => addOns.filter((a) => a.services.includes(serviceId))

/** Base package price plus add-ons; `null` when the package is quoted per project. */
export function estimateTotal(packageId, addOnIds = []) {
  const pkg = getPackage(packageId)
  if (!pkg || pkg.price == null) return null
  const extras = addOns.filter((a) => addOnIds.includes(a.id)).reduce((sum, a) => sum + a.price, 0)
  return pkg.price + extras
}
