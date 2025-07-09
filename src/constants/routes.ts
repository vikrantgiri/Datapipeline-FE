import { TRIGGER_ENTITIES } from './app'

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
  ACTIVITY_LOG_BY_FDD: `/activity-log/${TRIGGER_ENTITIES.FILE_DOWNLOAD_DEFINITION}`,
  FDD_ACTIVITY_LOG_BY_ID: `/activity-log/${TRIGGER_ENTITIES.FILE_DOWNLOAD_DEFINITION}/:id`,
  INPUT_FILE_DEFINITION_ACTIVITY_LOG_BY_ID: `/activity-log/${TRIGGER_ENTITIES.INPUT_FILE_DEFINITION}/:id`,
  PREP_MAIL_ACTIVITY_LOG_BY_ID: `/activity-log/${TRIGGER_ENTITIES.PREP_MAIL}/:id`,
  ACTIVITY_LOG_BY_INPUT_FILE_DEFINITION: `/activity-log/${TRIGGER_ENTITIES.INPUT_FILE_DEFINITION}`,
  ACTIVITY_LOG_BY_PREP_MAIL: `/activity-log/${TRIGGER_ENTITIES.PREP_MAIL}`,
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
