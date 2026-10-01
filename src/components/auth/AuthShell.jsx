import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap'
import { useIntroDone } from '../../context/IntroContext'
import { TransitionLink } from '../transition/PageTransition'
import { ArrowLeft } from '../ui/Icons'
import { site } from '../../config/site'
import styles from './AuthShell.module.css'

/** Split-screen layout for sign in / sign up: photograph on one side, form on the other. */
export default function AuthShell({ image, quote, children }) {
  const ref = useRef(null)
  const introDone = useIntroDone()

  useGSAP(
    () => {
      if (!introDone || prefersReducedMotion()) return
      gsap
        .timeline({ delay: 0.3 })
        .from(`.${styles.visual} img`, { scale: 1.18, duration: 2.2, ease: 'power3.out' }, 0)
        .from(`.${styles.quote}`, { y: 30, autoAlpha: 0, duration: 1.2 }, 0.5)
        .from(`.${styles.content} > *`, { y: 30, autoAlpha: 0, duration: 1, stagger: 0.08 }, 0.3)
    },
    { dependencies: [introDone], scope: ref },
  )

  return (
    <div ref={ref} className={styles.shell}>
      <aside className={styles.visual}>
        <img src={image.src} alt={image.alt} />
        <div className={styles.shade} aria-hidden="true" />
        <TransitionLink to="/" className={styles.brand}>
          {site.name} <span>Studio</span>
        </TransitionLink>
        <blockquote className={styles.quote}>
          <p>{quote}</p>
        </blockquote>
      </aside>

      <main id="main" className={styles.panel}>
        <div className={styles.topBar}>
          <TransitionLink to="/" className={styles.mobileBrand}>
            {site.name}
          </TransitionLink>
          <TransitionLink to="/" className="link-arrow">
            <ArrowLeft /> Back to site
          </TransitionLink>
        </div>
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  )
}
