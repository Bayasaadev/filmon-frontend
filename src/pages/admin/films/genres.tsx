import AdminLayout from '@/components/admin/AdminLayout'
import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/AuthContext'
import { 
    fetchGenres, 
    createGenre, 
    updateGenre, 
    deleteGenre 
} from '@/lib/api/genres'

interface Genre {
  id: number
  name: string
  slug: string
}

export default function GenresPage() {
  const { accessToken } = useAuth()
  const [genres, setGenres] = useState<Genre[]>([])
  const [newGenre, setNewGenre] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingName, setEditingName] = useState('')

  const loadGenres = async () => {
    const data = await fetchGenres()
    setGenres(data)
  }

  useEffect(() => {
    loadGenres()
  }, [])

  const handleCreate = async () => {
    if (!newGenre.trim()) return
    await createGenre(newGenre, accessToken!)
    setNewGenre('')
    loadGenres()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this genre?')) return
    await deleteGenre(id, accessToken!)
    loadGenres()
  }

  const handleSaveEdit = async () => {
    if (editingId == null) return
    await updateGenre(editingId, editingName, accessToken!)
    setEditingId(null)
    setEditingName('')
    loadGenres()
  }

  const startEdit = (id: number, name: string) => {
    setEditingId(id)
    setEditingName(name)
  }

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">Genres</h1>

        <div className="flex mb-4 gap-2">
          <input
            value={newGenre}
            onChange={(e) => setNewGenre(e.target.value)}
            placeholder="New genre name"
            className="border px-3 py-2 rounded w-full"
          />
          <button onClick={handleCreate} className="bg-primary text-white px-4 py-2 rounded">
            Add
          </button>
        </div>

        <ul className="divide-y bg-white rounded shadow">
          {genres.map((genre) => (
            <li key={genre.id} className="flex items-center justify-between px-4 py-3">
              {editingId === genre.id ? (
                <input
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="border px-2 py-1 rounded w-1/2"
                />
              ) : (
                <span>{genre.name}</span>
              )}

              <div className="space-x-2">
                {editingId === genre.id ? (
                  <button onClick={handleSaveEdit} className="text-green-600 hover:underline">Save</button>
                ) : (
                  <button onClick={() => startEdit(genre.id, genre.name)} className="text-blue-600 hover:underline">Edit</button>
                )}
                <button onClick={() => handleDelete(genre.id)} className="text-red-600 hover:underline">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AdminLayout>
  )
}
