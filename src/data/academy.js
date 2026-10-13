// Prism Snap Academy — courses, workshops and batches. All names, prices, dates
// and student quotes are PLACEHOLDERS; replace them with the real programme.
const src = (name) => `/images/${name}.jpg`

export const learningModes = [
  { id: 'studio', label: 'In-studio', note: 'Small classroom batches, cameras to borrow' },
  { id: 'online', label: 'Live online', note: 'Interactive live classes from anywhere' },
]

export const modeLabel = (id) => learningModes.find((m) => m.id === id)?.label ?? ''

export const courses = [
  {
    id: 'foundations',
    name: 'Foundations',
    level: 'Beginner',
    tagline: 'From auto mode to confident manual',
    image: { src: src('academy-first-camera'), alt: 'Student holding a DSLR camera up to her eye' },
    prices: { studio: 14999, online: 9999 },
    duration: '4 weeks',
    sessions: '8 live sessions',
    schedule: 'Sat & Sun · 3 hrs',
    batchSize: 'Max 10 students',
    modules: [
      'Camera controls & the exposure triangle',
      'Composition & visual storytelling',
      'Natural light & golden hour',
      'Portraits of friends & family',
      'Editing basics in Lightroom',
    ],
  },
  {
    id: 'wedding-pro',
    name: 'Wedding & Event Pro',
    level: 'Intermediate',
    tagline: 'Shoot weddings & ceremonies with confidence',
    featured: true,
    image: { src: src('academy-wedding-shooter'), alt: 'Photographer shooting a bride and groom outdoors' },
    prices: { studio: 34999, online: 24999 },
    duration: '8 weeks',
    sessions: '16 sessions + 2 live shoots',
    schedule: 'Weekends · 3 hrs',
    batchSize: 'Max 8 students',
    modules: [
      'Candid storytelling & reading rituals',
      'Posing couples & families naturally',
      'Flash, low light & night receptions',
      'Covering haldi, pheras, annaprashan & more',
      'Culling, colour grading & album design',
      'Pricing, contracts & client workflow',
    ],
  },
  {
    id: 'commercial-studio',
    name: 'Product & Commercial',
    level: 'Intermediate',
    tagline: 'Studio lighting that sells',
    image: { src: src('academy-studio-setup'), alt: 'Photography studio with softboxes and lights' },
    prices: { studio: 24999, online: 17999 },
    duration: '6 weeks',
    sessions: '12 sessions',
    schedule: 'Weekday evenings · 2.5 hrs',
    batchSize: 'Max 8 students',
    modules: [
      'Studio lighting setups & modifiers',
      'Product, jewellery & food styling',
      'Fashion & lookbook direction',
      'Retouching & colour-accurate exports',
      'Briefs, usage rights & quoting',
    ],
  },
  {
    id: 'mentorship',
    name: '1:1 Mentorship',
    level: 'Advanced',
    tagline: 'A personal path to going pro',
    image: { src: src('academy-mentor'), alt: 'Mentor demonstrating a telephoto lens to students outdoors' },
    prices: { studio: 64999, online: 49999 },
    duration: '3 months',
    sessions: 'Weekly 1:1 + shadowing',
    schedule: 'Flexible timings',
    batchSize: 'Just you',
    modules: [
      'A learning plan built around your goals',
      'Shadow our lead photographers on real shoots',
      'Portfolio review & curation',
      'Brand, pricing & finding clients',
      'Ongoing feedback on your own work',
    ],
  },
]

// Rows for the "Compare courses" table, in the same order as `courses`.
export const compareRows = [
  { label: 'Level', values: ['Beginner', 'Intermediate', 'Intermediate', 'Advanced'] },
  { label: 'Live sessions', values: ['8', '16', '12', 'Weekly 1:1'] },
  { label: 'Hands-on shoots', values: ['Photo walks', '2 real weddings / ceremonies', 'Studio product shoots', 'Shadow real shoots'] },
  { label: 'Editing & colour grading', values: [true, true, true, true] },
  { label: 'Camera to borrow (in-studio)', values: [true, true, true, false] },
  { label: 'Portfolio review', values: [false, true, true, true] },
  { label: 'Business & pricing module', values: [false, true, true, true] },
  { label: 'Certificate & alumni community', values: [true, true, true, true] },
]

export const workshops = [
  {
    id: 'lightroom',
    name: 'Lightroom & Colour Grading',
    date: '2026-11-15',
    duration: '1 day · 6 hrs',
    mode: 'online',
    place: 'Live online',
    price: 3499,
    image: { src: src('academy-editing'), alt: 'Photo being edited in Lightroom on a laptop' },
  },
  {
    id: 'portrait-lighting',
    name: 'Portrait Lighting Essentials',
    date: '2026-11-22',
    duration: '1 day · 5 hrs',
    mode: 'studio',
    place: 'Prism Snap studio',
    price: 4499,
    image: { src: src('academy-studio-light'), alt: 'Studio light on a stand beside a chair and plants' },
  },
  {
    id: 'mobile-photography',
    name: 'Mobile Photography for Creators',
    date: '2026-11-29',
    duration: 'Half day · 3 hrs',
    mode: 'online',
    place: 'Live online',
    price: 1999,
    image: { src: src('academy-street-walk'), alt: 'Photographer walking down a street with a camera' },
  },
  {
    id: 'heritage-walk',
    name: 'Heritage Photo Walk',
    date: '2026-12-06',
    duration: 'Morning · 4 hrs',
    mode: 'studio',
    place: 'Old town, on location',
    price: 1499,
    image: { src: src('academy-photo-walk'), alt: 'Group of photographers on a photo walk in a garden' },
  },
]

export const batches = [
  { id: 'foundations-nov-studio', courseId: 'foundations', mode: 'studio', start: '2026-11-07', label: 'Weekend batch', seats: 3 },
  { id: 'foundations-nov-online', courseId: 'foundations', mode: 'online', start: '2026-11-14', label: 'Weekend batch', seats: 6 },
  { id: 'wedding-dec-studio', courseId: 'wedding-pro', mode: 'studio', start: '2026-12-05', label: 'Wedding-season batch', seats: 2 },
  { id: 'wedding-jan-online', courseId: 'wedding-pro', mode: 'online', start: '2027-01-09', label: 'Weekend batch', seats: 5 },
  { id: 'commercial-jan-studio', courseId: 'commercial-studio', mode: 'studio', start: '2027-01-12', label: 'Weekday evenings', seats: 4 },
  { id: 'commercial-feb-online', courseId: 'commercial-studio', mode: 'online', start: '2027-02-02', label: 'Weekday evenings', seats: 7 },
]

export const academyHighlights = [
  {
    title: 'Taught by working photographers',
    text: 'Learn from the team behind 450+ weddings and brand shoots — real experience, not slides.',
  },
  {
    title: 'Real shoots, not just theory',
    text: 'Pro students assist on actual weddings, ceremonies and studio sessions as part of the course.',
  },
  {
    title: 'Small batches',
    text: 'Never more than ten students, so every question gets answered and every image gets feedback.',
  },
  {
    title: 'Certificate & community',
    text: 'Graduate with a certificate, a portfolio review and lifetime access to our alumni group.',
  },
]

export const academyStats = [
  { value: 1200, suffix: '+', label: 'Students trained' },
  { value: 4.9, suffix: '', label: 'Average student rating', decimals: 1 },
  { value: 10, suffix: '', label: 'Students per batch, max' },
  { value: 6, suffix: ' mo', label: 'Access to class recordings' },
]

export const requirements = [
  {
    title: 'A camera with manual mode',
    text: 'Any DSLR or mirrorless camera works. No camera yet? In-studio students can borrow one during Foundations — and we’ll help you choose your first.',
  },
  {
    title: 'A laptop for editing',
    text: 'Windows or Mac with Adobe Lightroom installed (the free trial is enough to start). Needed from week three.',
  },
  {
    title: 'Time to practise',
    text: 'Plan 3–4 hours a week for assignments — that’s where the real learning happens.',
  },
  {
    title: 'For Pro courses & Mentorship',
    text: 'Foundations, or a short portfolio of 15–20 images, so we can place you in the right batch.',
  },
  {
    title: 'For live online classes',
    text: 'A stable internet connection and a quiet space. Classes run on Zoom; recordings stay available for six months.',
  },
  {
    title: 'Age 16 and above',
    text: 'Students under 18 need a parent’s consent. Curiosity matters far more than experience.',
  },
]

export const academyGallery = [
  { src: src('academy-field-class'), alt: 'Students learning on an outdoor shoot', caption: 'Field class' },
  { src: src('academy-street-shooter'), alt: 'Student photographing on a city street', caption: 'Street assignment' },
  { src: src('academy-young-filmmaker'), alt: 'Student filming with a camera on a gimbal', caption: 'Motion basics' },
  { src: src('academy-outdoor-shoot'), alt: 'Crew setting up an outdoor shoot in a field', caption: 'On-location shoot' },
  { src: src('academy-street-bw'), alt: 'Photographer crouching to frame a shot', caption: 'Finding the angle' },
]

// PLACEHOLDER student quotes — replace with real (consented) testimonials.
export const studentStories = [
  {
    name: 'Riya Das',
    course: 'Foundations · 2025',
    quote: 'I bought a camera and only ever used auto. Four weekends later I was shooting my cousin’s haldi in manual — and the family actually used my photos!',
  },
  {
    name: 'Arjun Mehta',
    course: 'Wedding & Event Pro · 2025',
    quote: 'Assisting on two real weddings changed everything. I booked my first paid wedding a month after the course ended.',
  },
  {
    name: 'Zoya Khan',
    course: 'Product & Commercial · 2026',
    quote: 'The lighting sessions were worth the fee on their own. I now shoot all the product photos for my jewellery store myself.',
  },
]

export const academyFaqs = [
  {
    q: 'I’ve never used a DSLR. Is that okay?',
    a: 'Absolutely — Foundations is built for complete beginners. We start with holding the camera and finish with you shooting confidently in manual.',
  },
  {
    q: 'Do I need to buy a camera before joining?',
    a: 'No. In-studio students can borrow a camera during Foundations, and we’ll help you choose the right first camera for your budget.',
  },
  {
    q: 'What if I miss a class?',
    a: 'Every session is recorded and stays available for six months. For in-studio batches, you can also join the same class in the next batch.',
  },
  {
    q: 'Can I pay in instalments?',
    a: 'Yes — courses above ₹20,000 can be paid in up to three instalments at no extra cost.',
  },
  {
    q: 'How do redeem codes work?',
    a: 'Enter your code in the enquiry form and tap Apply to preview the discount. One code per enrolment; codes can’t be combined, and the final fee is confirmed on our call.',
  },
  {
    q: 'What is the refund policy?',
    a: 'Full refund up to seven days before your batch starts, and 50% within the first week of classes.',
  },
]

// Interest options for the enquiry form, encoded as "kind:id".
export const interestOptions = [
  { label: 'Courses', options: courses.map((c) => ({ value: `course:${c.id}`, label: `${c.name} — ${c.level}` })) },
  { label: 'Weekend workshops', options: workshops.map((w) => ({ value: `workshop:${w.id}`, label: w.name })) },
  { label: 'Not sure yet', options: [{ value: 'undecided', label: 'Help me choose the right course' }] },
]

/** Resolves an interest value ("course:foundations") to the item, its kind and fee. */
export function resolveInterest(interest, mode) {
  const [kind, id] = String(interest ?? '').split(':')
  if (kind === 'course') {
    const item = courses.find((c) => c.id === id)
    if (!item) return null
    const chosenMode = item.prices[mode] != null ? mode : null
    return { kind, item, mode: chosenMode, amount: chosenMode ? item.prices[chosenMode] : null }
  }
  if (kind === 'workshop') {
    const item = workshops.find((w) => w.id === id)
    if (!item) return null
    return { kind, item, mode: item.mode, amount: item.price }
  }
  if (interest === 'undecided') return { kind: 'undecided', item: null, mode: mode || null, amount: null }
  return null
}

export const batchesFor = (courseId, mode) => batches.filter((b) => b.courseId === courseId && b.mode === mode)
