import { useAuth } from '@/lib/AuthContext'
import { getUserProfile, updateUserProfile } from '@/lib/api'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function EditProfilePage() {
  const { accessToken } = useAuth()
  const router = useRouter()
  const [form, setForm] = useState({
    bio: '',
    location: '',
    website: '',
  })
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (accessToken) {
      getUserProfile(accessToken)
        .then(profile => {
          setForm({
            bio: profile.bio || '',
            location: profile.location || '',
            website: profile.website || '',
          })
        })
        .finally(() => setLoading(false))
    }
  }, [accessToken])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const data = new FormData()
    data.append('bio', form.bio)
    data.append('location', form.location)
    data.append('website', form.website)
    if (avatarFile) {
      data.append('avatar', avatarFile)
    }

    console.log(data)

    try {
      await updateUserProfile(accessToken!, data)
      router.push('/profile/me')
    } catch (err: any) {
      setError('Update failed.')
    }
  }

  if (loading) return <p className="text-center mt-10">Loading profile...</p>

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Avatar</label>
          <input type="file" accept="image/*" onChange={e => setAvatarFile(e.target.files?.[0] || null)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Bio</label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Website</label>
          <input
            name="website"
            value={form.website}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {error && <p className="text-red-600">{error}</p>}

        <button className="w-full bg-primary text-white py-2 rounded hover:bg-blue-700">
          Save Changes
        </button>
      </form>
    </div>
  )
}
