import Link from 'next/link'
import { useAuth } from '@/lib/AuthContext'

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth()

  return (
    <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-primary">
        Filmon
      </Link>
      <nav className="space-x-4">
        {isAuthenticated ? (
          <>
            <button
              onClick={logout}
              className="text-gray-700 hover:text-red-600"
            >
              Logout
            </button>
          </>
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
