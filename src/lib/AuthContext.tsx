import { createContext, useContext, useEffect, useState } from 'react'
import { getCurrentUser } from './api'

interface AuthContextType {
  isAuthenticated: boolean
  accessToken: string | null
  username: string | null
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  accessToken: null,
  username: null,
  login: () => {},
  logout: () => {},
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('access')
    if (storedToken) {
      setAccessToken(storedToken)
      getCurrentUser(storedToken)
        .then((user) => setUsername(user.username))
        .catch(() => {
          // token expired or invalid
          logout()
        })
    }
  }, [])

  const login = async (token: string) => {
    localStorage.setItem('access', token)
    setAccessToken(token)

    try {
      const user = await getCurrentUser(token)
      setUsername(user.username)
    } catch {
      logout()
    }
  }

  const logout = () => {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    setAccessToken(null)
    setUsername(null)
  }

  const value: AuthContextType = {
    isAuthenticated: !!accessToken,
    accessToken,
    username,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
