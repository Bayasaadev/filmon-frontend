import API from './index'

// Login request
export async function loginUser(username: string, password: string) {
  const response = await API.post('auth/login/', {
    username,
    password,
  })
  return response.data // { access: '...', refresh: '...' }
}

// Register request
export async function registerUser(username: string, email: string, password: string) {
  const response = await API.post('auth/register/', {
    username,
    email,
    password,
  })
  return response.data
}

// Get user
export async function getCurrentUser(accessToken: string) {
  const response = await API.get('auth/user/', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return response.data
}

// Get profile
export async function getUserProfile(accessToken: string) {
  const response = await API.get('auth/profile/me/', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return response.data
}

// Update profile
export async function updateUserProfile(accessToken: string, formData: FormData) {
  const response = await API.put('auth/profile/me/', formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}
