// Placeholder photography from Unsplash (free licence), stored in /public/images.
// To use your own work, drop a file with the same name into /public/images —
// or change the file names here.
const src = (name) => `/images/${name}.jpg`

export const images = {
  introPortrait: { src: src('bride-window'), alt: 'Bride standing by a sunlit window in her gown' },
  introDetail: { src: src('rings-hands'), alt: 'Close-up of a couple’s hands wearing wedding rings' },
  bookingBand: { src: src('highland-embrace'), alt: 'Couple embracing on a hillside at golden hour' },
  signIn: { src: src('coastline-walk'), alt: 'Bride and groom walking along a rocky coastline' },
  signUp: { src: src('under-the-veil'), alt: 'Couple sharing a quiet moment under the veil' },
  servicesHeader: { src: src('reception-table'), alt: 'Elegant reception table set with flowers and candles' },
  aboutHeader: { src: src('mandap-rituals'), alt: 'Couple seated under a floral mandap during their ceremony' },
  aboutStory: { src: src('bridal-mirror'), alt: 'Black and white portrait of a bride at a mirror' },
  aboutDetail: { src: src('hands-bouquet'), alt: 'Hands resting over a bridal bouquet' },
  reviewsHeader: { src: src('the-toast'), alt: 'Guests raising glasses in a toast' },
  contactSide: { src: src('holding-hands'), alt: 'Bride and groom holding hands' },
  bookingSide: { src: src('golden-hour-walk'), alt: 'Couple walking through a field at golden hour' },
  notFound: { src: src('lakeside-aisle'), alt: 'Empty ceremony aisle beside a lake' },
}

// category: ceremony | portraits | pre-wedding | details | reception
// shape: 'tall' (portrait) or 'wide' (landscape) — drives the gallery grid.
export const portfolio = [
  { id: 'golden-lights', category: 'portraits', shape: 'tall', title: 'Golden lights', place: 'Jaipur' },
  { id: 'floral-aisle', category: 'ceremony', shape: 'wide', title: 'The aisle', place: 'Lake Como' },
  { id: 'coastline-walk', category: 'pre-wedding', shape: 'tall', title: 'Along the coast', place: 'Cornwall' },
  { id: 'gold-rings', category: 'details', shape: 'tall', title: 'Two rings', place: 'Udaipur' },
  { id: 'mandap-rituals', category: 'ceremony', shape: 'wide', title: 'Under the mandap', place: 'Udaipur' },
  { id: 'smoke-kiss', category: 'portraits', shape: 'tall', title: 'Into the mist', place: 'Scottish Highlands' },
  { id: 'dance-floor', category: 'reception', shape: 'wide', title: 'First dance', place: 'Mumbai' },
  { id: 'bride-window', category: 'portraits', shape: 'tall', title: 'Morning light', place: 'Florence' },
  { id: 'highland-embrace', category: 'pre-wedding', shape: 'wide', title: 'Highland embrace', place: 'Isle of Skye' },
  { id: 'sacred-fire', category: 'ceremony', shape: 'tall', title: 'Sacred fire', place: 'Varanasi' },
  { id: 'bouquet-detail', category: 'details', shape: 'tall', title: 'Blush & ivory', place: 'Paris' },
  { id: 'the-toast', category: 'reception', shape: 'wide', title: 'The toast', place: 'Tuscany' },
  { id: 'seaside-couple', category: 'portraits', shape: 'tall', title: 'Sea breeze', place: 'Amalfi Coast' },
  { id: 'riverside-couple', category: 'pre-wedding', shape: 'tall', title: 'By the river', place: 'Rishikesh' },
  { id: 'white-arch', category: 'ceremony', shape: 'wide', title: 'White arch', place: 'Goa' },
  { id: 'rings-hands', category: 'details', shape: 'wide', title: 'Promises', place: 'Delhi' },
  { id: 'under-the-veil', category: 'portraits', shape: 'tall', title: 'Under the veil', place: 'Lisbon' },
  { id: 'reception-celebration', category: 'reception', shape: 'tall', title: 'Pure joy', place: 'Bengaluru' },
  { id: 'chandelier-vows', category: 'ceremony', shape: 'tall', title: 'Chandelier vows', place: 'Vienna' },
  { id: 'field-dance', category: 'pre-wedding', shape: 'wide', title: 'Meadow waltz', place: 'Provence' },
  { id: 'royal-portrait', category: 'portraits', shape: 'tall', title: 'Royal', place: 'Jodhpur' },
  { id: 'shoes-bouquet', category: 'details', shape: 'wide', title: 'Getting ready', place: 'Santorini' },
  { id: 'glasshouse-ceremony', category: 'ceremony', shape: 'wide', title: 'Glasshouse', place: 'Singapore' },
  { id: 'sunset-kiss', category: 'portraits', shape: 'tall', title: 'Last light', place: 'Bali' },
  { id: 'forest-path', category: 'pre-wedding', shape: 'tall', title: 'Forest path', place: 'Coorg' },
  { id: 'reception-table', category: 'reception', shape: 'wide', title: 'Table for two hundred', place: 'Hyderabad' },
  { id: 'ring-box', category: 'details', shape: 'tall', title: 'Heirloom', place: 'London' },
  { id: 'autumn-ceremony', category: 'ceremony', shape: 'tall', title: 'Autumn vows', place: 'Vermont' },
  { id: 'lakeside-portrait', category: 'pre-wedding', shape: 'wide', title: 'Still waters', place: 'Lake Bled' },
  { id: 'first-look', category: 'portraits', shape: 'tall', title: 'First look', place: 'Kyoto' },
  { id: 'hands-bouquet', category: 'details', shape: 'tall', title: 'Held close', place: 'Chennai' },
  { id: 'ring-exchange', category: 'ceremony', shape: 'wide', title: 'The exchange', place: 'Kolkata' },
  { id: 'evening-portrait', category: 'portraits', shape: 'tall', title: 'Evening glow', place: 'Jaipur' },
  { id: 'meadow-dance', category: 'pre-wedding', shape: 'tall', title: 'Twirl', place: 'Ooty' },
  { id: 'bridal-bouquet', category: 'details', shape: 'wide', title: 'The bouquet', place: 'Copenhagen' },
  { id: 'mandap-ballroom', category: 'ceremony', shape: 'wide', title: 'Ballroom mandap', place: 'Dubai' },
  { id: 'chapel-doors', category: 'portraits', shape: 'tall', title: 'Chapel doors', place: 'Prague' },
  { id: 'garden-walk', category: 'pre-wedding', shape: 'tall', title: 'Garden walk', place: 'Shillong' },
  { id: 'holding-hands', category: 'details', shape: 'wide', title: 'Hand in hand', place: 'Pune' },
  { id: 'arch-kiss', category: 'ceremony', shape: 'tall', title: 'Just married', place: 'Sonoma' },
  { id: 'bridal-mirror', category: 'portraits', shape: 'tall', title: 'Reflection', place: 'Milan' },
  { id: 'autumn-bouquet', category: 'portraits', shape: 'tall', title: 'Autumn bouquet', place: 'Kyoto' },
  { id: 'quiet-moment', category: 'portraits', shape: 'wide', title: 'A quiet moment', place: 'Guwahati' },
  { id: 'lakeside-aisle', category: 'ceremony', shape: 'wide', title: 'Lakeside', place: 'Lake Tahoe' },
].map((item) => ({ ...item, src: src(item.id), alt: `${item.title} — wedding photograph, ${item.place}` }))

export const portfolioCategories = [
  { id: 'all', label: 'All' },
  { id: 'ceremony', label: 'Ceremony' },
  { id: 'portraits', label: 'Portraits' },
  { id: 'pre-wedding', label: 'Pre-wedding' },
  { id: 'details', label: 'Details' },
  { id: 'reception', label: 'Reception' },
]

export const featuredStories = [
  { id: 'ananya-rohan', couple: 'Ananya & Rohan', place: 'Udaipur, Rajasthan', year: 2026, src: src('golden-lights') },
  { id: 'claire-james', couple: 'Claire & James', place: 'Amalfi Coast, Italy', year: 2026, src: src('seaside-couple') },
  { id: 'meera-arjun', couple: 'Meera & Arjun', place: 'Rishikesh, Uttarakhand', year: 2025, src: src('riverside-couple') },
  { id: 'sofia-daniel', couple: 'Sofia & Daniel', place: 'Vienna, Austria', year: 2025, src: src('chandelier-vows') },
  { id: 'priya-karan', couple: 'Priya & Karan', place: 'Jodhpur, Rajasthan', year: 2025, src: src('royal-portrait') },
]
