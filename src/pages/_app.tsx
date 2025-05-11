import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '@/components/layout/Navbar'
import { AuthProvider } from '@/lib/AuthContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-6">
        <Component {...pageProps} />
      </main>
    </AuthProvider>
  )
}
