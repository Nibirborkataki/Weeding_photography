import { useRef, useState } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap'
import { lockScroll, unlockScroll } from '../../lib/smoothScroll'
import { site } from '../../config/site'
import styles from './Loader.module.css'

const SEEN_KEY = 'aurelia:intro-seen'
const CIRCUMFERENCE = 2 * Math.PI * 58

function hasSeenIntro() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1'
  } catch {
    return false
  }
}

/**
 * First-load screen: a gold ring draws around the monogram while a counter
 * runs to 100, then two layered curtains lift to reveal the site.
 * Plays at double speed on reloads within the same browser session.
 */
export default function Loader({ onReveal, onComplete }) {
  const root = useRef(null)
  const countRef = useRef(null)
  const [quick] = useState(hasSeenIntro)

  useGSAP(
    () => {
      try {
        sessionStorage.setItem(SEEN_KEY, '1')
      } catch {
        // ignore
      }
      let locked = true
      lockScroll()
      const release = () => {
        if (!locked) return
        locked = false
        unlockScroll()
      }

      const finish = () => {
        release()
        onComplete()
      }

      if (prefersReducedMotion()) {
        gsap.timeline({ onComplete: finish }).add(onReveal, 0.4).to(root.current, { autoAlpha: 0, duration: 0.4 })
        return release
      }

      const counter = { n: 0 }
      const tl = gsap.timeline({ onComplete: finish })
      tl.fromTo(`.${styles.ring}`, { strokeDashoffset: CIRCUMFERENCE }, { strokeDashoffset: 0, duration: 2.3, ease: 'power2.inOut' }, 0)
        .fromTo(`.${styles.bar}`, { scaleX: 0 }, { scaleX: 1, duration: 2.3, ease: 'power2.inOut' }, 0)
        .to(
          counter,
          {
            n: 100,
            duration: 2.3,
            ease: 'power2.inOut',
            onUpdate: () => {
              if (countRef.current) countRef.current.textContent = String(Math.round(counter.n)).padStart(3, '0')
            },
          },
          0,
        )
        .from(`.${styles.monogram}`, { yPercent: 100, autoAlpha: 0, duration: 1.3, ease: 'power4.out' }, 0.2)
        .from(`.${styles.letter}`, { yPercent: 120, duration: 1.1, stagger: 0.06, ease: 'power4.out' }, 0.35)
        .from(`.${styles.fade}`, { autoAlpha: 0, y: 12, duration: 0.9, stagger: 0.1 }, 0.7)
        // Hold until webfonts are ready so the reveal never shows a font swap.
        .add(() => {
          if (document.fonts?.status === 'loaded') return
          tl.pause()
          document.fonts.ready.then(() => tl.resume())
        })
        .to(`.${styles.content}`, { autoAlpha: 0, y: -24, duration: 0.55, ease: 'power2.in' }, '+=0.15')
        .add(onReveal)
        .to(`.${styles.panel}`, { yPercent: -100, duration: 1.25, ease: 'expo.inOut' }, '<')
        .to(`.${styles.underlay}`, { yPercent: -100, duration: 1.25, ease: 'expo.inOut' }, '<0.12')

      if (quick) tl.timeScale(1.8)
      return release
    },
    { scope: root },
  )

  return (
    <div ref={root} className={styles.loader} role="status" aria-label={`Loading ${site.fullName}`}>
      <div className={styles.underlay} />
      <div className={styles.panel}>
        <div className={styles.content}>
          <div className={styles.center}>
            <div className={styles.emblem}>
              <svg viewBox="0 0 128 128" className={styles.svg} aria-hidden="true">
                <circle cx="64" cy="64" r="58" className={styles.track} />
                <circle cx="64" cy="64" r="58" className={styles.ring} strokeDasharray={CIRCUMFERENCE} />
              </svg>
              <span className={styles.monogramMask}>
                <span className={styles.monogram}>{site.name[0]}</span>
              </span>
            </div>
            <p className={styles.brand} aria-hidden="true">
              {site.name.split('').map((ch, i) => (
                <span key={i} className={styles.letterMask}>
                  <span className={styles.letter}>{ch}</span>
                </span>
              ))}
            </p>
            <p className={`${styles.tagline} ${styles.fade}`}>{site.tagline}</p>
          </div>

          <div className={styles.footer}>
            <p className={styles.fade}>Capturing love stories since {site.established}</p>
            <p className={styles.count} aria-hidden="true">
              <span ref={countRef}>000</span>
            </p>
          </div>
          <div className={styles.bar} />
        </div>
      </div>
    </div>
  )
}
