import { createContext, useContext, useEffect, useState } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  accessToken: string | null
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  accessToken: null,
  login: () => {},
  logout: () => {},
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('access')
    if (stored) {
      setAccessToken(stored)
    }
  }, [])

  const login = (token: string) => {
    localStorage.setItem('access', token)
    setAccessToken(token)
  }

  const logout = () => {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    setAccessToken(null)
  }

  const value: AuthContextType = {
    isAuthenticated: !!accessToken,
    accessToken,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
