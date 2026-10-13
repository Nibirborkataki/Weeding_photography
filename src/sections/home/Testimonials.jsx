import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap'
import SectionHeading from '../../components/ui/SectionHeading'
import { Stars } from '../../components/reviews/Stars'
import { ArrowLeft, ArrowRight } from '../../components/ui/Icons'
import { TransitionLink } from '../../components/transition/PageTransition'
import { portfolio } from '../../data/images'
import styles from './Testimonials.module.css'

const INTERVAL = 7000
const fallbackImages = portfolio.filter((p) => p.shape === 'tall').map((p) => p.src)

export default function Testimonials({ reviews }) {
  const slides = reviews.slice(0, 7)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [inView, setInView] = useState(false)
  const ref = useRef(null)
  const count = slides.length

  const goTo = useCallback((i) => setIndex(((i % count) + count) % count), [count])

  // The slider only renders once reviews have loaded, so observe after that.
  const hasSlides = count > 0
  useEffect(() => {
    if (!hasSlides) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [hasSlides])

  const autoplay = !paused && inView && count > 1 && !prefersReducedMotion()

  useEffect(() => {
    if (!autoplay) return
    const id = setTimeout(() => goTo(index + 1), INTERVAL)
    return () => clearTimeout(id)
  }, [index, autoplay, goTo])

  useGSAP(
    () => {
      if (!count || prefersReducedMotion()) return
      gsap
        .timeline()
        .fromTo(`.${styles.quote} > *`, { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08, ease: 'power3.out' })
        .fromTo(
          `.${styles.image}[data-active="true"]`,
          { clipPath: 'inset(0% 0% 0% 100%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'expo.inOut' },
          0,
        )
    },
    { dependencies: [index, count], scope: ref },
  )

  if (!count) return null
  const current = slides[Math.min(index, count - 1)]

  return (
    <section className="section" aria-labelledby="testimonials-title">
      <div className="container">
        <SectionHeading
          id="testimonials-title"
          eyebrow="Kind words"
          title={
            <>
              Loved by couples, <em>families &amp; brands</em>
            </>
          }
          aside={
            <TransitionLink to="/reviews" className="link-arrow">
              Read all reviews <ArrowRight />
            </TransitionLink>
          }
        />

        <div
          ref={ref}
          className={styles.slider}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className={styles.media}>
            {slides.map((r, i) => (
              <img
                key={r.id}
                src={r.image ?? fallbackImages[i % fallbackImages.length]}
                alt=""
                loading="lazy"
                className={styles.image}
                data-active={i === index}
              />
            ))}
          </div>

          <div className={styles.body}>
            <span className={styles.mark} aria-hidden="true">
              “
            </span>
            <div className={styles.quote} aria-live="polite" key={current.id}>
              <Stars value={current.rating} />
              <blockquote>
                <p>{current.message}</p>
              </blockquote>
              <p className={styles.author}>
                {current.name}
                {(current.occasion || current.location) && (
                  <span> — {[current.occasion, current.location].filter(Boolean).join(' · ')}</span>
                )}
              </p>
            </div>

            <div className={styles.controls}>
              <button type="button" className={styles.arrow} onClick={() => goTo(index - 1)} aria-label="Previous review">
                <ArrowLeft />
              </button>
              <button type="button" className={styles.arrow} onClick={() => goTo(index + 1)} aria-label="Next review">
                <ArrowRight />
              </button>
              <span className={styles.counter}>
                {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
              </span>
              <span className={styles.progress} aria-hidden="true">
                <span key={`${index}-${autoplay}`} className={autoplay ? styles.progressFill : styles.progressPaused} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
