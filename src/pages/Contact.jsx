import PageHeader from '../components/ui/PageHeader'
import Field from '../components/ui/Field'
import Reveal from '../components/motion/Reveal'
import ParallaxImage from '../components/motion/ParallaxImage'
import { ArrowRight } from '../components/ui/Icons'
import { useForm } from '../hooks/useForm'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { sendMessage } from '../services/contactService'
import { validateContact } from '../utils/validation'
import { images } from '../data/images'
import { site } from '../config/site'
import { usePageTitle } from '../hooks/usePageTitle'
import styles from './Contact.module.css'

const SUBJECTS = [
  { value: 'general', label: 'General enquiry' },
  { value: 'pricing', label: 'Pricing & availability' },
  { value: 'destination', label: 'Destination wedding' },
  { value: 'press', label: 'Press & collaborations' },
]

export default function Contact() {
  usePageTitle('Contact')
  const { user } = useAuth()
  const toast = useToast()
  const { values, status, bind, handleSubmit, reset } = useForm(
    { name: user?.name ?? '', email: user?.email ?? '', subject: '', message: '' },
    validateContact,
  )

  const submit = handleSubmit(
    async (data) => {
      await sendMessage(data)
      toast.success('Message sent — we’ll reply within one working day.')
    },
    (err) => toast.error(err.message),
  )

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Let’s <em>talk</em>
          </>
        }
        intro="Questions about dates, collections or destination weddings? Drop us a line — a real person reads every message."
      />

      <section className={styles.section}>
        <div className={`container ${styles.grid}`}>
          <Reveal className={styles.info} stagger={0.1}>
            <div className={styles.block}>
              <p className={styles.label}>Email</p>
              <a className={`text-link ${styles.big}`} href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </div>
            <div className={styles.block}>
              <p className={styles.label}>Phone / WhatsApp</p>
              <a className={`text-link ${styles.big}`} href={`tel:${site.phone.replace(/\s/g, '')}`}>
                {site.phone}
              </a>
            </div>
            <div className={styles.block}>
              <p className={styles.label}>Studio hours</p>
              <p>{site.hours}</p>
            </div>
            <div className={styles.block}>
              <p className={styles.label}>Where</p>
              <p>{site.location}</p>
            </div>
            <div className={styles.block}>
              <p className={styles.label}>Follow along</p>
              <ul className={styles.socials}>
                {site.socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noreferrer" className="text-link">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <ParallaxImage className={styles.image} {...images.contactSide} />
          </Reveal>

          <Reveal className={styles.formCard} y={50}>
            {status === 'success' ? (
              <div className={styles.thanks}>
                <p className={styles.thanksTitle}>
                  Thank you, <em>{values.name.split(' ')[0]}</em>.
                </p>
                <p className="muted">Your message is on its way. We usually reply within one working day.</p>
                <button type="button" className="link-arrow" onClick={reset}>
                  Send another message <ArrowRight />
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className={styles.form}>
                <h2 className={styles.formTitle}>Send a message</h2>
                <div className="form-grid form-grid--2">
                  <Field label="Your name" autoComplete="name" {...bind('name')} />
                  <Field label="Email" type="email" autoComplete="email" {...bind('email')} />
                  <Field
                    className="span-2"
                    as="select"
                    label="Subject"
                    placeholder="What’s it about?"
                    options={SUBJECTS}
                    {...bind('subject')}
                  />
                  <Field
                    className="span-2"
                    as="textarea"
                    label="Message"
                    placeholder="Tell us a little about your plans…"
                    {...bind('message')}
                  />
                </div>
                <button type="submit" className="btn" disabled={status === 'submitting'}>
                  {status === 'submitting' ? (
                    <>
                      <span className="spinner" aria-hidden="true" /> Sending…
                    </>
                  ) : (
                    <>
                      Send message <ArrowRight />
                    </>
                  )}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  )
}
