// Tiny persistence layer used by the mock services. When a real backend
// exists, the services swap these calls for fetch() — the UI stays the same.

const PREFIX = 'aurelia:'

export function read(key, fallback) {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function write(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    // Storage full or blocked (private mode) — the mock simply doesn't persist.
  }
}

export function remove(key) {
  try {
    localStorage.removeItem(PREFIX + key)
  } catch {
    // ignore
  }
}

const IS_TEST = import.meta.env.MODE === 'test'

/** Simulates network latency so loading states are visible. */
export const simulateLatency = (ms = 650) => new Promise((resolve) => setTimeout(resolve, IS_TEST ? 0 : ms))

export const createId = () =>
  globalThis.crypto?.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`

/** Error carrying per-field messages so forms can highlight inputs. */
export class ServiceError extends Error {
  constructor(message, fieldErrors = {}) {
    super(message)
    this.name = 'ServiceError'
    this.fieldErrors = fieldErrors
  }
}
