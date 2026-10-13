import { useCallback, useState } from 'react'
import PageHeader from '../components/ui/PageHeader'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/motion/Reveal'
import ParallaxImage from '../components/motion/ParallaxImage'
import CountUp from '../components/motion/CountUp'
import Accordion from '../components/ui/Accordion'
import { ArrowRight } from '../components/ui/Icons'
import CourseCatalog from '../sections/academy/CourseCatalog'
import Schedule from '../sections/academy/Schedule'
import Requirements from '../sections/academy/Requirements'
import AcademyEnquiry from '../sections/academy/AcademyEnquiry'
import { academyFaqs, academyGallery, academyHighlights, academyStats, batches, studentStories } from '../data/academy'
import { featuredCode } from '../data/redeemCodes'
import { smoothScrollTo } from '../lib/smoothScroll'
import { usePageTitle } from '../hooks/usePageTitle'
import styles from './Academy.module.css'

const heroMain = { src: '/images/academy-students.jpg', alt: 'Group of photography students holding their cameras' }
const heroInset = { src: '/images/academy-editing.jpg', alt: 'Student editing a photo in Lightroom' }
const whyImage = { src: '/images/academy-field-class.jpg', alt: 'Students learning on an outdoor shoot' }

const nextBatch = [...batches].sort((a, b) => a.start.localeCompare(b.start))[0]
const nextBatchLabel = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short' }).format(
  new Date(`${nextBatch.start}T00:00:00`),
)

const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (el) smoothScrollTo(el, 0)
}

export default function Academy() {
  usePageTitle('Photography Academy')
  const [mode, setMode] = useState('studio')
  const [preset, setPreset] = useState(null)

  // Any "Enquire" / "Reserve" button prefills the form and glides down to it.
  const enquire = useCallback((selection) => {
    setPreset({ ...selection, at: Date.now() })
    scrollToSection('enquire')
  }, [])

  return (
    <>
      <PageHeader
        eyebrow="Prism Snap Academy"
        title={
          <>
            Learn to tell stories with <em>light</em>
          </>
        }
        intro="Photography courses and weekend workshops taught by the team behind Prism Snap Studio — for complete beginners, aspiring wedding photographers and creators ready to go pro."
        aside={
          <div className={styles.heroArt}>
            <ParallaxImage className={styles.heroMain} {...heroMain} eager />
            <ParallaxImage className={styles.heroInset} {...heroInset} eager />
            <p className={styles.heroBadge}>
              <span>Next batch</span>
              {nextBatchLabel}
            </p>
          </div>
        }
      >
        <div className={styles.heroActions}>
          <button type="button" className="btn" onClick={() => scrollToSection('courses')}>
            Explore courses <ArrowRight />
          </button>
          <button type="button" className="link-arrow" onClick={() => scrollToSection('enquire')}>
            Talk to us <ArrowRight />
          </button>
        </div>
        <p className={styles.promo}>
          Use code <strong>{featuredCode.code}</strong> for {featuredCode.label.toLowerCase()}
        </p>
      </PageHeader>

      <section className={styles.stats} aria-label="Academy in numbers">
        <div className={`container ${styles.statsRow}`}>
          {academyStats.map((s) => (
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
        <div className={`container ${styles.why}`}>
          <div>
            <SectionHeading
              align="stack"
              eyebrow="Why learn with us"
              title={
                <>
                  Learn on real shoots, not just <em>slides</em>
                </>
              }
              intro="The academy grew out of our studio. Everything we teach is what we do every week at weddings, ceremonies and brand shoots."
            />
            <Reveal className={styles.features} stagger={0.1}>
              {academyHighlights.map((h, i) => (
                <article key={h.title} className={styles.feature}>
                  <span className={styles.featureNum}>0{i + 1}</span>
                  <h3>{h.title}</h3>
                  <p>{h.text}</p>
                </article>
              ))}
            </Reveal>
          </div>
          <ParallaxImage className={styles.whyImage} {...whyImage} />
        </div>
      </section>

      <CourseCatalog mode={mode} onModeChange={setMode} onEnquire={enquire} />
      <Schedule onEnquire={enquire} />
      <Requirements />

      <section className={`section section--dark ${styles.gallerySection}`} aria-labelledby="inside-title">
        <div className="container">
          <SectionHeading
            id="inside-title"
            eyebrow="Inside the academy"
            title={
              <>
                Field classes, photo walks &amp; <em>real sets</em>
              </>
            }
          />
        </div>
        <Reveal className={styles.gallery} stagger={0.08}>
          {academyGallery.map((g) => (
            <figure key={g.src} className={styles.galleryItem}>
              <img src={g.src} alt={g.alt} loading="lazy" decoding="async" />
              <figcaption>{g.caption}</figcaption>
            </figure>
          ))}
        </Reveal>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Student stories"
            title={
              <>
                From first click to <em>first client</em>
              </>
            }
          />
          <Reveal className={styles.stories} stagger={0.12}>
            {studentStories.map((s) => (
              <figure key={s.name} className={styles.story}>
                <span className={styles.quoteMark} aria-hidden="true">
                  “
                </span>
                <blockquote>
                  <p>{s.quote}</p>
                </blockquote>
                <figcaption>
                  <strong>{s.name}</strong>
                  {s.course}
                </figcaption>
              </figure>
            ))}
          </Reveal>
        </div>
      </section>

      <AcademyEnquiry preset={preset} />

      <section className="section">
        <div className={`container ${styles.faq}`}>
          <SectionHeading
            align="stack"
            eyebrow="FAQ"
            title={
              <>
                Good to <em>know</em>
              </>
            }
            intro="Still unsure about something? Ask in the enquiry form above — we reply within a day."
          />
          <Reveal>
            <Accordion items={academyFaqs} />
          </Reveal>
        </div>
      </section>
    </>
  )
}
