import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import SplitReveal from '../../components/motion/SplitReveal'
import { TransitionLink } from '../../components/transition/PageTransition'
import { ArrowRight } from '../../components/ui/Icons'
import { featuredStories } from '../../data/images'
import styles from './FeaturedStories.module.css'

/** Pinned section that scrolls a row of stories horizontally on desktop. */
export default function FeaturedStories() {
  const root = useRef(null)
  const track = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
        const distance = () => track.current.scrollWidth - window.innerWidth
        const tween = gsap.to(track.current, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })

        gsap.utils.toArray(`.${styles.media} img`).forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -7 },
            {
              xPercent: 7,
              ease: 'none',
              scrollTrigger: {
                trigger: img.parentElement,
                containerAnimation: tween,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            },
          )
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} className={styles.stories} aria-labelledby="stories-title">
      <div className={styles.frame}>
        <div className={`container ${styles.head}`}>
          <div>
            <p className="eyebrow">Selected work</p>
            <SplitReveal as="h2" id="stories-title" className="display-lg">
              Stories, <em>told well</em>
            </SplitReveal>
          </div>
          <TransitionLink to="/portfolio" className="link-arrow">
            View all work <ArrowRight />
          </TransitionLink>
        </div>

        <div ref={track} className={styles.track}>
          {featuredStories.map((story, i) => (
            <article key={story.id} className={styles.card}>
              <div className={styles.media}>
                <img src={story.src} alt={`${story.title} — ${story.type}, ${story.place}`} loading="lazy" decoding="async" />
                <span className={styles.type}>{story.type}</span>
              </div>
              <div className={styles.meta}>
                <span className={styles.index}>0{i + 1}</span>
                <div>
                  <h3>{story.title}</h3>
                  <p>
                    {story.place} · {story.year}
                  </p>
                </div>
              </div>
            </article>
          ))}
          <TransitionLink to="/portfolio" className={styles.endCard}>
            <span>
              See the full <em>portfolio</em>
            </span>
            <ArrowRight size={28} />
          </TransitionLink>
        </div>
      </div>
    </section>
  )
}
