import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { gsap, SplitText, ScrollTrigger, useGSAP, prefersReducedMotion } from '../../lib/gsap'
import { useIntroDone } from '../../context/IntroContext'
import { heroState, supportsWebGL } from '../../components/three/heroState'
import { TransitionLink } from '../../components/transition/PageTransition'
import { ArrowRight } from '../../components/ui/Icons'
import RotatingBadge from '../../components/ui/RotatingBadge'
import { site } from '../../config/site'
import styles from './Hero.module.css'

const HeroScene = lazy(() => import('../../components/three/HeroScene'))

export default function Hero() {
  const root = useRef(null)
  const titleRef = useRef(null)
  const introDone = useIntroDone()
  const [webgl] = useState(supportsWebGL)
  const [inView, setInView] = useState(true)

  // Pause the WebGL render loop while the hero is off-screen.
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: '100px' })
    observer.observe(root.current)
    return () => observer.disconnect()
  }, [])

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top top',
        end: 'bottom top',
        onUpdate: (self) => (heroState.scroll = self.progress),
      })

      if (!introDone || prefersReducedMotion()) return

      const split = SplitText.create(titleRef.current, {
        type: 'lines',
        mask: 'lines',
        linesClass: 'split-line',
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, { yPercent: 115, duration: 1.6, stagger: 0.12, delay: 0.45, ease: 'power4.out' }),
      })

      gsap
        .timeline({ delay: 0.25 })
        .from(`.${styles.canvas}`, { autoAlpha: 0, scale: 0.9, duration: 2.2, ease: 'power2.out' }, 0)
        .from('[data-hero-fade]', { y: 26, autoAlpha: 0, duration: 1.1, stagger: 0.1 }, 0.95)

      gsap.to(`.${styles.content}`, {
        yPercent: -14,
        autoAlpha: 0.15,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })

      return () => split.revert()
    },
    { dependencies: [introDone], scope: root, revertOnUpdate: true },
  )

  return (
    <section ref={root} className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.canvas} aria-hidden="true">
        {webgl && (
          <Suspense fallback={null}>
            <HeroScene active={inView} />
          </Suspense>
        )}
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <p className="eyebrow" data-hero-fade>
            {site.tagline}
          </p>
          <h1 id="hero-title" ref={titleRef} className={`display-xl ${styles.title}`}>
            Moments worth keeping, told <em>beautifully.</em>
          </h1>
          <p className={`lead ${styles.lead}`} data-hero-fade>
            Wedding photography at heart — with the same eye for emotion at your family’s ceremonies, your portraits
            and your brand’s campaigns.
          </p>
          <div className={styles.actions} data-hero-fade>
            <TransitionLink to="/booking" className="btn">
              Book your date <ArrowRight />
            </TransitionLink>
            <TransitionLink to="/services" className="link-arrow">
              Explore services <ArrowRight />
            </TransitionLink>
          </div>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p className={styles.scrollCue} data-hero-fade>
          <span className={styles.scrollLine} aria-hidden="true" />
          Scroll to explore
        </p>
        <ul className={styles.stats} data-hero-fade>
          {site.stats.slice(0, 3).map((s) => (
            <li key={s.label}>
              <strong>
                {s.value}
                {s.suffix}
              </strong>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.badge} data-hero-fade>
        <RotatingBadge text="Weddings · Ceremonies · Campaigns · " />
      </div>
    </section>
  )
}
