import Field from '../ui/Field'
import { StarInput } from './Stars'
import { ArrowRight } from '../ui/Icons'
import { useForm } from '../../hooks/useForm'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { validateReview } from '../../utils/validation'
import styles from './ReviewForm.module.css'

const MAX = 800

const REVIEW_OCCASIONS = [
  'Wedding',
  'Pre-wedding',
  'Annaprashan',
  'Mundan ceremony',
  'Other ceremony',
  'Commercial',
  'Maternity',
  'Newborn',
  'Family portraits',
].map((label) => ({ value: label, label }))

export default function ReviewForm({ onSubmit }) {
  const { user } = useAuth()
  const toast = useToast()
  const { values, status, bind, setValue, handleSubmit, reset, errors } = useForm(
    { name: user?.name ?? '', occasion: '', location: '', rating: 0, title: '', message: '' },
    validateReview,
  )

  if (status === 'success') {
    return (
      <div className={styles.thanks}>
        <p className={styles.thanksTitle}>
          Thank you, <em>{values.name.split(' ')[0]}</em>.
        </p>
        <p className="muted">Your review is now live. It means the world to us.</p>
        <button type="button" className="link-arrow" onClick={reset}>
          Write another <ArrowRight />
        </button>
      </div>
    )
  }

  const submit = handleSubmit(
    async (data) => {
      await onSubmit(data)
      toast.success('Thank you! Your review has been published.')
    },
    (err) => toast.error(err.message),
  )

  return (
    <form className={styles.form} onSubmit={submit} noValidate>
      <StarInput value={values.rating} onChange={(n) => setValue('rating', n)} error={errors.rating} />
      <div className="form-grid form-grid--2">
        <Field label="Your name(s) or brand" placeholder="e.g. Asha & Vikram" autoComplete="name" {...bind('name')} />
        <Field
          as="select"
          label="What did we photograph?"
          optional
          placeholder="Choose an occasion"
          options={REVIEW_OCCASIONS}
          {...bind('occasion')}
        />
        <Field label="Location" optional placeholder="e.g. Udaipur" {...bind('location')} />
        <Field label="Headline" optional placeholder="Sum it up in a few words" maxLength={80} {...bind('title')} />
        <Field
          className="span-2"
          as="textarea"
          label="Your experience"
          placeholder="How did it feel working with us? What do you love about your photographs?"
          maxLength={MAX}
          hint={`${values.message.length}/${MAX}`}
          {...bind('message')}
        />
      </div>
      <button type="submit" className="btn" disabled={status === 'submitting'}>
        {status === 'submitting' ? (
          <>
            <span className="spinner" aria-hidden="true" /> Publishing…
          </>
        ) : (
          <>
            Publish review <ArrowRight />
          </>
        )}
      </button>
    </form>
  )
}
