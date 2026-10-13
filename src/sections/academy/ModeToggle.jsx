import { learningModes } from '../../data/academy'
import styles from './ModeToggle.module.css'

/** Segmented "In-studio / Live online" switch with a sliding highlight. */
export default function ModeToggle({ value, onChange, name = 'learning-mode', label = 'Learning format', tone = 'light' }) {
  const index = Math.max(0, learningModes.findIndex((m) => m.id === value))
  return (
    <div
      className={`${styles.toggle} ${tone === 'dark' ? styles.dark : ''}`}
      role="radiogroup"
      aria-label={label}
      style={{ '--index': index, '--count': learningModes.length }}
    >
      {learningModes.map((mode) => (
        <label key={mode.id} className={`${styles.option} ${value === mode.id ? styles.active : ''}`}>
          <input
            type="radio"
            name={name}
            value={mode.id}
            checked={value === mode.id}
            onChange={() => onChange(mode.id)}
            className="visually-hidden"
          />
          {mode.label}
        </label>
      ))}
    </div>
  )
}
