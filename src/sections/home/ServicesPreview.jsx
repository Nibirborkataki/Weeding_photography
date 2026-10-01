import SectionHeading from '../../components/ui/SectionHeading'
import Reveal from '../../components/motion/Reveal'
import PackageCard from '../../components/PackageCard'
import { TransitionLink } from '../../components/transition/PageTransition'
import { ArrowRight } from '../../components/ui/Icons'
import { packages } from '../../data/packages'
import styles from './ServicesPreview.module.css'

export default function ServicesPreview() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Collections"
          title={
            <>
              Crafted for <em>your</em> celebration
            </>
          }
          intro="Three thoughtfully built collections — each one fully customisable, from intimate elopements to week-long celebrations."
          aside={
            <TransitionLink to="/services" className="link-arrow">
              Compare collections <ArrowRight />
            </TransitionLink>
          }
        />
        <Reveal className={styles.grid} stagger={0.15}>
          {packages.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} index={i} compact />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
