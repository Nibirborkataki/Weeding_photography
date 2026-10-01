import { useState } from 'react'
import { Star } from '../ui/Icons'
import styles from './Stars.module.css'

/** Read-only star display. */
export function Stars({ value, size = 16 }) {
  return (
    <span className={styles.stars} role="img" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} filled={n <= Math.round(value)} size={size} />
      ))}
    </span>
  )
}

const LABELS = ['', 'Poor', 'Fair', 'Good', 'Great', 'Unforgettable']

/** Accessible 1–5 star picker built on radio inputs. */
export function StarInput({ value, onChange, error, name = 'rating' }) {
  const [hover, setHover] = useState(0)
  const shown = hover || Number(value) || 0

  return (
    <fieldset className={`${styles.fieldset} ${error ? styles.invalid : ''}`} aria-describedby={error ? `${name}-error` : undefined}>
      <legend className="field__label">Your rating</legend>
      <div className={styles.picker} onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <label key={n} className={`${styles.option} ${n <= shown ? styles.on : ''}`} onMouseEnter={() => setHover(n)}>
            <input
              type="radio"
              name={name}
              value={n}
              checked={Number(value) === n}
              onChange={() => onChange(n)}
              aria-invalid={error ? true : undefined}
              className="visually-hidden"
            />
            <Star filled={n <= shown} size={28} />
            <span className="visually-hidden">
              {n} star{n > 1 ? 's' : ''}
            </span>
          </label>
        ))}
        <span className={styles.label} aria-hidden="true">
          {LABELS[shown]}
        </span>
      </div>
      {error && (
        <p id={`${name}-error`} className="field__error">
          {error}
        </p>
      )}
    </fieldset>
  )
}
