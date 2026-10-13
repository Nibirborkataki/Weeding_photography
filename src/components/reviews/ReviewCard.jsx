import { Stars } from './Stars'
import styles from './ReviewCard.module.css'

const dateFormat = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' })

export default function ReviewCard({ review }) {
  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <Stars value={review.rating} />
        {review.occasion && <span className={styles.occasion}>{review.occasion}</span>}
      </div>
      {review.title && <h3 className={styles.title}>{review.title}</h3>}
      <p className={styles.message}>“{review.message}”</p>
      <footer className={styles.footer}>
        <span className={styles.avatar} aria-hidden="true">
          {review.name.charAt(0)}
        </span>
        <div>
          <p className={styles.name}>{review.name}</p>
          <p className={styles.meta}>
            {[review.location, dateFormat.format(new Date(review.createdAt))].filter(Boolean).join(' · ')}
          </p>
        </div>
      </footer>
    </article>
  )
}
