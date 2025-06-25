// User types
export interface User {
  id: string
  username: string
  email?: string
  role?: string
  permissions?: string[]
}

// Authentication types
export interface AuthState {
  isAuthenticated: boolean
  user: User | null
  loading: boolean
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface LoginResponse {
  access_token: string
  user?: User
  message?: string
}

// Route types
export interface RouteConfig {
  path: string
  element: React.ReactNode
  title?: string
  requiresAuth?: boolean
  roles?: string[]
  breadcrumb?: string[]
  meta?: {
    description?: string
    keywords?: string[]
    noIndex?: boolean
  }
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

// Component Props types
export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'blue' | 'gray' | 'white'
  text?: string
  fullScreen?: boolean
}

export interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary: () => void
}
