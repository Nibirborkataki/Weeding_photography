import ScrubText from '../../components/motion/ScrubText'
import ParallaxImage from '../../components/motion/ParallaxImage'
import Reveal from '../../components/motion/Reveal'
import { TransitionLink } from '../../components/transition/PageTransition'
import { ArrowRight } from '../../components/ui/Icons'
import { images } from '../../data/images'
import styles from './Intro.module.css'

export default function Intro() {
  return (
    <section className={`section ${styles.intro}`}>
      <div className="container">
        <div className={styles.statementRow}>
          <p className="eyebrow">Our philosophy</p>
          <ScrubText className={styles.statement}>
            We believe the most beautiful photographs aren’t posed — they’re felt. A bride’s quiet glance, a
            grandmother’s blessing at a rice ceremony, the perfect light on a product. Whatever the occasion, we’re
            there for every bit of it, quietly and beautifully.
          </ScrubText>
        </div>

        <div className={styles.gallery}>
          <ParallaxImage className={styles.tall} {...images.introPortrait} />
          <div className={styles.side}>
            <ParallaxImage className={styles.wide} {...images.introDetail} />
            <Reveal className={styles.caption}>
              <p className="muted">
                Weddings are our heart. Family ceremonies, portraits and brand campaigns get the same care — candid
                storytelling, beautiful light and images made to last.
              </p>
              <TransitionLink to="/about" className="link-arrow">
                Our story <ArrowRight />
              </TransitionLink>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
