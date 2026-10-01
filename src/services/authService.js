// MOCK authentication — accounts live in this browser's localStorage only.
// Replace with real auth (your backend, Firebase, etc.) before going live.
import { read, write, remove, simulateLatency, createId, ServiceError } from './storage'
import { validateSignIn, validateSignUp, hasErrors } from '../utils/validation'

const USERS = 'users'
const SESSION = 'session'

async function hashPassword(password) {
  const bytes = new TextEncoder().encode(password)
  if (globalThis.crypto?.subtle) {
    const digest = await crypto.subtle.digest('SHA-256', bytes)
    return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('')
  }
  // Fallback for non-secure contexts (FNV-1a) — fine for a demo, never for production.
  let hash = 2166136261
  for (const b of bytes) {
    hash ^= b
    hash = Math.imul(hash, 16777619)
  }
  return (hash >>> 0).toString(16)
}

const toSession = ({ passwordHash: _omit, ...user }) => user
const normaliseEmail = (email) => email.trim().toLowerCase()

export function getCurrentUser() {
  return read(SESSION, null)
}

export async function signUp(input) {
  const errors = validateSignUp(input)
  if (hasErrors(errors)) throw new ServiceError('Please check the highlighted fields.', errors)
  await simulateLatency()

  const users = read(USERS, [])
  const email = normaliseEmail(input.email)
  if (users.some((u) => u.email === email)) {
    throw new ServiceError('An account with this email already exists.', {
      email: 'This email is already registered — try signing in.',
    })
  }

  const user = {
    id: createId(),
    name: input.name.trim(),
    email,
    provider: 'password',
    createdAt: new Date().toISOString(),
    passwordHash: await hashPassword(input.password),
  }
  write(USERS, [...users, user])
  const session = toSession(user)
  write(SESSION, session)
  return session
}

export async function signIn(input) {
  const errors = validateSignIn(input)
  if (hasErrors(errors)) throw new ServiceError('Please check the highlighted fields.', errors)
  await simulateLatency()

  const user = read(USERS, []).find((u) => u.email === normaliseEmail(input.email))
  if (!user || user.passwordHash !== (await hashPassword(input.password))) {
    throw new ServiceError('Incorrect email or password.', { password: 'Incorrect email or password.' })
  }
  const session = toSession(user)
  write(SESSION, session)
  return session
}

/** Simulated "Continue with Google" — signs in a demo Google profile. */
export async function signInWithGoogle() {
  await simulateLatency(900)
  const session = {
    id: 'google-demo-user',
    name: 'Google Guest',
    email: 'guest.google@example.com',
    provider: 'google',
    createdAt: new Date().toISOString(),
  }
  write(SESSION, session)
  return session
}

export async function signOut() {
  await simulateLatency(200)
  remove(SESSION)
}
