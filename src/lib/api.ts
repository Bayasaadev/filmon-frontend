import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:8000/api/', // adjust for prod later
  headers: {
    'Content-Type': 'application/json',
  },
})

// Login request
export async function loginUser(username: string, password: string) {
  const response = await API.post('auth/login/', {
    username,
    password,
  })
  return response.data // { access: '...', refresh: '...' }
}

export default API
