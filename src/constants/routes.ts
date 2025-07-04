// Public routes
export const PUBLIC_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  AUTH: '/auth',
} as const

// Protected routes
export const PROTECTED_ROUTES = {
  CREDENTIALS: '/credentials',
  CREDENTIALS_ADD: '/credentials/add',
  CREDENTIALS_CHANGE: '/credentials/change',
  FILE_DOWNLOAD_DEFINITION: '/file-download-definition',
  FILE_DOWNLOAD_DEFINITION_ADD: '/file-download-definition/add',
  FILE_DOWNLOAD_DEFINITION_CHANGE: '/file-download-definition/change',
  FILES: '/files',
  INPUT_FILE_DEFINITIONS: '/input-file-definition',
  INPUT_FILE_DEFINITION_ADD: '/input-file-definition/add',
  INPUT_FILE_DEFINITION_CHANGE: '/input-file-definition/change',
  PREP_MAILS: '/prep-mail',
  TRIGGER_LEADS: '/trigger-leads',
  TRIGGER_LEADS_BY_ID: '/trigger-leads/ID',
} as const

// Error routes
export const ERROR_ROUTES = {
  ACCESS_DENIED: '/403',
  NOT_FOUND: '/404',
  SERVER_ERROR: '/500',
  MAINTENANCE: '/maintenance',
} as const

// Redirect routes
export const REDIRECT_ROUTES = {
  ADMIN_TO_DASHBOARD: '/admin',
  HOME_ALIASES: ['/home', '/index', '/main'],
} as const
