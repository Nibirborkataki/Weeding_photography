import SplitReveal from '../components/motion/SplitReveal'
import Reveal from '../components/motion/Reveal'
import RatingSummary from '../components/reviews/RatingSummary'
import ReviewForm from '../components/reviews/ReviewForm'
import styles from './ReviewSection.module.css'

/** "Share your experience" block: rating summary + review form. */
export default function ReviewSection({ reviews, onSubmit, alt = true }) {
  return (
    <section id="leave-review" className={`section ${alt ? 'section--alt' : ''}`} aria-labelledby="review-form-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.intro}>
          <p className="eyebrow">Leave a review</p>
          <SplitReveal as="h2" id="review-form-title" className="display-md">
            Share your <em>experience</em>
          </SplitReveal>
          <Reveal>
            <p className="lead">
              Were we part of your wedding, ceremony or campaign? We’d love to hear how it felt — your words help
              others find us, and they make our whole week.
            </p>
          </Reveal>
          {reviews.length > 0 && (
            <Reveal className={styles.summary}>
              <RatingSummary reviews={reviews} />
            </Reveal>
          )}
        </div>
        <Reveal className={styles.formCol} y={50}>
          <ReviewForm onSubmit={onSubmit} />
        </Reveal>
      </div>
    </section>
  )
}
