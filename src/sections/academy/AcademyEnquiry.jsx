import { useEffect, useMemo, useState } from 'react'
import Field from '../../components/ui/Field'
import Reveal from '../../components/motion/Reveal'
import SplitReveal from '../../components/motion/SplitReveal'
import { ArrowRight, Check } from '../../components/ui/Icons'
import ModeToggle from './ModeToggle'
import { useForm } from '../../hooks/useForm'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { createEnquiry } from '../../services/academyService'
import { applyRedeemCode, normaliseCode } from '../../utils/redeem'
import { validateAcademyEnquiry } from '../../utils/validation'
import { batchesFor, interestOptions, modeLabel, resolveInterest } from '../../data/academy'
import { featuredCode } from '../../data/redeemCodes'
import { formatPrice, site } from '../../config/site'
import styles from './AcademyEnquiry.module.css'

const EXPERIENCE = [
  'New to photography',
  'Hobbyist — I shoot now and then',
  'Working photographer',
  'Videographer or content creator',
].map((label) => ({ value: label, label }))

const shortDate = new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })

const INITIAL = {
  interest: '',
  mode: 'studio',
  batchId: '',
  phone: '',
  experience: '',
  message: '',
  redeemCode: '',
}

function Success({ enquiry, onReset }) {
  return (
    <div className={styles.success}>
      <span className={styles.successIcon}>
        <Check size={26} />
      </span>
      <p className={styles.successTitle}>
        Thank you, <em>{enquiry.name.split(' ')[0]}</em>.
      </p>
      <p className="muted">
        We’ll call you on <strong>{enquiry.phone}</strong> within 24 hours to answer your questions and confirm the
        right batch for you.
      </p>
      <dl className={styles.summary}>
        <div>
          <dt>Interested in</dt>
          <dd>{enquiry.itemName}</dd>
        </div>
        {enquiry.mode && (
          <div>
            <dt>Format</dt>
            <dd>{modeLabel(enquiry.mode)}</dd>
          </div>
        )}
        {enquiry.redeemCode && (
          <div>
            <dt>Code</dt>
            <dd>
              {enquiry.redeemCode} (−{formatPrice(enquiry.discount)})
            </dd>
          </div>
        )}
        {enquiry.total != null && (
          <div className={styles.summaryTotal}>
            <dt>Fee after discount</dt>
            <dd>{formatPrice(enquiry.total)}</dd>
          </div>
        )}
      </dl>
      <p className={styles.reference}>
        Reference <strong>{enquiry.reference}</strong>
      </p>
      <button type="button" className="link-arrow" onClick={onReset}>
        Send another enquiry <ArrowRight />
      </button>
    </div>
  )
}

/** "Enrol or enquire" form with live redeem-code preview. */
export default function AcademyEnquiry({ preset }) {
  const { user } = useAuth()
  const toast = useToast()
  // The last code the visitor applied; it is re-checked live as their choice changes.
  const [appliedCode, setAppliedCode] = useState('')
  const [enquiry, setEnquiry] = useState(null)
  const { values, errors, status, bind, setValue, handleSubmit, reset } = useForm(
    { name: user?.name ?? '', email: user?.email ?? '', ...INITIAL },
    validateAcademyEnquiry,
  )

  // "Enquire now" / "Reserve" buttons elsewhere on the page prefill the form.
  useEffect(() => {
    if (!preset) return
    setValue('interest', preset.interest)
    if (preset.mode) setValue('mode', preset.mode)
    setValue('batchId', preset.batchId ?? '')
  }, [preset, setValue])

  const interest = resolveInterest(values.interest, values.mode)
  const courseId = interest?.kind === 'course' ? interest.item.id : null

  const batchOptions = useMemo(
    () =>
      courseId
        ? batchesFor(courseId, values.mode).map((b) => ({
            value: b.id,
            label: `${shortDate.format(new Date(`${b.start}T00:00:00`))} · ${b.label} · ${b.seats} seats left`,
          }))
        : [],
    [courseId, values.mode],
  )

  // Drop a chosen batch that no longer matches the course or format.
  useEffect(() => {
    if (values.batchId && !batchOptions.some((o) => o.value === values.batchId)) setValue('batchId', '')
  }, [batchOptions, values.batchId, setValue])

  const redeem = appliedCode ? applyRedeemCode(appliedCode, interest ?? {}) : null
  const fee = interest?.amount ?? null
  const discount = redeem?.ok ? redeem.discount : 0

  const applyCode = (raw = values.redeemCode) => {
    const code = normaliseCode(raw)
    if (!code) return
    setValue('redeemCode', code)
    setAppliedCode(code)
    const result = applyRedeemCode(code, interest ?? {})
    if (result.ok) toast.success(`Code ${result.code} applied — ${result.label}.`)
  }

  const codeBinding = bind('redeemCode')
  const onCodeChange = (e) => {
    codeBinding.onChange(e)
    if (appliedCode && normaliseCode(e.target.value) !== appliedCode) setAppliedCode('')
  }

  const codeMessage = redeem
    ? redeem.ok
      ? { ok: true, text: `${redeem.code} applied — ${redeem.label}` }
      : { ok: false, text: redeem.error }
    : errors.redeemCode
      ? { ok: false, text: errors.redeemCode }
      : null

  const submit = handleSubmit(
    async (data) => {
      const saved = await createEnquiry(data)
      setEnquiry(saved)
      toast.success('Enquiry sent — we’ll call you within 24 hours.')
    },
    (err) => toast.error(err.message),
  )

  const startOver = () => {
    reset()
    setEnquiry(null)
    setAppliedCode('')
  }

  return (
    <section id="enquire" className="section section--alt" aria-labelledby="enquire-title">
      <div className={`container ${styles.layout}`}>
        <div className={styles.intro}>
          <p className="eyebrow">Enrol or enquire</p>
          <SplitReveal as="h2" id="enquire-title" className="display-md">
            Start your <em>journey</em>
          </SplitReveal>
          <Reveal className={styles.introBody} stagger={0.1}>
            <p className="lead">
              Tell us what you’d like to learn. We’ll call you back, answer every question and help you pick the right
              batch — no pressure, no obligation.
            </p>
            <ul className={styles.contact}>
              <li>
                <span>Call / WhatsApp</span>
                <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
              </li>
              <li>
                <span>Email</span>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <span>Office hours</span>
                {site.hours}
              </li>
            </ul>
            <div className={styles.ticket}>
              <span className={styles.ticketLabel}>Redeem code</span>
              <span className={styles.ticketCode}>{featuredCode.code}</span>
              <span className={styles.ticketText}>{featuredCode.label}</span>
              <button type="button" className={styles.ticketBtn} onClick={() => applyCode(featuredCode.code)} disabled={!!enquiry}>
                Use this code
              </button>
            </div>
          </Reveal>
        </div>

        <Reveal className={styles.card} y={50}>
          {enquiry ? (
            <Success enquiry={enquiry} onReset={startOver} />
          ) : (
            <form onSubmit={submit} noValidate className={styles.form}>
              <div className="form-grid form-grid--2">
                <Field label="Your name" autoComplete="name" {...bind('name')} />
                <Field label="Phone / WhatsApp" type="tel" autoComplete="tel" placeholder="+91" {...bind('phone')} />
                <Field className="span-2" label="Email" type="email" autoComplete="email" {...bind('email')} />
                <Field
                  className="span-2"
                  as="select"
                  label="I’m interested in"
                  placeholder="Choose a course or workshop"
                  optionGroups={interestOptions}
                  {...bind('interest')}
                />

                {interest?.kind === 'workshop' ? (
                  <p className={`span-2 ${styles.fixedMode}`}>
                    Format: <strong>{interest.item.place}</strong> · {interest.item.duration}
                  </p>
                ) : (
                  <div className={`field span-2 ${errors.mode ? 'field--invalid' : ''}`}>
                    <span className="field__label">
                      How would you like to learn?{interest?.kind !== 'course' && <small> (optional)</small>}
                    </span>
                    <ModeToggle value={values.mode} onChange={(m) => setValue('mode', m)} name="enquiry-mode" />
                    {errors.mode && <p className="field__error">{errors.mode}</p>}
                  </div>
                )}

                {batchOptions.length > 0 && (
                  <Field
                    className="span-2"
                    as="select"
                    label="Preferred batch"
                    optional
                    placeholder="Next available batch"
                    options={batchOptions}
                    {...bind('batchId')}
                  />
                )}

                <Field
                  className="span-2"
                  as="select"
                  label="Your experience"
                  optional
                  placeholder="Choose one"
                  options={EXPERIENCE}
                  {...bind('experience')}
                />
                <Field
                  className="span-2"
                  as="textarea"
                  label="Anything you’d like to ask?"
                  optional
                  placeholder="Your goals, the camera you have, preferred timings…"
                  {...bind('message')}
                />

                <div className={`span-2 ${styles.codeRow}`}>
                  <Field
                    label="Redeem code"
                    optional
                    placeholder="e.g. FIRSTFRAME"
                    autoComplete="off"
                    {...codeBinding}
                    error={undefined}
                    onChange={onCodeChange}
                    className={styles.codeField}
                  />
                  <button
                    type="button"
                    className={`btn btn--ghost ${styles.applyBtn}`}
                    onClick={() => applyCode()}
                    disabled={!values.redeemCode.trim()}
                  >
                    Apply
                  </button>
                  {codeMessage && (
                    <p className={codeMessage.ok ? styles.codeOk : 'field__error'} role="status">
                      {codeMessage.ok && <Check size={14} />} {codeMessage.text}
                    </p>
                  )}
                </div>
              </div>

              <div className={styles.price} aria-live="polite">
                {fee != null ? (
                  <dl>
                    <div>
                      <dt>
                        {interest.item.name}
                        {interest.mode && <small>{modeLabel(interest.mode)}</small>}
                      </dt>
                      <dd>{formatPrice(fee)}</dd>
                    </div>
                    {discount > 0 && (
                      <div className={styles.discountRow}>
                        <dt>Code {redeem.code}</dt>
                        <dd>−{formatPrice(discount)}</dd>
                      </div>
                    )}
                    <div className={styles.totalRow}>
                      <dt>You pay</dt>
                      <dd>{formatPrice(fee - discount)}</dd>
                    </div>
                  </dl>
                ) : (
                  <p className="muted">
                    {interest?.kind === 'undecided'
                      ? 'Not sure where to start? We’ll recommend the right course on a quick call.'
                      : 'Choose a course or workshop to see the fee — and any discount from your code.'}
                  </p>
                )}
              </div>

              <button type="submit" className="btn btn--block" disabled={status === 'submitting'}>
                {status === 'submitting' ? (
                  <>
                    <span className="spinner" aria-hidden="true" /> Sending…
                  </>
                ) : (
                  <>
                    Send enquiry <ArrowRight />
                  </>
                )}
              </button>
              <p className={styles.fine}>No payment now. Your seat and final fee are confirmed on our call.</p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
