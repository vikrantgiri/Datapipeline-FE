// Public routes
export const PUBLIC_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  AUTH: '/auth',
} as const

// Protected routes
export const PROTECTED_ROUTES = {
  DASHBOARD: '/dashboard',
  CREDENTIALS: '/credentials',
  CREDENTIALS_ADD: '/credentials/add',
  CREDENTIALS_CHANGE: '/credentials/change',
  FILE_DOWNLOAD_DEFINITION: '/FileDownloadDefinition',
  FILE_DOWNLOAD_DEFINITION_ADD: '/FileDownloadDefinition/add',
  FILE_DOWNLOAD_DEFINITION_CHANGE: '/FileDownloadDefinition/change',
  FILES: '/Files',
  FILES_ADD: '/Files/add',
  INPUT_FILE_DEFINITIONS: '/InputFileDefinitions',
  INPUT_FILE_DEFINITION_ADD: '/InputFileDefinition/add',
  INPUT_FILE_DEFINITION_CHANGE: '/InputFileDefinition/change',
  PREP_MAILS: '/PrepMails',
  PREP_MAILS_ADD: '/PrepMails/add',
  PREP_MAILS_CHANGE: '/PrepMails/change',
  TASK_STATUS: '/TaskStatus',
  TASK_STATUS_CHANGE: '/TaskStatus/change',
  TRIGGER_LEADS: '/TriggerLeads',
  TRIGGER_LEADS_ADD: '/TriggerLeads/add',
  TRIGGER_LEADS_CHANGE: '/TriggerLeads/change',
  TASK_LOG_FILE_DD: '/TaskLog/FileDownloadDefinition',
  TASK_LOG_INPUT_FILE_DEFINITION: '/TaskLog/InputFileDefinition',
  TASK_LOG_PREP_MAILS_DEFINITION: '/TaskLog/PrepMailsDefinition',
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
