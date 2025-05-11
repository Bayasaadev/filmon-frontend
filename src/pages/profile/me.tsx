import { useAuth } from '@/lib/AuthContext'
import { getUserProfile } from '@/lib/api'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function ProfilePage() {
  const { accessToken, username } = useAuth()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (accessToken) {
      getUserProfile(accessToken)
        .then(data => setProfile(data))
        .catch(() => setProfile(null))
        .finally(() => setLoading(false))
    }
  }, [accessToken])

  if (loading) return <p className="text-center mt-10">Loading profile...</p>
  if (!profile) return <p className="text-center mt-10 text-red-500">Failed to load profile.</p>

  const getInitial = () => username?.charAt(0).toUpperCase() || '?'

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow space-y-4">
      <div className="flex items-center space-x-4">
        {profile.avatar ? (
          <img src={profile.avatar} alt="avatar" className="w-16 h-16 rounded-full object-cover" />
        ) : (
          <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
            {getInitial()}
          </div>
        )}
        <div>
          <h2 className="text-xl font-bold">{profile.username}</h2>
          <p className="text-gray-600">{profile.email}</p>
          <Link href="/profile/edit">Edit profile</Link>
        </div>
      </div>

      <div>
        <p className="text-sm text-gray-800">{profile.bio}</p>
        {profile.location && <p className="text-sm">📍 {profile.location}</p>}
        {profile.website && (
          <p className="text-sm">
            🌐 <a href={profile.website} className="text-blue-600 hover:underline">{profile.website}</a>
          </p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-lg font-bold">{profile.watched_count}</p>
          <p className="text-sm text-gray-600">Watched</p>
        </div>
        <div>
          <p className="text-lg font-bold">{profile.watchlisted_count}</p>
          <p className="text-sm text-gray-600">Watchlist</p>
        </div>
        <div>
          <p className="text-lg font-bold">{profile.liked_count}</p>
          <p className="text-sm text-gray-600">Liked</p>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Recent Watched</h3>
        <ul className="list-disc list-inside text-sm text-gray-700">
          {profile.recent_watched.map((film: any) => (
            <li key={film.id}>{film.title}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Favorites</h3>
        <ul className="list-disc list-inside text-sm text-gray-700">
          {profile.favorite_films.map((film: any) => (
            <li key={film.id}>{film.title}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
