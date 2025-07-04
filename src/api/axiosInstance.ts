import axios from 'axios'
import { toast } from 'react-toastify'
import { storage } from '../utils/storage'

// Global logout function that can be set from the auth context
let globalLogout: (() => void) | null = null

// Function to set the logout function from auth context
export const setGlobalLogout = (logoutFn: () => void) => {
  globalLogout = logoutFn
}

const client = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  },
})

// Add a request interceptor to include the Authorization header
client.interceptors.request.use(
  config => {
    const token = storage.getToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Add a response interceptor to handle 401 errors
client.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response?.status === 401) {
      // Clear auth data
      storage.clearAuth()

      // Show user-friendly notification
      toast.error('Session expired. Please login again.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })

      // Call global logout function if available
      if (globalLogout) {
        globalLogout()
      }

      // Show error message in console for debugging
      console.error('Session expired. Please login again.')
    }

    return Promise.reject(error)
  }
)

// Export the configured instance
export default client
