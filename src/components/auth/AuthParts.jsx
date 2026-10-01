import { useState } from 'react'
import Field from '../ui/Field'
import { Eye, GoogleLogo } from '../ui/Icons'
import styles from './AuthParts.module.css'

/** "Continue with Google" — simulated until real OAuth is connected. */
export function GoogleButton({ onClick, loading, disabled }) {
  return (
    <button type="button" className={styles.google} onClick={onClick} disabled={disabled || loading}>
      {loading ? <span className="spinner" aria-hidden="true" /> : <GoogleLogo />}
      <span>{loading ? 'Connecting to Google…' : 'Continue with Google'}</span>
    </button>
  )
}

export function Divider({ children = 'or' }) {
  return (
    <div className={styles.divider} role="separator">
      <span>{children}</span>
    </div>
  )
}

export function PasswordField(props) {
  const [visible, setVisible] = useState(false)
  return (
    <Field
      {...props}
      type={visible ? 'text' : 'password'}
      adornment={
        <button
          type="button"
          className={styles.reveal}
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
        >
          <Eye open={!visible} />
        </button>
      }
    />
  )
}

const STRENGTH_LABELS = ['', 'Weak', 'Okay', 'Good', 'Strong']

export function StrengthMeter({ score }) {
  return (
    <div className={styles.meter} aria-live="polite">
      <div className={styles.meterBars} aria-hidden="true">
        {[1, 2, 3, 4].map((n) => (
          <span key={n} className={n <= score ? styles[`s${score}`] : undefined} />
        ))}
      </div>
      <span className={styles.meterLabel}>{score ? `Password strength: ${STRENGTH_LABELS[score]}` : ''}</span>
    </div>
  )
}

export function DemoNotice() {
  return (
    <p className={styles.notice}>
      <strong>Demo mode:</strong> accounts are stored only in this browser until the backend is connected.
    </p>
  )
}
