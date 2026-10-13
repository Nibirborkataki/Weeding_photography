import ParallaxImage from '../../components/motion/ParallaxImage'
import SplitReveal from '../../components/motion/SplitReveal'
import Reveal from '../../components/motion/Reveal'
import { TransitionLink } from '../../components/transition/PageTransition'
import { ArrowRight } from '../../components/ui/Icons'
import { courses } from '../../data/academy'
import { featuredCode } from '../../data/redeemCodes'
import { formatPrice } from '../../config/site'
import styles from './AcademyTeaser.module.css'

const mainImage = { src: '/images/academy-first-camera.jpg', alt: 'Student holding a DSLR camera up to her eye' }
const insetImage = { src: '/images/academy-field-class.jpg', alt: 'Students learning on an outdoor shoot' }

const lowestFee = (course) => Math.min(...Object.values(course.prices))

/** Home-page invitation to Prism Snap Academy. */
export default function AcademyTeaser() {
  return (
    <section className={`section section--dark ${styles.teaser}`} aria-labelledby="academy-teaser-title">
      <div className={`container ${styles.layout}`}>
        <div className={styles.art}>
          <ParallaxImage className={styles.main} {...mainImage} />
          <ParallaxImage className={styles.inset} {...insetImage} />
        </div>

        <div className={styles.text}>
          <p className="eyebrow">Prism Snap Academy</p>
          <SplitReveal as="h2" id="academy-teaser-title" className="display-md">
            Learn photography from <em>working pros</em>
          </SplitReveal>
          <Reveal className={styles.body} stagger={0.1}>
            <p className="lead">
              Beginner courses, wedding and commercial specialisations, weekend workshops and 1:1 mentorship — in our
              studio or live online.
            </p>
            <ul className={styles.courses}>
              {courses.map((c) => (
                <li key={c.id}>
                  <span className={styles.courseName}>
                    {c.name}
                    <small>
                      {c.level} · {c.duration}
                    </small>
                  </span>
                  <span className={styles.from}>from {formatPrice(lowestFee(c))}</span>
                </li>
              ))}
            </ul>
            <div className={styles.actions}>
              <TransitionLink to="/academy" className="btn btn--light">
                Explore the academy <ArrowRight />
              </TransitionLink>
              <span className={styles.code}>
                Code <strong>{featuredCode.code}</strong> · {featuredCode.label}
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
