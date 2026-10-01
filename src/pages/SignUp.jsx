import { useState } from 'react'
import AuthShell from '../components/auth/AuthShell'
import { DemoNotice, Divider, GoogleButton, PasswordField, StrengthMeter } from '../components/auth/AuthParts'
import Field from '../components/ui/Field'
import { ArrowRight } from '../components/ui/Icons'
import { TransitionLink, usePageTransition } from '../components/transition/PageTransition'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { useForm } from '../hooks/useForm'
import { usePageTitle } from '../hooks/usePageTitle'
import { passwordStrength, validateSignUp } from '../utils/validation'
import { images } from '../data/images'
import styles from './Auth.module.css'

export default function SignUp() {
  usePageTitle('Create account')
  const { signUp, signInWithGoogle } = useAuth()
  const toast = useToast()
  const go = usePageTransition()
  const [googleLoading, setGoogleLoading] = useState(false)
  const { values, errors, status, bind, handleSubmit } = useForm(
    { name: '', email: '', password: '', confirmPassword: '', acceptTerms: false },
    validateSignUp,
  )

  const welcome = (u) => {
    toast.success(`Welcome to the studio, ${u.name.split(' ')[0]}!`)
    go('/')
  }

  const submit = handleSubmit(
    async (data) => welcome(await signUp(data)),
    (err) => toast.error(err.message),
  )

  const google = async () => {
    setGoogleLoading(true)
    try {
      welcome(await signInWithGoogle())
    } catch (err) {
      toast.error(err.message)
      setGoogleLoading(false)
    }
  }

  const busy = status === 'submitting' || googleLoading

  return (
    <AuthShell image={images.signUp} quote="Your story deserves to be told beautifully — let’s begin.">
      <header className={styles.header}>
        <p className="eyebrow">Join us</p>
        <h1 className="display-md">
          Create an <em>account</em>
        </h1>
        <p className="muted">Save your booking details, track your enquiry and leave a review after the big day.</p>
      </header>

      <GoogleButton onClick={google} loading={googleLoading} disabled={busy} />
      <Divider>or sign up with email</Divider>

      <form onSubmit={submit} noValidate className={styles.form}>
        <Field label="Full name" autoComplete="name" placeholder="e.g. Asha Rao" {...bind('name')} />
        <Field label="Email" type="email" autoComplete="email" placeholder="you@example.com" {...bind('email')} />
        <PasswordField
          label="Password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          {...bind('password')}
        />
        {values.password && !errors.password && <StrengthMeter score={passwordStrength(values.password)} />}
        <PasswordField label="Confirm password" autoComplete="new-password" placeholder="Repeat password" {...bind('confirmPassword')} />
        <div>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={values.acceptTerms}
              onChange={bind('acceptTerms').onChange}
              aria-invalid={errors.acceptTerms ? true : undefined}
            />
            <span>
              I agree to the <span className="text-link">terms</span> and <span className="text-link">privacy policy</span>.
            </span>
          </label>
          {errors.acceptTerms && <p className="field__error">{errors.acceptTerms}</p>}
        </div>
        <button type="submit" className="btn btn--block" disabled={busy}>
          {status === 'submitting' ? (
            <>
              <span className="spinner" aria-hidden="true" /> Creating account…
            </>
          ) : (
            <>
              Create account <ArrowRight />
            </>
          )}
        </button>
      </form>

      <p className={styles.switch}>
        Already have an account?{' '}
        <TransitionLink to="/signin" className="text-link">
          Sign in
        </TransitionLink>
      </p>
      <DemoNotice />
    </AuthShell>
  )
}
