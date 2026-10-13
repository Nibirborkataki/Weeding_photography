import SectionHeading from '../../components/ui/SectionHeading'
import Reveal from '../../components/motion/Reveal'
import { ArrowRight } from '../../components/ui/Icons'
import { batches, courses, modeLabel, workshops } from '../../data/academy'
import { formatPrice } from '../../config/site'
import styles from './Schedule.module.css'

const dayMonth = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short' })
const weekday = new Intl.DateTimeFormat('en-GB', { weekday: 'long' })
const asDate = (iso) => new Date(`${iso}T00:00:00`)

/** Weekend workshops + upcoming course batches. */
export default function Schedule({ onEnquire }) {
  return (
    <section id="workshops" className="section section--alt">
      <div className="container">
        <SectionHeading
          eyebrow="Weekend workshops"
          title={
            <>
              One day, one <em>new skill</em>
            </>
          }
          intro="Short, focused workshops for when you want to level up one thing — without committing to a full course."
        />

        <Reveal className={styles.workshops} stagger={0.1}>
          {workshops.map((w) => {
            const date = asDate(w.date)
            return (
              <article key={w.id} className={styles.workshop}>
                <div className={styles.media}>
                  <img src={w.image.src} alt={w.image.alt} loading="lazy" decoding="async" />
                  <span className={styles.date}>
                    <strong>{date.getDate()}</strong>
                    {dayMonth.format(date).split(' ')[1]}
                  </span>
                </div>
                <div className={styles.body}>
                  <span className={styles.place}>{w.place}</span>
                  <h3>{w.name}</h3>
                  <p className={styles.meta}>
                    {weekday.format(date)} · {w.duration}
                  </p>
                  <div className={styles.footer}>
                    <span className={styles.price}>{formatPrice(w.price)}</span>
                    <button
                      type="button"
                      className="link-arrow"
                      onClick={() => onEnquire({ interest: `workshop:${w.id}` })}
                      aria-label={`Reserve a seat for ${w.name}`}
                    >
                      Reserve <ArrowRight />
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </Reveal>

        <div className={styles.batches}>
          <div className={styles.batchesHead}>
            <h3>Upcoming course batches</h3>
            <p className="muted">Mentorship starts any week — just get in touch.</p>
          </div>
          <Reveal as="ul" className={styles.batchList} stagger={0.06}>
            {batches.map((b) => {
              const course = courses.find((c) => c.id === b.courseId)
              const date = asDate(b.start)
              const few = b.seats <= 3
              return (
                <li key={b.id} className={styles.batch}>
                  <span className={styles.batchDate}>
                    <strong>{date.getDate()}</strong>
                    {dayMonth.format(date).split(' ')[1]} {date.getFullYear()}
                  </span>
                  <span className={styles.batchCourse}>
                    {course.name}
                    <small>{b.label}</small>
                  </span>
                  <span className={styles.batchMode}>{modeLabel(b.mode)}</span>
                  <span className={`${styles.seats} ${few ? styles.few : ''}`}>
                    {b.seats} seat{b.seats === 1 ? '' : 's'} left
                  </span>
                  <button
                    type="button"
                    className="link-arrow"
                    onClick={() => onEnquire({ interest: `course:${b.courseId}`, mode: b.mode, batchId: b.id })}
                    aria-label={`Enquire about the ${course.name} batch starting ${dayMonth.format(date)}`}
                  >
                    Enquire <ArrowRight />
                  </button>
                </li>
              )
            })}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
