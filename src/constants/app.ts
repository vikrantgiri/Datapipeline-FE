// Application constants
export const APP_CONFIG = {
  NAME: 'HashRoot Data Pipeline',
  VERSION: '1.0.0',
  DESCRIPTION: 'Data Pipeline Management System',
  AUTHOR: 'HashRoot',
} as const

// Local storage keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  USER_DATA: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const

// API configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const

// Loading spinner sizes
export const LOADING_SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
} as const

// Loading spinner colors
export const LOADING_COLORS = {
  BLUE: 'blue',
  GRAY: 'gray',
  WHITE: 'white',
} as const

// User roles
export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user',
} as const

// Permission levels
export const PERMISSIONS = {
  READ: 'read',
  WRITE: 'write',
  DELETE: 'delete',
  ADMIN: 'admin',
} as const
