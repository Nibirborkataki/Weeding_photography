import { read, write, simulateLatency, createId, ServiceError } from './storage'
import { validateReview, hasErrors } from '../utils/validation'
import { seedReviews } from '../data/reviews'

const REVIEWS = 'reviews'

const byNewest = (a, b) => new Date(b.createdAt) - new Date(a.createdAt)

export async function listReviews() {
  await simulateLatency(150)
  return [...read(REVIEWS, []), ...seedReviews].sort(byNewest)
}

export async function addReview(input) {
  const errors = validateReview(input)
  if (hasErrors(errors)) throw new ServiceError('Please check the highlighted fields.', errors)
  await simulateLatency()

  const review = {
    id: createId(),
    name: input.name.trim(),
    location: input.location?.trim() ?? '',
    rating: Number(input.rating),
    title: input.title?.trim() ?? '',
    message: input.message.trim(),
    createdAt: new Date().toISOString(),
  }
  write(REVIEWS, [review, ...read(REVIEWS, [])])
  return review
}

export function summarizeReviews(reviews) {
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  for (const r of reviews) distribution[r.rating] = (distribution[r.rating] ?? 0) + 1
  const count = reviews.length
  const average = count ? Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / count) * 10) / 10 : 0
  return { count, average, distribution }
}
