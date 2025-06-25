import { STORAGE_KEYS } from '../constants/app'
import type { User } from '../types'

export const storage = {
  // Token management
  getToken: (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
  },

  setToken: (token: string): void => {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token)
  },

  removeToken: (): void => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
  },

  // User data management
  getUser: (): User | null => {
    try {
      const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA)
      return userData ? JSON.parse(userData) : null
    } catch (error) {
      console.error('Error parsing user data:', error)
      return null
    }
  },

  setUser: (user: User): void => {
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user))
  },

  removeUser: (): void => {
    localStorage.removeItem(STORAGE_KEYS.USER_DATA)
  },

  // Theme management
  getTheme: (): string => {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'light'
  },

  setTheme: (theme: string): void => {
    localStorage.setItem(STORAGE_KEYS.THEME, theme)
  },

  // Language management
  getLanguage: (): string => {
    return localStorage.getItem(STORAGE_KEYS.LANGUAGE) || 'en'
  },

  setLanguage: (language: string): void => {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, language)
  },

  // Clear all auth data
  clearAuth: (): void => {
    storage.removeToken()
    storage.removeUser()
  },

  // Clear all data
  clearAll: (): void => {
    localStorage.clear()
  },
}
