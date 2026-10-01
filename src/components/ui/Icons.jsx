export function ArrowRight({ size = 16 }) {
  return (
    <svg width={size} height={size * 0.625} viewBox="0 0 16 10" fill="none" aria-hidden="true" className="btn__arrow">
      <path d="M0 5h14.5M10.5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

export function ArrowLeft({ size = 16 }) {
  return (
    <svg width={size} height={size * 0.625} viewBox="0 0 16 10" fill="none" aria-hidden="true">
      <path d="M16 5H1.5M5.5 1l-4 4 4 4" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

export function Star({ filled = true, size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2.8l2.75 5.9 6.45.72-4.8 4.37 1.33 6.35L12 16.9l-5.73 3.24 1.33-6.35-4.8-4.37 6.45-.72z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Check({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4.5 12.5l5 5 10-11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Close({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

export function Eye({ open = true }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.2" />
      {!open && <path d="M4 20L20 4" stroke="currentColor" strokeWidth="1.2" />}
    </svg>
  )
}

export function GoogleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  )
}
