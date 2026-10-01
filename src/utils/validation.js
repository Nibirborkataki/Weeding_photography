// Pure validators shared by forms and services. Each returns an object of
// { fieldName: message }; an empty object means the input is valid.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_RE = /^[+()\-\s\d]{7,20}$/

const isBlank = (value) => value == null || String(value).trim() === ''

export const isEmail = (value) => EMAIL_RE.test(String(value ?? '').trim())
export const hasErrors = (errors) => Object.keys(errors).length > 0

/** Local date as YYYY-MM-DD (avoids UTC off-by-one from toISOString). */
export function toISODate(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function checkEmail(errors, email) {
  if (isBlank(email)) errors.email = 'Please enter your email address.'
  else if (!isEmail(email)) errors.email = 'That email address doesn’t look quite right.'
}

/** 0 (empty) to 4 (strong). */
export function passwordStrength(password = '') {
  if (!password) return 0
  let score = 0
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++
  if (/\d/.test(password) && /[^A-Za-z0-9]/.test(password)) score++
  return Math.max(1, score)
}

export function validateSignIn({ email, password } = {}) {
  const errors = {}
  checkEmail(errors, email)
  if (isBlank(password)) errors.password = 'Please enter your password.'
  return errors
}

export function validateSignUp({ name, email, password, confirmPassword, acceptTerms } = {}) {
  const errors = {}
  if (isBlank(name)) errors.name = 'Please tell us your name.'
  checkEmail(errors, email)
  if (isBlank(password)) errors.password = 'Please choose a password.'
  else if (password.length < 8) errors.password = 'Use at least 8 characters.'
  else if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) errors.password = 'Mix letters and at least one number.'
  if (confirmPassword !== password) errors.confirmPassword = 'Passwords don’t match.'
  if (!acceptTerms) errors.acceptTerms = 'Please accept the terms to continue.'
  return errors
}

export function validateReview({ name, rating, title, message } = {}) {
  const errors = {}
  if (isBlank(name)) errors.name = 'Please add your name.'
  const stars = Number(rating)
  if (!Number.isInteger(stars) || stars < 1 || stars > 5) errors.rating = 'Please choose a rating.'
  if (title && title.trim().length > 80) errors.title = 'Keep the title under 80 characters.'
  const text = String(message ?? '').trim()
  if (text.length < 20) errors.message = 'Tell us a little more (at least 20 characters).'
  else if (text.length > 800) errors.message = 'Please keep it under 800 characters.'
  return errors
}

export function validateContact({ name, email, subject, message } = {}) {
  const errors = {}
  if (isBlank(name)) errors.name = 'Please add your name.'
  checkEmail(errors, email)
  if (isBlank(subject)) errors.subject = 'Please choose a subject.'
  if (String(message ?? '').trim().length < 10) errors.message = 'Your message is a little short.'
  return errors
}

export const BOOKING_STEPS = ['Date & venue', 'Collection', 'Your details', 'Confirm']

export function validateBookingStep(step, data = {}, today = new Date()) {
  const errors = {}
  if (step === 0) {
    if (isBlank(data.date)) errors.date = 'Please choose your wedding date.'
    else if (data.date <= toISODate(today)) errors.date = 'Please choose a date in the future.'
    if (isBlank(data.venue)) errors.venue = 'Where is the celebration?'
    if (isBlank(data.guests)) errors.guests = 'Please pick a guest count.'
  }
  if (step === 1) {
    if (isBlank(data.packageId)) errors.packageId = 'Please choose a collection.'
  }
  if (step === 2) {
    if (isBlank(data.partnerOne)) errors.partnerOne = 'Please add your name.'
    if (isBlank(data.partnerTwo)) errors.partnerTwo = 'Please add your partner’s name.'
    checkEmail(errors, data.email)
    if (isBlank(data.phone)) errors.phone = 'Please add a phone number.'
    else if (!PHONE_RE.test(String(data.phone).trim())) errors.phone = 'That phone number doesn’t look right.'
  }
  return errors
}

export function validateBooking(data, today = new Date()) {
  return {
    ...validateBookingStep(0, data, today),
    ...validateBookingStep(1, data, today),
    ...validateBookingStep(2, data, today),
  }
}
