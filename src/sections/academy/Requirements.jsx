import SectionHeading from '../../components/ui/SectionHeading'
import ParallaxImage from '../../components/motion/ParallaxImage'
import Reveal from '../../components/motion/Reveal'
import { requirements } from '../../data/academy'
import styles from './Requirements.module.css'

const gear = { src: '/images/academy-gear-flatlay.jpg', alt: 'Camera, lenses and accessories laid out on a table' }

/** "What you'll need" before joining. */
export default function Requirements() {
  return (
    <section id="requirements" className="section">
      <div className={`container ${styles.layout}`}>
        <div className={styles.visual}>
          <ParallaxImage className={styles.image} {...gear} />
          <p className={styles.caption}>
            No gear yet? In-studio students can borrow a camera for the whole Foundations course.
          </p>
        </div>
        <div>
          <SectionHeading
            align="stack"
            eyebrow="Before you join"
            title={
              <>
                What you’ll <em>need</em>
              </>
            }
            intro="Very little, honestly. Here’s the short checklist so you can start on day one."
          />
          <Reveal as="ol" className={styles.list} stagger={0.08}>
            {requirements.map((r, i) => (
              <li key={r.title} className={styles.item}>
                <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{r.title}</h3>
                  <p>{r.text}</p>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
