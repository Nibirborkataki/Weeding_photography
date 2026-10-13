import SectionHeading from '../../components/ui/SectionHeading'
import Reveal from '../../components/motion/Reveal'
import { ArrowRight, Check } from '../../components/ui/Icons'
import ModeToggle from './ModeToggle'
import { compareRows, courses, modeLabel } from '../../data/academy'
import { featuredCode } from '../../data/redeemCodes'
import { formatPrice } from '../../config/site'
import styles from './CourseCatalog.module.css'

function CourseCard({ course, index, mode, onEnquire }) {
  return (
    <article className={`${styles.card} ${course.featured ? styles.featured : ''}`}>
      <div className={styles.media}>
        <img src={course.image.src} alt={course.image.alt} loading="lazy" decoding="async" />
        <span className={styles.level}>{course.level}</span>
        {course.featured && <span className={styles.popular}>Most popular</span>}
      </div>
      <div className={styles.body}>
        <div className={styles.titleRow}>
          <div>
            <span className={styles.index}>0{index + 1}</span>
            <h3 className={styles.name}>{course.name}</h3>
            <p className={styles.tagline}>{course.tagline}</p>
          </div>
          <p className={styles.price}>
            {/* Re-keyed so the new price animates in when the format changes. */}
            <span key={mode} className={styles.priceValue}>
              {formatPrice(course.prices[mode])}
            </span>
            <small>{modeLabel(mode)}</small>
          </p>
        </div>
        <ul className={styles.meta}>
          <li>{course.duration}</li>
          <li>{course.sessions}</li>
          <li>{course.schedule}</li>
          <li>{course.batchSize}</li>
        </ul>
        <ul className={styles.modules}>
          {course.modules.map((m) => (
            <li key={m}>
              <Check size={15} /> {m}
            </li>
          ))}
        </ul>
        <button
          type="button"
          className={`btn ${course.featured ? 'btn--light' : 'btn--ghost'} ${styles.cta}`}
          onClick={() => onEnquire({ interest: `course:${course.id}`, mode })}
          aria-label={`Enquire about ${course.name}`}
        >
          Enquire now <ArrowRight />
        </button>
      </div>
    </article>
  )
}

function CompareTable({ mode }) {
  return (
    <div className={styles.compare}>
      <h3 className={styles.compareTitle}>Compare courses</h3>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">
                <span className="visually-hidden">Feature</span>
              </th>
              {courses.map((c) => (
                <th key={c.id} scope="col" className={c.featured ? styles.featuredCol : undefined}>
                  {c.name}
                  <small>{formatPrice(c.prices[mode])}</small>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {compareRows.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                {row.values.map((value, i) => (
                  <td key={courses[i].id} className={courses[i].featured ? styles.featuredCol : undefined}>
                    {value === true ? (
                      <>
                        <Check size={16} />
                        <span className="visually-hidden">Included</span>
                      </>
                    ) : value === false ? (
                      <span className={styles.dash} aria-label="Not included">
                        —
                      </span>
                    ) : (
                      value
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function CourseCatalog({ mode, onModeChange, onEnquire }) {
  return (
    <section id="courses" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Courses & packages"
          title={
            <>
              A course for every <em>stage</em>
            </>
          }
          intro="Start from scratch, specialise in weddings or product work, or go pro with a personal mentor. Choose how you’d like to learn:"
          aside={<ModeToggle value={mode} onChange={onModeChange} />}
        />

        <Reveal className={styles.grid} stagger={0.12}>
          {courses.map((course, i) => (
            <CourseCard key={course.id} course={course} index={i} mode={mode} onEnquire={onEnquire} />
          ))}
        </Reveal>

        <p className={styles.note}>
          Pay in up to 3 instalments · Certificate on completion · Use code <strong>{featuredCode.code}</strong> for{' '}
          {featuredCode.label.toLowerCase()}
        </p>

        <CompareTable mode={mode} />
      </div>
    </section>
  )
}
