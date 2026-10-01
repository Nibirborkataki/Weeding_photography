import { useMemo } from 'react'
import { Stars } from './Stars'
import { summarizeReviews } from '../../services/reviewService'
import styles from './RatingSummary.module.css'

export default function RatingSummary({ reviews, showBars = true }) {
  const { count, average, distribution } = useMemo(() => summarizeReviews(reviews), [reviews])

  return (
    <div className={styles.summary}>
      <div className={styles.score}>
        <span className={styles.average}>{average.toFixed(1)}</span>
        <div>
          <Stars value={average} size={18} />
          <p className={styles.count}>
            Based on {count} review{count === 1 ? '' : 's'}
          </p>
        </div>
      </div>
      {showBars && (
        <ul className={styles.bars} aria-label="Rating breakdown">
          {[5, 4, 3, 2, 1].map((n) => {
            const share = count ? (distribution[n] / count) * 100 : 0
            return (
              <li key={n}>
                <span>{n}★</span>
                <span className={styles.track}>
                  <span className={styles.fill} style={{ width: `${share}%` }} />
                </span>
                <span className={styles.num}>{distribution[n]}</span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
