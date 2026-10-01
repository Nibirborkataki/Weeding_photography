import styles from './Marquee.module.css'

/** Infinite, decorative band of words. */
export default function Marquee({ words = ['Love', 'Light', 'Legacy', 'Forever'] }) {
  const row = (
    <span className={styles.row}>
      {words.map((w, i) => (
        <span key={w} className={i % 2 ? styles.outline : undefined}>
          {w}
          <span className={styles.star}>✦</span>
        </span>
      ))}
    </span>
  )
  return (
    <div className={styles.marquee} aria-hidden="true">
      <div className={styles.track}>
        {row}
        {row}
      </div>
    </div>
  )
}
