import { createContext, useContext, useMemo, useState } from 'react'
import * as authService from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.getCurrentUser())

  const value = useMemo(() => {
    const withUser = (fn) => async (...args) => {
      const next = await fn(...args)
      setUser(next)
      return next
    }
    return {
      user,
      signIn: withUser(authService.signIn),
      signUp: withUser(authService.signUp),
      signInWithGoogle: withUser(authService.signInWithGoogle),
      signOut: async () => {
        await authService.signOut()
        setUser(null)
      },
    }
  }, [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
