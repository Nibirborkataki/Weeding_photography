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
            We believe the most beautiful wedding photographs aren’t posed — they’re felt. Quiet glances, unguarded
            laughter, the hand that finds another in a crowd. We’re there for every bit of it, quietly and
            beautifully.
          </ScrubText>
        </div>

        <div className={styles.gallery}>
          <ParallaxImage className={styles.tall} {...images.introPortrait} />
          <div className={styles.side}>
            <ParallaxImage className={styles.wide} {...images.introDetail} />
            <Reveal className={styles.caption}>
              <p className="muted">
                Candid storytelling, fine-art portraits and heirloom albums — crafted with care for couples in India
                and around the world.
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
