import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { gsap, Flip, ScrollTrigger, useGSAP, prefersReducedMotion } from '../lib/gsap'
import PageHeader from '../components/ui/PageHeader'
import Lightbox from '../components/ui/Lightbox'
import BookingCTA from '../sections/BookingCTA'
import { portfolio, portfolioCategories } from '../data/images'
import { usePageTitle } from '../hooks/usePageTitle'
import styles from './Portfolio.module.css'

export default function Portfolio() {
  usePageTitle('Portfolio')
  const [filter, setFilter] = useState('all')
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const gridRef = useRef(null)
  const flipState = useRef(null)

  const visible = useMemo(
    () => (filter === 'all' ? portfolio : portfolio.filter((p) => p.category === filter)),
    [filter],
  )

  const counts = useMemo(() => {
    const c = { all: portfolio.length }
    for (const p of portfolio) c[p.category] = (c[p.category] ?? 0) + 1
    return c
  }, [])

  const changeFilter = (id) => {
    if (id === filter) return
    if (!prefersReducedMotion()) flipState.current = Flip.getState(gridRef.current.children)
    setFilter(id)
  }

  // Animate the grid re-flow with FLIP after the filter changes.
  useLayoutEffect(() => {
    const state = flipState.current
    if (!state) return
    flipState.current = null
    Flip.from(state, {
      duration: 0.75,
      ease: 'power3.inOut',
      absolute: true,
      scale: true,
      onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 0.6, delay: 0.2 }),
      onLeave: (els) => gsap.to(els, { autoAlpha: 0, scale: 0.9, duration: 0.4 }),
      onComplete: () => ScrollTrigger.refresh(),
    })
  }, [filter])

  // Staggered reveal as tiles scroll into view.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const items = gsap.utils.toArray(`.${styles.item}`)
      gsap.set(items, { autoAlpha: 0, y: 60 })
      ScrollTrigger.batch(items, {
        start: 'top 92%',
        once: true,
        onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08, ease: 'power3.out', overwrite: true }),
      })
    },
    { scope: gridRef },
  )

  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title={
          <>
            Moments, <em>kept</em> forever
          </>
        }
        intro="A selection of ceremonies, portraits and quiet in-between moments from celebrations across India and around the world."
      />

      <section className={styles.section}>
        <div className="container">
          <div className={styles.filters} role="toolbar" aria-label="Filter photographs by category">
            {portfolioCategories.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`${styles.filter} ${filter === c.id ? styles.activeFilter : ''}`}
                aria-pressed={filter === c.id}
                onClick={() => changeFilter(c.id)}
              >
                {c.label}
                <sup>{counts[c.id]}</sup>
              </button>
            ))}
          </div>

          <div ref={gridRef} className={styles.grid}>
            {portfolio.map((item) => {
              const shown = filter === 'all' || item.category === filter
              const visibleIndex = visible.indexOf(item)
              return (
                <button
                  key={item.id}
                  type="button"
                  data-flip-id={item.id}
                  className={`${styles.item} ${styles[item.shape]} ${shown ? '' : styles.hidden}`}
                  onClick={() => setLightboxIndex(visibleIndex)}
                  aria-label={`Open ${item.title}, ${item.place}`}
                  tabIndex={shown ? 0 : -1}
                >
                  <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
                  <span className={styles.caption}>
                    <span className={styles.title}>{item.title}</span>
                    <span className={styles.place}>{item.place}</span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <BookingCTA />

      {lightboxIndex !== null && (
        <Lightbox items={visible} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onChange={setLightboxIndex} />
      )}
    </>
  )
}
