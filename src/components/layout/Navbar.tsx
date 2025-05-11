import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '@/lib/AuthContext'
import { useEffect, useState } from 'react'
import { getUserProfile } from '@/lib/api'

export default function Navbar() {
  const router = useRouter()
  const { isAuthenticated, accessToken, logout } = useAuth()

  const [avatar, setAvatar] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)

  useEffect(() => {
    if (isAuthenticated && accessToken) {
      getUserProfile(accessToken)
        .then(data => {
          setAvatar(data.avatar)
          setUsername(data.username)
        })
        .catch(() => {
          setAvatar(null)
          setUsername(null)
        })
    }
  }, [isAuthenticated, accessToken])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const getInitial = () => {
    return username?.charAt(0).toUpperCase() ?? '?'
  }

  return (
    <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-primary">
        Filmon
      </Link>
      <nav className="space-x-4 flex items-center">
        {isAuthenticated ? (
          <Link href="/profile/me">
            {avatar ? (
              <img
                src={avatar}
                alt="User Avatar"
                className="w-9 h-9 rounded-full object-cover cursor-pointer"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold cursor-pointer">
                {getInitial()}
              </div>
            )}
          </Link>
        ) : (
          <>
            <Link href="/auth/login" className="text-gray-700 hover:text-primary">
              Login
            </Link>
            <Link href="/auth/register" className="text-gray-700 hover:text-primary">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  )
}
