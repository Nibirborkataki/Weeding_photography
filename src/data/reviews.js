// PLACEHOLDER testimonials for layout purposes only.
// Replace these with genuine client reviews (with permission) before launch.
const src = (name) => `/images/${name}.jpg`

export const seedReviews = [
  {
    id: 'seed-1',
    name: 'Ananya & Rohan',
    location: 'Udaipur, Rajasthan',
    rating: 5,
    title: 'Every ritual, every tear, every laugh',
    message:
      'We were so nervous about being in front of a camera, but within ten minutes we forgot they were even there. Our album feels like living the whole wedding again — the pheras at sunset, my nani dancing, all of it.',
    createdAt: '2026-03-14T10:00:00.000Z',
    image: src('golden-lights'),
  },
  {
    id: 'seed-2',
    name: 'Claire & James',
    location: 'Amalfi Coast, Italy',
    rating: 5,
    title: 'Worth every single moment',
    message:
      'They flew out for our clifftop ceremony and somehow made a windy, chaotic day look like a film. The light, the colours, the tiny details we never noticed — we are completely in love with our photographs.',
    createdAt: '2026-01-22T10:00:00.000Z',
    image: src('seaside-couple'),
  },
  {
    id: 'seed-3',
    name: 'Meera & Arjun',
    location: 'Rishikesh, Uttarakhand',
    rating: 5,
    title: 'Calm, kind and incredibly talented',
    message:
      'From the planning call to the final album, everything felt effortless. They kept our families organised for portraits and still caught every candid moment by the river. We could not have asked for more.',
    createdAt: '2025-12-02T10:00:00.000Z',
    image: src('riverside-couple'),
  },
  {
    id: 'seed-4',
    name: 'Sofia & Daniel',
    location: 'Vienna, Austria',
    rating: 5,
    title: 'Pure elegance',
    message:
      'Our ballroom wedding was dark and moody, and we were worried. The photographs are glowing, romantic and timeless — exactly what we hoped for. Our parents cried looking at them.',
    createdAt: '2025-10-18T10:00:00.000Z',
    image: src('chandelier-vows'),
  },
  {
    id: 'seed-5',
    name: 'Priya & Karan',
    location: 'Jodhpur, Rajasthan',
    rating: 5,
    title: 'Three days, zero stress',
    message:
      'Three days, four events and hundreds of guests — and the team never missed a beat. The sneak peek arrived two days later and our phones have not stopped buzzing since.',
    createdAt: '2025-08-09T10:00:00.000Z',
    image: src('royal-portrait'),
  },
  {
    id: 'seed-6',
    name: 'Emma & Liam',
    location: 'Lake Bled, Slovenia',
    rating: 4,
    title: 'Beautiful, honest photographs',
    message:
      'Such a gentle, thoughtful approach. The gallery took a little longer than expected in peak season, but the result was absolutely worth the wait.',
    createdAt: '2025-06-27T10:00:00.000Z',
    image: src('lakeside-portrait'),
  },
]
