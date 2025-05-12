import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/lib/AuthContext'
import { getUserProfile } from '@/lib/api/auth'

interface AdminLayoutProps {
    children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const { accessToken } = useAuth()
    const router = useRouter()
    const [isAdmin, setIsAdmin] = useState(false)
    const [isStaff, setIsStaff] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        if (!accessToken) {
            setLoading(false)
            return
        }

        getUserProfile(accessToken)
            .then(profile => {
                setIsStaff(profile.is_staff)
                setIsAdmin(profile.is_superuser)
                
                if (!profile.is_staff && !profile.is_superuser) {
                    router.replace('/')
                }
            })
            .catch(() => { 
                router.replace('/')
            })
            .finally(() => setLoading(false))
    }, [accessToken, router])

    if (loading) return null
    if (!isStaff && !isAdmin) return null
    
    return (
        <div className="flex min-h-screen bg-gray-100">
            <aside className="w-64 bg-white shadow p-4 space-y-4">
                <h2 className="text-xl font-bold text-primary mb-4">Admin Panel</h2>
                {isAdmin && (
                    <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase">Users</h3>
                        <ul className="pl-2 mt-1">
                            <li>
                                <Link href="/admin/users" className="text-blue-600 hover:underline">Manager Users</Link>
                            </li>
                        </ul>
                    </div>
                )}

                {(isStaff || isAdmin) && (
                    <>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-500 uppercase">Films</h3>
                            <ul className="pl-2 mt-1 space-y-1">
                                <li>
                                    <Link href="/admin/films" className="hover:underline">Films</Link>
                                </li>
                                <li>
                                    <Link href="/admin/films/genres" className="hover:underline">Genres</Link>
                                </li>
                                <li>
                                    <Link href="/admin/films/tags" className="hover:underline">Tags</Link>
                                </li>
                                <li>
                                    <Link href="/admin/films/studios" className="hover:underline">Studios</Link>
                                </li>
                                <li>
                                    <Link href="/admin/films/streamings" className="hover:underline">Streamings</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-500 uppercase">Artists</h3>
                            <ul className="pl-2 mt-1">
                                <li>
                                    <Link href="/admin/artists" className="hover:underline">Artists</Link>
                                </li>
                            </ul>
                        </div>
                    </>
                )}
            </aside>

            <main className="flex-1 p-6">{children}</main>
        </div>
    )
}
