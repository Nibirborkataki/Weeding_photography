import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import AuthShell from '../components/auth/AuthShell'
import { DemoNotice, Divider, GoogleButton, PasswordField } from '../components/auth/AuthParts'
import Field from '../components/ui/Field'
import { ArrowRight } from '../components/ui/Icons'
import { TransitionLink, usePageTransition } from '../components/transition/PageTransition'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { useForm } from '../hooks/useForm'
import { usePageTitle } from '../hooks/usePageTitle'
import { validateSignIn } from '../utils/validation'
import { images } from '../data/images'
import styles from './Auth.module.css'

export default function SignIn() {
  usePageTitle('Sign in')
  const { user, signIn, signInWithGoogle, signOut } = useAuth()
  const toast = useToast()
  const go = usePageTransition()
  const location = useLocation()
  const redirectTo = location.state?.from ?? '/'
  const [googleLoading, setGoogleLoading] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const { values, status, bind, handleSubmit } = useForm({ email: '', password: '', remember: true }, validateSignIn)

  const welcome = (u) => {
    setLeaving(true)
    toast.success(`Welcome back, ${u.name.split(' ')[0]}.`)
    go(redirectTo)
  }

  const submit = handleSubmit(
    async (values) => welcome(await signIn(values)),
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
    <AuthShell image={images.signIn} quote="Every photograph is a letter to your future selves.">
      {user && !busy && !leaving ? (
        <div className={styles.signedIn}>
          <p className="eyebrow">Signed in</p>
          <h1 className="display-sm">
            You’re signed in as <em>{user.name}</em>
          </h1>
          <p className="muted">{user.email}</p>
          <div className={styles.row}>
            <TransitionLink to="/" className="btn">
              Go to homepage <ArrowRight />
            </TransitionLink>
            <button type="button" className="link-arrow" onClick={signOut}>
              Sign out
            </button>
          </div>
        </div>
      ) : (
        <>
          <header className={styles.header}>
            <p className="eyebrow">Welcome back</p>
            <h1 className="display-md">
              Sign <em>in</em>
            </h1>
            <p className="muted">Pick up where you left off — your bookings and favourites, all in one place.</p>
          </header>

          <GoogleButton onClick={google} loading={googleLoading} disabled={busy} />
          <Divider>or with email</Divider>

          <form onSubmit={submit} noValidate className={styles.form}>
            <Field label="Email" type="email" autoComplete="email" placeholder="you@example.com" {...bind('email')} />
            <PasswordField label="Password" autoComplete="current-password" placeholder="Your password" {...bind('password')} />
            <div className={styles.row}>
              <label className="checkbox">
                <input type="checkbox" checked={values.remember} onChange={bind('remember').onChange} />
                Remember me
              </label>
              <button
                type="button"
                className={`text-link ${styles.small}`}
                onClick={() => toast.info('Password reset will be available once accounts go live.')}
              >
                Forgot password?
              </button>
            </div>
            <button type="submit" className="btn btn--block" disabled={busy}>
              {status === 'submitting' ? (
                <>
                  <span className="spinner" aria-hidden="true" /> Signing in…
                </>
              ) : (
                <>
                  Sign in <ArrowRight />
                </>
              )}
            </button>
          </form>

          <p className={styles.switch}>
            New here?{' '}
            <TransitionLink to="/signup" className="text-link">
              Create an account
            </TransitionLink>
          </p>
          <DemoNotice />
        </>
      )}
    </AuthShell>
  )
}
