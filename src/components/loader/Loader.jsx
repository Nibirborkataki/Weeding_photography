import { useId, useRef, useState } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap'
import { lockScroll, unlockScroll } from '../../lib/smoothScroll'
import { site } from '../../config/site'
import { monogramPaths } from './monogramStrokes'
import styles from './Loader.module.css'

const SEEN_KEY = 'prismsnap:intro-seen'
// The logo artwork sits in a 1080×1080 canvas; this crops the view to the badge.
const VIEW_BOX = '180 170 720 720'
const DRAW_DURATION = 2.7

function hasSeenIntro() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1'
  } catch {
    return false
  }
}

/**
 * First-load screen built from the client logo.
 * "PRISM SNAP · STUDIO" pops in all at once with a soft bounce, then the
 * "M & A" monogram writes itself stroke by stroke while the counter runs
 * 0 → 100. Two layered curtains then lift to reveal the site.
 * Plays at double speed on reloads within the same browser session.
 */
export default function Loader({ onReveal, onComplete }) {
  const root = useRef(null)
  const countRef = useRef(null)
  const [quick] = useState(hasSeenIntro)
  const uid = useId().replace(/[^a-zA-Z0-9-]/g, '')
  const ids = { art: `${uid}-art`, ring: `${uid}-ring`, ink: `${uid}-ink` }

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
        if (countRef.current) countRef.current.textContent = '100'
        gsap.timeline({ onComplete: finish }).add(onReveal, 0.8).to(root.current, { autoAlpha: 0, duration: 0.4 })
        return release
      }

      // Handwriting: the monogram is revealed through mask strokes that follow the
      // pen path, drawn in writing order at an even speed with a short lift between strokes.
      const pens = gsap.utils.toArray(`.${styles.pen}`)
      const lengths = pens.map((pen) => pen.getTotalLength())
      const total = lengths.reduce((sum, len) => sum + len, 0)
      const write = gsap.timeline({ paused: true })
      pens.forEach((pen, i) => {
        const len = lengths[i]
        gsap.set(pen, { strokeDasharray: `${len} ${len + 4}`, strokeDashoffset: len + 2 })
        write.to(pen, { strokeDashoffset: 0, duration: len / total, ease: 'sine.inOut' }, i === 0 ? 0 : '+=0.035')
      })

      const counter = { n: 0 }
      const tl = gsap.timeline({ onComplete: finish })
      tl
        // Name appears all together, with a soft jump into place.
        .fromTo(`.${styles.ring}`, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.7, ease: 'power2.out' }, 0)
        .fromTo(
          `.${styles.ring}`,
          { y: 46, scale: 0.86, transformOrigin: '50% 50%' },
          { y: 0, scale: 1, duration: 1.2, ease: 'back.out(2.6)' },
          0,
        )
        // Monogram writes itself in step with the 0 → 100 counter.
        .to(write, { progress: 1, duration: DRAW_DURATION, ease: 'power1.inOut' }, 0.45)
        .to(
          counter,
          {
            n: 100,
            duration: DRAW_DURATION,
            ease: 'power1.inOut',
            onUpdate: () => {
              if (countRef.current) countRef.current.textContent = String(Math.round(counter.n)).padStart(3, '0')
            },
          },
          0.45,
        )
        .fromTo(`.${styles.bar}`, { scaleX: 0 }, { scaleX: 1, duration: DRAW_DURATION, ease: 'power1.inOut' }, 0.45)
        .from(`.${styles.fade}`, { autoAlpha: 0, y: 12, duration: 0.9, stagger: 0.1 }, 0.5)
        // Hold until webfonts are ready so the reveal never shows a font swap.
        .add(() => {
          if (document.fonts?.status === 'loaded') return
          tl.pause()
          document.fonts.ready.then(() => tl.resume())
        })
        .to(`.${styles.content}`, { autoAlpha: 0, y: -24, duration: 0.55, ease: 'power2.in' }, '+=0.35')
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
          <svg className={styles.emblem} viewBox={VIEW_BOX} aria-hidden="true">
            <defs>
              {/* The white logo artwork used as a stencil, so it can be recoloured. */}
              <mask id={ids.art} maskUnits="userSpaceOnUse" x="0" y="0" width="1080" height="1080">
                <image href={site.logo} width="1080" height="1080" />
              </mask>
              {/* Everything except the monogram: the arched "PRISM SNAP · STUDIO". */}
              <mask id={ids.ring} maskUnits="userSpaceOnUse" x="0" y="0" width="1080" height="1080">
                <rect width="1080" height="1080" fill="#fff" />
                {monogramPaths.map((d, i) => (
                  <path key={i} d={d} className={styles.cut} />
                ))}
              </mask>
              {/* Only the monogram, revealed progressively along its pen strokes. */}
              <mask id={ids.ink} maskUnits="userSpaceOnUse" x="0" y="0" width="1080" height="1080">
                {monogramPaths.map((d, i) => (
                  <path key={i} d={d} className={styles.pen} />
                ))}
              </mask>
            </defs>

            <g className={styles.ring}>
              <g mask={`url(#${ids.ring})`}>
                <rect width="1080" height="1080" className={styles.ringFill} mask={`url(#${ids.art})`} />
              </g>
            </g>
            <g mask={`url(#${ids.ink})`}>
              <rect width="1080" height="1080" className={styles.inkFill} mask={`url(#${ids.art})`} />
            </g>
          </svg>

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
