import axios from 'axios'

const API = axios.create({
    baseURL: 'http://localhost:8000/api/',
    headers: {
        'Content-Type': 'application/json',
    },
})

export const BASE_API_URL = 'http://localhost:8000'
export default API