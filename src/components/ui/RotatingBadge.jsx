import { useId } from 'react'
import styles from './RotatingBadge.module.css'

/** Circular text badge that slowly rotates. Decorative. */
export default function RotatingBadge({ text }) {
  const id = useId().replace(/:/g, '')
  return (
    <div className={styles.badge} aria-hidden="true">
      <svg viewBox="0 0 120 120" className={styles.ring}>
        <defs>
          <path id={id} d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
        </defs>
        <text className={styles.text}>
          <textPath href={`#${id}`} textLength="288" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <span className={styles.center}>✦</span>
    </div>
  )
}
