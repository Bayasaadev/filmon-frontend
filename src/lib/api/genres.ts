import API from './index'

export async function fetchGenres() {
    const response = await API.get('films/genres/')
    return response.data.results
}

export async function createGenre(name: string, token: string) {
    const response = await API.post(
        'films/genres/',
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
    )
    return response.data
}

export async function updateGenre(id: number, name: string, token: string) {
    const response = await API.put(
        `films/genres/${id}/`,
        { headers: { Authorization: `Bearer ${token}` } }
    )
    return response.data
}

export async function deleteGenre(id: number, token: string) {
    const response = await API.delete(
        `films/genres/${id}/`,
        { headers: { Authorization: `Bearer ${token}` } }
    )
    return response.data
}