import { useMemo, useState } from 'react'
import PageHeader from '../components/ui/PageHeader'
import RatingSummary from '../components/reviews/RatingSummary'
import ReviewCard from '../components/reviews/ReviewCard'
import Reveal from '../components/motion/Reveal'
import ReviewSection from '../sections/ReviewSection'
import { useReviews } from '../hooks/useReviews'
import { usePageTitle } from '../hooks/usePageTitle'
import { smoothScrollTo } from '../lib/smoothScroll'
import styles from './Reviews.module.css'

const SORTS = {
  newest: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  highest: (a, b) => b.rating - a.rating || new Date(b.createdAt) - new Date(a.createdAt),
}

export default function Reviews() {
  usePageTitle('Reviews')
  const { reviews, loading, add } = useReviews()
  const [sort, setSort] = useState('newest')
  const sorted = useMemo(() => [...reviews].sort(SORTS[sort]), [reviews, sort])

  return (
    <>
      <PageHeader
        eyebrow="Client reviews"
        title={
          <>
            In their <em>own words</em>
          </>
        }
        intro="Every review here comes from a couple we had the joy of photographing. Thank you for trusting us with your day."
      >
        <button
          type="button"
          className="link-arrow"
          onClick={() => smoothScrollTo(document.getElementById('leave-review'), -80)}
        >
          Write a review ↓
        </button>
      </PageHeader>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.toolbar}>
            {!loading && <RatingSummary reviews={reviews} />}
            <label className={styles.sort}>
              <span className="field__label">Sort by</span>
              <select className="field__input" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="newest">Most recent</option>
                <option value="highest">Highest rated</option>
              </select>
            </label>
          </div>

          {loading ? (
            <p className="muted">Loading reviews…</p>
          ) : (
            <Reveal className={styles.grid} stagger={0.08} key={sort}>
              {sorted.map((r) => (
                <ReviewCard key={r.id} review={r} />
              ))}
            </Reveal>
          )}
        </div>
      </section>

      <ReviewSection reviews={reviews} onSubmit={add} />
    </>
  )
}
