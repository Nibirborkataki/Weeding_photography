import { useCallback, useEffect, useState } from 'react'
import { addReview, listReviews } from '../services/reviewService'

export function useReviews() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    listReviews().then((list) => {
      if (!alive) return
      setReviews(list)
      setLoading(false)
    })
    return () => {
      alive = false
    }
  }, [])

  const add = useCallback(async (input) => {
    const review = await addReview(input)
    setReviews((list) => [review, ...list])
    return review
  }, [])

  return { reviews, loading, add }
}
