import React, { createContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'
import { storage } from '../utils/storage'
import { PUBLIC_ROUTES, PROTECTED_ROUTES } from '../constants/routes'
import type { User, AuthState } from '../types'

interface AuthContextType extends AuthState {
  login: (token: string, userData?: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Check authentication status on mount
  useEffect(() => {
    const token = storage.getToken()
    if (token) {
      // You can add token validation here if needed
      setIsAuthenticated(true)
      // Get user data from storage
      const userData = storage.getUser()
      setUser(userData)
    }
    setLoading(false)
  }, [])

  const login = (token: string, userData?: User) => {
    storage.setToken(token)
    if (userData) {
      storage.setUser(userData)
      setUser(userData)
    }
    setIsAuthenticated(true)
    message.success('Login successful!')
    navigate(PROTECTED_ROUTES.CREDENTIALS)
  }

  const logout = () => {
    storage.clearAuth()
    setIsAuthenticated(false)
    setUser(null)
    message.success('Logged out successfully')
    navigate(PUBLIC_ROUTES.HOME)
  }

  const value: AuthContextType = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthContext }
