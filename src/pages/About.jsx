import PageHeader from '../components/ui/PageHeader'
import SectionHeading from '../components/ui/SectionHeading'
import ParallaxImage from '../components/motion/ParallaxImage'
import Reveal from '../components/motion/Reveal'
import SplitReveal from '../components/motion/SplitReveal'
import CountUp from '../components/motion/CountUp'
import BookingCTA from '../sections/BookingCTA'
import { images } from '../data/images'
import { values } from '../data/content'
import { site } from '../config/site'
import { usePageTitle } from '../hooks/usePageTitle'
import styles from './About.module.css'

export default function About() {
  usePageTitle('About')

  return (
    <>
      <PageHeader
        eyebrow="About the studio"
        title={
          <>
            We photograph <em>feelings</em>, not poses
          </>
        }
        intro={`${site.fullName} is a small team of storytellers who have spent over a decade documenting weddings with patience, warmth and an eye for light.`}
        image={images.aboutHeader}
      />

      <section className="section">
        <div className={`container ${styles.story}`}>
          <ParallaxImage className={styles.storyImage} {...images.aboutStory} />
          <div className={styles.storyText}>
            <SectionHeading
              align="stack"
              eyebrow="Our story"
              title={
                <>
                  It started with <em>one</em> wedding
                </>
              }
            />
            <Reveal className={styles.copy} stagger={0.1}>
              <p>
                In {site.established}, a friend asked us to photograph her wedding. We said yes before we’d thought
                it through — and spent the day completely captivated by the small, unscripted moments between the
                big ones.
              </p>
              <p>
                Since then we’ve followed couples through palace courtyards, monsoon mehendis, alpine elopements and
                backyard celebrations. The places change; what we look for doesn’t. Honest emotion, beautiful light
                and the people who matter most.
              </p>
              <p>
                We keep our calendar intentionally small so that every couple gets our full attention, from the
                first conversation to the album you’ll one day show your grandchildren.
              </p>
            </Reveal>
            <ParallaxImage className={styles.detailImage} {...images.aboutDetail} />
          </div>
        </div>
      </section>

      <section className={`section--dark ${styles.statsBand}`}>
        <div className={`container ${styles.stats}`}>
          {site.stats.map((s) => (
            <div key={s.label} className={styles.stat}>
              <strong>
                <CountUp value={s.value} decimals={s.decimals ?? 0} suffix={s.suffix} />
              </strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="What we believe"
            title={
              <>
                Three things we <em>never</em> compromise on
              </>
            }
          />
          <Reveal className={styles.values} stagger={0.15}>
            {values.map((v, i) => (
              <article key={v.title} className={styles.value}>
                <span className={styles.valueNum}>0{i + 1}</span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section className={`section section--alt ${styles.quoteSection}`}>
        <div className="container">
          <SplitReveal as="p" className={styles.quote}>
            “The best photographs don’t just show what happened. They bring back <em>how it felt</em> to be there.”
          </SplitReveal>
        </div>
      </section>

      <BookingCTA />
    </>
  )
}
