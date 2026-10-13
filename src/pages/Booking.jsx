import { useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'
import { smoothScrollTo } from '../lib/smoothScroll'
import Field from '../components/ui/Field'
import SplitReveal from '../components/motion/SplitReveal'
import Reveal from '../components/motion/Reveal'
import { TransitionLink } from '../components/transition/PageTransition'
import { ArrowLeft, ArrowRight, Check } from '../components/ui/Icons'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { createBooking } from '../services/bookingService'
import { addOns, addOnsFor, estimateTotal, getPackage, packagesFor } from '../data/packages'
import { services, getService } from '../data/services'
import { images } from '../data/images'
import { formatPackagePrice, formatPrice } from '../config/site'
import {
  BOOKING_STEPS,
  hasErrors,
  needsGuestCount,
  needsPartnerName,
  toISODate,
  validateBookingStep,
} from '../utils/validation'
import { usePageTitle } from '../hooks/usePageTitle'
import styles from './Booking.module.css'

const GUEST_OPTIONS = [
  { value: 'under-50', label: 'Under 50 guests' },
  { value: '50-150', label: '50 – 150 guests' },
  { value: '150-300', label: '150 – 300 guests' },
  { value: '300-500', label: '300 – 500 guests' },
  { value: '500-plus', label: '500+ guests' },
]

// Wording that changes with the kind of shoot.
const COPY = {
  weddings: { venue: 'e.g. Taj Lake Palace, Udaipur', message: 'Events, rituals, the vibe you’re dreaming of…' },
  ceremonies: { venue: 'e.g. Home in Salt Lake, Kolkata', message: 'Which rituals, timings, family size…' },
  commercial: { venue: 'Our studio, your store or a location', message: 'Products, number of looks, where the images will be used…' },
  portraits: { venue: 'At home, outdoors or in the studio', message: 'Who’s in the photos, the mood you’d love…' },
}

const longDate = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
const formatDate = (iso) => (iso ? longDate.format(new Date(`${iso}T00:00:00`)) : '—')

function tomorrowISO() {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return toISODate(d)
}

function initialData(params, user) {
  const presetPackage = getPackage(params.get('package'))
  const serviceId = presetPackage?.serviceId ?? getService(params.get('service'))?.id ?? ''
  return {
    serviceId,
    occasion: '',
    date: '',
    venue: '',
    guests: '',
    packageId: presetPackage?.id ?? '',
    addOns: [],
    name: user?.name ?? '',
    partnerName: '',
    company: '',
    email: user?.email ?? '',
    phone: '',
    message: '',
  }
}

function Summary({ data }) {
  const service = getService(data.serviceId)
  const pkg = getPackage(data.packageId)
  const chosenAddOns = addOns.filter((a) => data.addOns.includes(a.id))
  const guests = GUEST_OPTIONS.find((g) => g.value === data.guests)?.label
  const total = estimateTotal(data.packageId, data.addOns)
  return (
    <dl className={styles.summaryList}>
      <div>
        <dt>Occasion</dt>
        <dd>{service ? [service.shortName ?? service.name, data.occasion].filter(Boolean).join(' · ') : '—'}</dd>
      </div>
      <div>
        <dt>Date</dt>
        <dd>{formatDate(data.date)}</dd>
      </div>
      <div>
        <dt>Location</dt>
        <dd>{data.venue || '—'}</dd>
      </div>
      {needsGuestCount(data.serviceId) && (
        <div>
          <dt>Guests</dt>
          <dd>{guests ?? '—'}</dd>
        </div>
      )}
      <div>
        <dt>Package</dt>
        <dd>{pkg ? pkg.name : '—'}</dd>
      </div>
      {chosenAddOns.length > 0 && (
        <div>
          <dt>Add-ons</dt>
          <dd>{chosenAddOns.map((a) => a.name).join(', ')}</dd>
        </div>
      )}
      <div className={styles.total}>
        <dt>{pkg && total == null ? 'Pricing' : 'Estimated from'}</dt>
        <dd>{pkg ? (total == null ? 'Custom quote' : formatPrice(total)) : '—'}</dd>
      </div>
    </dl>
  )
}

export default function Booking() {
  usePageTitle('Book a shoot')
  const { user } = useAuth()
  const toast = useToast()
  const [params] = useSearchParams()

  const [step, setStep] = useState(0)
  const [data, setData] = useState(() => initialData(params, user))
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [booking, setBooking] = useState(null)
  const panelRef = useRef(null)
  const formRef = useRef(null)
  const minDate = useMemo(tomorrowISO, [])

  const service = getService(data.serviceId)
  const copy = COPY[data.serviceId] ?? COPY.weddings
  const asideImage = service?.image ?? images.bookingSide

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.fromTo(panelRef.current, { autoAlpha: 0, x: 24 }, { autoAlpha: 1, x: 0, duration: 0.7, ease: 'power3.out' })
    },
    { dependencies: [step, !!booking] },
  )

  const clearError = (field) => setErrors(({ [field]: _removed, ...rest }) => rest)

  const set = (field) => (e) => {
    const value = e.target.value
    setData((d) => ({ ...d, [field]: value }))
    clearError(field)
  }

  // Switching service resets the choices that only make sense for the old one.
  const chooseService = (serviceId) => {
    setData((d) => {
      if (d.serviceId === serviceId) return d
      const keepPackage = getPackage(d.packageId)?.serviceId === serviceId
      return { ...d, serviceId, occasion: '', packageId: keepPackage ? d.packageId : '', addOns: [] }
    })
    clearError('serviceId')
  }

  const toggleAddOn = (id) =>
    setData((d) => ({ ...d, addOns: d.addOns.includes(id) ? d.addOns.filter((a) => a !== id) : [...d.addOns, id] }))

  const scrollToForm = () => smoothScrollTo(formRef.current, -110)

  const focusFirstError = () =>
    requestAnimationFrame(() => panelRef.current?.querySelector('[aria-invalid="true"]')?.focus())

  const next = () => {
    const found = validateBookingStep(step, data)
    setErrors(found)
    if (hasErrors(found)) {
      focusFirstError()
      return
    }
    setStep((s) => s + 1)
    scrollToForm()
  }

  const back = () => {
    setStep((s) => s - 1)
    scrollToForm()
  }

  const goToStep = (target) => {
    // Only allow jumping back to completed steps.
    if (target < step) {
      setStep(target)
      scrollToForm()
    }
  }

  const submit = async (e) => {
    e.preventDefault()
    if (step < BOOKING_STEPS.length - 1) {
      next()
      return
    }
    setSubmitting(true)
    try {
      const created = await createBooking(data)
      setBooking(created)
      toast.success('Booking request sent — we’ll be in touch within 24 hours.')
      scrollToForm()
    } catch (err) {
      setErrors(err.fieldErrors ?? {})
      const firstBadStep = [0, 1, 2, 3].find((s) => hasErrors(validateBookingStep(s, data)))
      if (firstBadStep !== undefined) setStep(firstBadStep)
      toast.error(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const bookingNames = booking ? [booking.name, booking.partnerName].filter(Boolean) : []

  return (
    <div className={styles.page}>
      <div className={`container ${styles.layout}`}>
        <aside className={styles.aside}>
          <div className={styles.asideInner}>
            <div className={styles.asideImage}>
              <img key={asideImage.src} src={asideImage.src} alt={asideImage.alt} />
            </div>
            <div className={styles.summaryCard}>
              <p className={styles.summaryTitle}>Your booking</p>
              <Summary data={data} />
            </div>
          </div>
        </aside>

        <div className={styles.main} ref={formRef}>
          <header className={styles.header}>
            <Reveal immediate delay={0.35}>
              <p className="eyebrow">Booking</p>
            </Reveal>
            <SplitReveal as="h1" immediate delay={0.45} className="display-md">
              Let’s save <em>your date</em>
            </SplitReveal>
            <Reveal immediate delay={0.7}>
              <p className="lead">
                Weddings, ceremonies, portraits or a brand shoot — a few short steps and no payment now. We’ll confirm
                availability and send a tailored proposal within 24 hours.
              </p>
            </Reveal>
          </header>

          {booking ? (
            <div ref={panelRef} className={styles.success}>
              <span className={styles.successIcon}>
                <Check size={28} />
              </span>
              <h2 className="display-sm">
                Thank you,{' '}
                {bookingNames.map((n, i) => (
                  <span key={n}>
                    {i > 0 && ' & '}
                    <em>{n}</em>
                  </span>
                ))}
              </h2>
              <p className="muted">
                Your request for <strong>{booking.occasion}</strong> on <strong>{formatDate(booking.date)}</strong> is
                in. We’ll reply to <strong>{booking.email}</strong> shortly.
              </p>
              <p className={styles.reference}>
                Reference <strong>{booking.reference}</strong>
              </p>
              <ol className={styles.nextSteps}>
                <li>We check availability and reply within 24 hours.</li>
                <li>A relaxed planning call to understand your occasion or brief.</li>
                <li>Sign the agreement and a 30% retainer secures your date.</li>
              </ol>
              <div className={styles.successActions}>
                <TransitionLink to="/portfolio" className="btn">
                  Explore the portfolio <ArrowRight />
                </TransitionLink>
                <TransitionLink to="/" className="link-arrow">
                  Back to home
                </TransitionLink>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className={styles.form}>
              <ol className={styles.steps} aria-label="Booking progress">
                {BOOKING_STEPS.map((label, i) => (
                  <li
                    key={label}
                    className={`${styles.stepItem} ${i === step ? styles.current : ''} ${i < step ? styles.done : ''}`}
                    aria-current={i === step ? 'step' : undefined}
                  >
                    <button type="button" onClick={() => goToStep(i)} disabled={i >= step}>
                      <span className={styles.stepNum}>{i < step ? <Check size={14} /> : i + 1}</span>
                      <span className={styles.stepLabel}>{label}</span>
                    </button>
                  </li>
                ))}
              </ol>

              <div ref={panelRef} className={styles.panel}>
                {step === 0 && (
                  <fieldset className={styles.fieldset}>
                    <legend className={styles.legend}>What are we photographing?</legend>
                    <div className={styles.serviceOptions} role="radiogroup">
                      {services.map((s) => (
                        <label key={s.id} className={`${styles.serviceOption} ${data.serviceId === s.id ? styles.selected : ''}`}>
                          <input
                            type="radio"
                            name="serviceId"
                            value={s.id}
                            checked={data.serviceId === s.id}
                            onChange={() => chooseService(s.id)}
                            className="visually-hidden"
                            aria-invalid={errors.serviceId ? true : undefined}
                          />
                          <span className={styles.serviceThumb}>
                            <img src={s.image.src} alt="" loading="lazy" />
                          </span>
                          <span className={styles.serviceText}>
                            <span className={styles.packageName}>
                              {s.name}
                              {s.flagship && <span className={styles.tag}>Specialty</span>}
                            </span>
                            <span className={styles.packageMeta}>{s.tagline}</span>
                          </span>
                          <span className={styles.radio} aria-hidden="true" />
                        </label>
                      ))}
                    </div>
                    {errors.serviceId && <p className="field__error">{errors.serviceId}</p>}

                    {service && (
                      <Field
                        as="select"
                        label="Occasion"
                        placeholder="Choose the occasion"
                        options={service.occasions.map((o) => ({ value: o, label: o }))}
                        value={data.occasion}
                        onChange={set('occasion')}
                        error={errors.occasion}
                      />
                    )}
                  </fieldset>
                )}

                {step === 1 && (
                  <fieldset className={styles.fieldset}>
                    <legend className={styles.legend}>When &amp; where?</legend>
                    <div className="form-grid form-grid--2">
                      <Field
                        label={data.serviceId === 'commercial' ? 'Preferred shoot date' : 'Date'}
                        type="date"
                        min={minDate}
                        value={data.date}
                        onChange={set('date')}
                        error={errors.date}
                      />
                      {needsGuestCount(data.serviceId) ? (
                        <Field
                          as="select"
                          label="Guest count"
                          placeholder="Select guest count"
                          options={GUEST_OPTIONS}
                          value={data.guests}
                          onChange={set('guests')}
                          error={errors.guests}
                        />
                      ) : (
                        <div />
                      )}
                      <Field
                        className="span-2"
                        label="Venue or location"
                        placeholder={copy.venue}
                        value={data.venue}
                        onChange={set('venue')}
                        error={errors.venue}
                      />
                    </div>
                  </fieldset>
                )}

                {step === 2 && (
                  <fieldset className={styles.fieldset}>
                    <legend className={styles.legend}>Choose your package</legend>
                    <div className={styles.packageOptions} role="radiogroup">
                      {packagesFor(data.serviceId).map((p) => (
                        <label key={p.id} className={`${styles.packageOption} ${data.packageId === p.id ? styles.selected : ''}`}>
                          <input
                            type="radio"
                            name="packageId"
                            value={p.id}
                            checked={data.packageId === p.id}
                            onChange={set('packageId')}
                            className="visually-hidden"
                            aria-invalid={errors.packageId ? true : undefined}
                          />
                          <span className={styles.radio} aria-hidden="true" />
                          <span className={styles.packageText}>
                            <span className={styles.packageName}>
                              {p.name}
                              {p.featured && <span className={styles.tag}>Most loved</span>}
                            </span>
                            <span className={styles.packageMeta}>{p.coverage}</span>
                          </span>
                          <span className={styles.packagePrice}>{formatPackagePrice(p.price)}</span>
                        </label>
                      ))}
                    </div>
                    {errors.packageId && <p className="field__error">{errors.packageId}</p>}

                    <p className={styles.subLegend}>Add-ons (optional)</p>
                    <div className={styles.addOns}>
                      {addOnsFor(data.serviceId).map((a) => (
                        <label key={a.id} className={`checkbox ${styles.addOn}`}>
                          <input type="checkbox" checked={data.addOns.includes(a.id)} onChange={() => toggleAddOn(a.id)} />
                          <span>{a.name}</span>
                          <span className={styles.addOnPrice}>+{formatPrice(a.price)}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                )}

                {step === 3 && (
                  <fieldset className={styles.fieldset}>
                    <legend className={styles.legend}>About you</legend>
                    <div className="form-grid form-grid--2">
                      <Field label="Your name" autoComplete="name" value={data.name} onChange={set('name')} error={errors.name} />
                      {needsPartnerName(data.serviceId) && (
                        <Field label="Partner’s name" value={data.partnerName} onChange={set('partnerName')} error={errors.partnerName} />
                      )}
                      {data.serviceId === 'commercial' && (
                        <Field label="Brand / company" optional autoComplete="organization" value={data.company} onChange={set('company')} />
                      )}
                      <Field label="Email" type="email" autoComplete="email" value={data.email} onChange={set('email')} error={errors.email} />
                      <Field label="Phone" type="tel" autoComplete="tel" placeholder="+91" value={data.phone} onChange={set('phone')} error={errors.phone} />
                      <Field
                        className="span-2"
                        as="textarea"
                        label="Tell us more"
                        optional
                        placeholder={copy.message}
                        value={data.message}
                        onChange={set('message')}
                      />
                    </div>
                  </fieldset>
                )}

                {step === 4 && (
                  <div className={styles.fieldset}>
                    <p className={styles.legend}>Everything look right?</p>
                    <div className={styles.review}>
                      <Summary data={data} />
                      <dl className={styles.summaryList}>
                        <div>
                          <dt>Name</dt>
                          <dd>{[data.name, data.partnerName].filter(Boolean).join(' & ')}</dd>
                        </div>
                        {data.company && (
                          <div>
                            <dt>Company</dt>
                            <dd>{data.company}</dd>
                          </div>
                        )}
                        <div>
                          <dt>Email</dt>
                          <dd>{data.email}</dd>
                        </div>
                        <div>
                          <dt>Phone</dt>
                          <dd>{data.phone}</dd>
                        </div>
                      </dl>
                    </div>
                    <p className={styles.note}>
                      By sending this request you’re not committing to anything — it simply lets us check our calendar
                      for you.
                    </p>
                  </div>
                )}
              </div>

              <div className={styles.navButtons}>
                {step > 0 ? (
                  <button type="button" className="link-arrow" onClick={back}>
                    <ArrowLeft /> Back
                  </button>
                ) : (
                  <span />
                )}
                <button type="submit" className="btn" disabled={submitting}>
                  {submitting ? (
                    <>
                      <span className="spinner" aria-hidden="true" /> Sending…
                    </>
                  ) : step === BOOKING_STEPS.length - 1 ? (
                    <>
                      Send booking request <ArrowRight />
                    </>
                  ) : (
                    <>
                      Continue <ArrowRight />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
