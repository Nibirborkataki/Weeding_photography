// Placeholder photography from Unsplash (free licence), stored in /public/images.
// To use your own work, drop a file with the same name into /public/images —
// or change the file names here.
const src = (name) => `/images/${name}.jpg`

export const images = {
  introPortrait: { src: src('bride-window'), alt: 'Bride standing by a sunlit window in her gown' },
  introDetail: { src: src('family-puja'), alt: 'Family performing a puja together at home' },
  bookingBand: { src: src('highland-embrace'), alt: 'Couple embracing on a hillside at golden hour' },
  signIn: { src: src('coastline-walk'), alt: 'Bride and groom walking along a rocky coastline' },
  signUp: { src: src('under-the-veil'), alt: 'Couple sharing a quiet moment under the veil' },
  aboutHeader: { src: src('mandap-rituals'), alt: 'Couple seated under a floral mandap during their ceremony' },
  aboutStory: { src: src('bridal-mirror'), alt: 'Black and white portrait of a bride at a mirror' },
  aboutDetail: { src: src('naming-ceremony'), alt: 'Mother holding her newborn close at a naming ceremony' },
  contactSide: { src: src('holding-hands'), alt: 'Bride and groom holding hands' },
  bookingSide: { src: src('golden-hour-walk'), alt: 'Couple walking through a field at golden hour' },
  notFound: { src: src('lakeside-aisle'), alt: 'Empty ceremony aisle beside a lake' },
}

export const portfolioCategories = [
  { id: 'all', label: 'All' },
  { id: 'weddings', label: 'Weddings' },
  { id: 'pre-wedding', label: 'Pre-wedding' },
  { id: 'ceremonies', label: 'Ceremonies' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'portraits', label: 'Portraits' },
]

// [file name, shape, title, place] — shape 'tall' (portrait) or 'wide' (landscape) drives the grid.
const work = {
  weddings: [
    ['golden-lights', 'tall', 'Golden lights', 'Jaipur'],
    ['mandap-rituals', 'wide', 'Under the mandap', 'Udaipur'],
    ['haldi-shower', 'tall', 'Haldi morning', 'Lucknow'],
    ['floral-aisle', 'wide', 'The aisle', 'Lake Como'],
    ['smoke-kiss', 'tall', 'Into the mist', 'Scottish Highlands'],
    ['bridal-rituals', 'wide', 'Before the pheras', 'Kolkata'],
    ['gold-rings', 'tall', 'Two rings', 'Udaipur'],
    ['the-toast', 'wide', 'The toast', 'Tuscany'],
    ['bride-window', 'tall', 'Morning light', 'Florence'],
    ['haldi-groom', 'wide', 'Marigold showers', 'Jaipur'],
    ['sacred-fire', 'tall', 'Sacred fire', 'Varanasi'],
    ['white-arch', 'wide', 'White arch', 'Goa'],
    ['seaside-couple', 'tall', 'Sea breeze', 'Amalfi Coast'],
    ['rings-hands', 'wide', 'Promises', 'Delhi'],
    ['haldi-marigold', 'tall', 'Yellow & gold', 'Pune'],
    ['ring-exchange', 'wide', 'The exchange', 'Kolkata'],
    ['under-the-veil', 'tall', 'Under the veil', 'Lisbon'],
    ['haldi-bride', 'wide', 'Haldi bride', 'Indore'],
    ['chandelier-vows', 'tall', 'Chandelier vows', 'Vienna'],
    ['mandap-ballroom', 'wide', 'Ballroom mandap', 'Dubai'],
    ['royal-portrait', 'tall', 'Royal', 'Jodhpur'],
    ['holding-hands', 'wide', 'Hand in hand', 'Pune'],
    ['reception-celebration', 'tall', 'Pure joy', 'Bengaluru'],
    ['sunset-kiss', 'tall', 'Last light', 'Bali'],
    ['bouquet-detail', 'tall', 'Blush & ivory', 'Paris'],
    ['autumn-ceremony', 'tall', 'Autumn vows', 'Vermont'],
    ['hands-bouquet', 'tall', 'Held close', 'Chennai'],
    ['evening-portrait', 'tall', 'Evening glow', 'Jaipur'],
    ['arch-kiss', 'tall', 'Just married', 'Sonoma'],
    ['bridal-mirror', 'tall', 'Reflection', 'Milan'],
    ['reception-table', 'wide', 'Table for two hundred', 'Hyderabad'],
  ],
  'pre-wedding': [
    ['coastline-walk', 'tall', 'Along the coast', 'Cornwall'],
    ['highland-embrace', 'wide', 'Highland embrace', 'Isle of Skye'],
    ['riverside-couple', 'tall', 'By the river', 'Rishikesh'],
    ['field-dance', 'wide', 'Meadow waltz', 'Provence'],
    ['forest-path', 'tall', 'Forest path', 'Coorg'],
    ['lakeside-portrait', 'wide', 'Still waters', 'Lake Bled'],
    ['meadow-dance', 'tall', 'Twirl', 'Ooty'],
    ['garden-walk', 'tall', 'Garden walk', 'Shillong'],
  ],
  ceremonies: [
    ['annaprashan-blessing', 'tall', 'First grains of rice', 'Kolkata'],
    ['mundan-ceremony', 'wide', 'Mundan morning', 'Varanasi'],
    ['family-puja', 'wide', 'Griha pravesh puja', 'Guwahati'],
    ['baby-sandalwood', 'wide', 'Chandan blessings', 'Kolkata'],
    ['grandmother-blessing', 'tall', 'Dadi’s blessing', 'Nagpur'],
    ['thread-ceremony', 'wide', 'Upanayan', 'Bhubaneswar'],
    ['havan-fire', 'wide', 'The havan', 'Haridwar'],
    ['little-devotee', 'wide', 'Little devotee', 'Pune'],
    ['naming-ceremony', 'wide', 'Namkaran', 'Lucknow'],
    ['first-birthday-smile', 'wide', 'First birthday', 'Mumbai'],
    ['ritual-offerings', 'wide', 'Offerings', 'Madurai'],
    ['festive-baby', 'wide', 'Festive first', 'Ahmedabad'],
    ['toddler-traditional', 'wide', 'Dressed for the day', 'Jaipur'],
  ],
  commercial: [
    ['jewellery-jhumka', 'tall', 'Temple jhumkas', 'Jaipur studio'],
    ['studio-fashion-bts', 'wide', 'On set', 'Mumbai studio'],
    ['product-serum', 'tall', 'Amber serum', 'Studio'],
    ['jewellery-necklace', 'wide', 'Heritage gold', 'Jaipur studio'],
    ['fashion-campaign', 'wide', 'Red season', 'Goa'],
    ['food-spices', 'tall', 'Spice route', 'Kochi'],
    ['jewellery-rings', 'wide', 'Solitaires', 'Studio'],
    ['studio-product-shoot', 'wide', 'Watch campaign — behind the scenes', 'Studio'],
    ['product-wellness', 'tall', 'Wellness line', 'Studio'],
    ['fashion-editorial', 'wide', 'Monochrome', 'Bengaluru'],
    ['jewellery-bangles', 'wide', 'Bridal bangles', 'Hyderabad'],
    ['food-platter', 'tall', 'Grazing table', 'Delhi'],
    ['fashion-portrait', 'wide', 'Tailored', 'Mumbai'],
  ],
  portraits: [
    ['maternity-golden-hour', 'tall', 'Waiting for you', 'Shillong'],
    ['family-studio', 'wide', 'The Sharmas', 'Guwahati studio'],
    ['newborn-portrait', 'tall', 'Ten days old', 'Pune'],
    ['maternity-red', 'wide', 'In bloom', 'Studio'],
    ['family-garden', 'tall', 'Sunday best', 'Chandigarh'],
    ['sibling-love', 'tall', 'Big sister', 'Bengaluru'],
    ['mother-daughter', 'tall', 'Mother & daughter', 'Kolkata'],
    ['maternity-silhouette', 'tall', 'Silhouette', 'Studio'],
    ['family-poolside', 'tall', 'Three generations', 'Goa'],
  ],
}

/** Spreads the categories evenly so the "All" view mixes every kind of work. */
function interleave(groups) {
  const entries = Object.entries(groups).map(([category, items]) => ({ category, items, used: 0 }))
  const total = entries.reduce((n, e) => n + e.items.length, 0)
  const out = []
  while (out.length < total) {
    const next = entries
      .filter((e) => e.used < e.items.length)
      .sort((a, b) => (a.used + 1) / a.items.length - (b.used + 1) / b.items.length)[0]
    out.push({ category: next.category, row: next.items[next.used++] })
  }
  return out
}

export const portfolio = interleave(work).map(({ category, row: [id, shape, title, place] }) => ({
  id,
  category,
  shape,
  title,
  place,
  src: src(id),
  alt: `${title} — ${place}`,
}))

export const featuredStories = [
  { id: 'ananya-rohan', title: 'Ananya & Rohan', type: 'Wedding', place: 'Udaipur, Rajasthan', year: 2026, src: src('golden-lights') },
  { id: 'aarav-annaprashan', title: 'Aarav’s Annaprashan', type: 'Rice ceremony', place: 'Kolkata, West Bengal', year: 2026, src: src('annaprashan-blessing') },
  { id: 'heritage-gold', title: 'Heritage Gold', type: 'Jewellery campaign', place: 'Jaipur studio', year: 2026, src: src('jewellery-jhumka') },
  { id: 'meera-arjun', title: 'Meera & Arjun', type: 'Pre-wedding', place: 'Rishikesh, Uttarakhand', year: 2025, src: src('riverside-couple') },
  { id: 'vihaan-mundan', title: 'Vihaan’s Mundan', type: 'Mundan ceremony', place: 'Varanasi, Uttar Pradesh', year: 2025, src: src('mundan-ceremony') },
  { id: 'priya-karan', title: 'Priya & Karan', type: 'Haldi', place: 'Pune, Maharashtra', year: 2025, src: src('haldi-marigold') },
  { id: 'sharma-family', title: 'The Sharmas', type: 'Maternity & family', place: 'Shillong, Meghalaya', year: 2025, src: src('maternity-golden-hour') },
]
