import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap'
import { lockScroll, unlockScroll } from '../../lib/smoothScroll'
import { ArrowLeft, ArrowRight, Close } from './Icons'
import styles from './Lightbox.module.css'

/** Full-screen image viewer with keyboard (← → Esc) support. */
export default function Lightbox({ items, index, onClose, onChange }) {
  const ref = useRef(null)
  const closeRef = useRef(null)
  const item = items[index]
  const count = items.length

  useEffect(() => {
    const previouslyFocused = document.activeElement
    lockScroll()
    closeRef.current?.focus()
    return () => {
      unlockScroll()
      previouslyFocused?.focus?.()
    }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onChange((index + 1) % count)
      if (e.key === 'ArrowLeft') onChange((index - 1 + count) % count)
      if (e.key === 'Tab') {
        // Keep focus inside the dialog.
        const focusable = ref.current.querySelectorAll('button')
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [index, count, onClose, onChange])

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from(ref.current, { autoAlpha: 0, duration: 0.5, ease: 'power2.out' })
    },
    { scope: ref },
  )

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.fromTo(`.${styles.figure}`, { autoAlpha: 0, scale: 0.97 }, { autoAlpha: 1, scale: 1, duration: 0.7, ease: 'power3.out' })
    },
    { scope: ref, dependencies: [index] },
  )

  if (!item) return null

  return createPortal(
    <div
      ref={ref}
      className={styles.lightbox}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} — image ${index + 1} of ${count}`}
      data-lenis-prevent
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button ref={closeRef} type="button" className={styles.close} onClick={onClose} aria-label="Close viewer">
        <Close />
      </button>
      <button
        type="button"
        className={`${styles.nav} ${styles.prev}`}
        onClick={() => onChange((index - 1 + count) % count)}
        aria-label="Previous image"
      >
        <ArrowLeft size={22} />
      </button>
      <figure className={styles.figure} key={item.id}>
        <img src={item.src} alt={item.alt} />
        <figcaption>
          <span className={styles.title}>{item.title}</span>
          <span className={styles.meta}>
            {item.place} · {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </span>
        </figcaption>
      </figure>
      <button
        type="button"
        className={`${styles.nav} ${styles.next}`}
        onClick={() => onChange((index + 1) % count)}
        aria-label="Next image"
      >
        <ArrowRight size={22} />
      </button>
    </div>,
    document.body,
  )
}
