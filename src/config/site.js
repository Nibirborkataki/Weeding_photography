// Brand + business details in one place. Everything here is placeholder
// content — swap in the real studio details before launch.
export const site = {
  name: 'Aurelia',
  fullName: 'Aurelia Studio',
  tagline: 'Wedding Photography',
  established: 2014,
  email: 'hello@aureliastudio.com',
  phone: '+91 98765 43210',
  location: 'Based in India · Available worldwide',
  hours: 'Mon – Sat · 10am – 7pm',
  bookingYear: 2027,
  socials: [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'Pinterest', href: 'https://pinterest.com' },
    { label: 'YouTube', href: 'https://youtube.com' },
  ],
  stats: [
    { value: 450, suffix: '+', label: 'Weddings captured' },
    { value: 12, suffix: '', label: 'Countries travelled' },
    { value: 10, suffix: '+', label: 'Years of storytelling' },
    { value: 4.9, suffix: '', label: 'Average client rating', decimals: 1 },
  ],
  currency: { code: 'INR', locale: 'en-IN' },
}

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/contact', label: 'Contact' },
]

const priceFormatter = new Intl.NumberFormat(site.currency.locale, {
  style: 'currency',
  currency: site.currency.code,
  maximumFractionDigits: 0,
})

export const formatPrice = (amount) => priceFormatter.format(amount)
