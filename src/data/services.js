// The studio's service lines. Weddings are the specialty; everything else
// is shot with the same eye. Copy and lists are placeholders — edit freely.
const src = (name) => `/images/${name}.jpg`

export const services = [
  {
    id: 'weddings',
    name: 'Weddings',
    eyebrow: 'Our specialty',
    tagline: 'Every ritual, every glance, every dance.',
    description:
      'Our first love and our specialty. From the haldi to the vidaai, we document every ritual, every tear and every dance — candid, timeless and unhurried.',
    image: { src: src('golden-lights'), alt: 'Bride and groom portrait under golden lights' },
    highlights: [
      'Wedding day & multi-day coverage',
      'Pre-wedding & engagement shoots',
      'Haldi, mehendi & sangeet',
      'Reception & after-party',
      'Cinematic films & heirloom albums',
    ],
    occasions: ['Wedding day', 'Multi-day wedding', 'Pre-wedding shoot', 'Engagement', 'Reception'],
    portfolioCategory: 'weddings',
    flagship: true,
  },
  {
    id: 'ceremonies',
    name: 'Ceremonies & Rituals',
    shortName: 'Ceremonies',
    eyebrow: 'Family milestones',
    tagline: 'The sacred little firsts.',
    description:
      'A baby’s first taste of rice, a quiet mundan, a home blessed for the first time. We photograph the rituals that shape a family — respectfully, and without getting in the way.',
    image: { src: src('annaprashan-blessing'), alt: 'Baby in a traditional topor during an annaprashan ceremony' },
    highlights: [
      'Annaprashan (rice ceremony)',
      'Mundan ceremony',
      'Namkaran / naming ceremony',
      'Upanayan / thread ceremony',
      'Griha pravesh & pujas',
      'Baby showers, birthdays & anniversaries',
    ],
    occasions: [
      'Annaprashan (rice ceremony)',
      'Mundan ceremony',
      'Namkaran / naming ceremony',
      'Upanayan / thread ceremony',
      'Griha pravesh / puja',
      'Baby shower',
      'Birthday or anniversary',
      'Other ceremony',
    ],
    portfolioCategory: 'ceremonies',
  },
  {
    id: 'commercial',
    name: 'Commercial & Advertising',
    shortName: 'Commercial',
    eyebrow: 'For brands',
    tagline: 'Imagery that sells the story.',
    description:
      'Campaign, product and lifestyle photography for brands, jewellers, restaurants and businesses — art-directed, retouched and delivered ready for print, web and social.',
    image: { src: src('studio-fashion-bts'), alt: 'Photographer and stylist on a fashion shoot in the studio' },
    highlights: [
      'Product & e-commerce',
      'Jewellery & luxury',
      'Fashion & lookbooks',
      'Food & hospitality',
      'Brand campaigns & social content',
      'Corporate portraits & events',
    ],
    occasions: [
      'Product / e-commerce',
      'Jewellery',
      'Fashion / lookbook',
      'Food & hospitality',
      'Brand campaign',
      'Corporate portraits or event',
    ],
    portfolioCategory: 'commercial',
  },
  {
    id: 'portraits',
    name: 'Portraits & Family',
    shortName: 'Portraits',
    eyebrow: 'Just you',
    tagline: 'Chapters worth framing.',
    description:
      'Maternity, newborn, family and personal portraits. Relaxed sessions in soft light — at home, outdoors or in the studio.',
    image: { src: src('maternity-golden-hour'), alt: 'Maternity portrait in a field at golden hour' },
    highlights: ['Maternity', 'Newborn & baby', 'Family portraits', 'Personal branding & headshots'],
    occasions: ['Maternity', 'Newborn & baby', 'Family portraits', 'Personal branding / headshots'],
    portfolioCategory: 'portraits',
  },
]

export const getService = (id) => services.find((s) => s.id === id) ?? null
export const serviceLabel = (service) => service?.shortName ?? service?.name ?? ''
