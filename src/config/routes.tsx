import { lazy } from 'react'
import { PUBLIC_ROUTES, PROTECTED_ROUTES } from '../constants/routes'
import type { RouteConfig } from '../types'

// Lazy load all page components
const LoginPage = lazy(() => import('../pages/Home'))

// Credentials
const Credentials = lazy(() => import('../pages/credentials/Credentials'))
const AddCredentials = lazy(() => import('../pages/credentials/AddCredentials'))
const ChangeCredentials = lazy(
  () => import('../pages/credentials/changeCredentials')
)

// File Download Definition
const FileDownloadDefinition = lazy(
  () => import('../pages/FileDownloadDefinition/FileDD')
)
const AddFileDD = lazy(
  () => import('../pages/FileDownloadDefinition/AddFileDD')
)
const ChangeFileDD = lazy(
  () => import('../pages/FileDownloadDefinition/ChangeFileDD')
)

// Files
const Files = lazy(() => import('../pages/Files/files'))

// Input File Definitions
const InputFileDefinition = lazy(
  () => import('../pages/Input-File-Definitions/InputFileDefinitions')
)
const AddInputFileDefinition = lazy(
  () => import('../pages/Input-File-Definitions/AddInputFileDefinition')
)
const ChangeInputFileDefinition = lazy(
  () => import('../pages/Input-File-Definitions/ChangeInputFileDefinition')
)

// Prep Mails
const PrepMails = lazy(() => import('../pages/prep-mails/prepMails'))

// Trigger Leads
const TriggerLeads = lazy(() => import('../pages/Trigger-leads/TriggerLeads'))

const TriggerLeadsById = lazy(
  () => import('../pages/Trigger-leads/TriggerLeadByID')
)

const Snowflake = lazy(() => import('../pages/snowflake/snowflake'))
const AddSnowflake = lazy(() => import('../pages/snowflake/AddSnowflake'))
const ChangeSnowflake = lazy(() => import('../pages/snowflake/ChangeSnowflake'))

const ActivityLog = lazy(() => import('../pages/Activity-logs/ActivityLog'))
const ActivityLogByID = lazy(
  () => import('../pages/Activity-logs/ActivityLogBYID')
)

// Public routes (no authentication required)
export const publicRoutes: RouteConfig[] = [
  {
    path: PUBLIC_ROUTES.HOME,
    element: <LoginPage />,
    title: 'Home - Data Pipeline',
    meta: {
      description: 'Welcome to the Data Pipeline Management System',
      keywords: ['data pipeline', 'management', 'dashboard'],
    },
  },
]

// Protected routes (authentication required)
export const protectedRoutes: RouteConfig[] = [
  // Credentials Management
  {
    path: PROTECTED_ROUTES.CREDENTIALS,
    element: <Credentials />,
    title: 'Credentials Management',
    requiresAuth: true,
    roles: ['admin', 'manager'],
    breadcrumb: ['Credentials'],
  },
  {
    path: PROTECTED_ROUTES.CREDENTIALS_ADD,
    element: <AddCredentials />,
    title: 'Add Credentials',
    requiresAuth: true,
    roles: ['admin', 'manager'],
    breadcrumb: ['Credentials', 'Add'],
  },
  {
    path: PROTECTED_ROUTES.CREDENTIALS_CHANGE,
    element: <ChangeCredentials />,
    title: 'Change Credentials',
    requiresAuth: true,
    roles: ['admin', 'manager'],
    breadcrumb: ['Credentials', 'Change'],
  },

  // File Download Definition
  {
    path: PROTECTED_ROUTES.FILE_DOWNLOAD_DEFINITION,
    element: <FileDownloadDefinition />,
    title: 'File Download Definition',
    requiresAuth: true,
    breadcrumb: ['File Download Definition'],
  },
  {
    path: PROTECTED_ROUTES.FILE_DOWNLOAD_DEFINITION_ADD,
    element: <AddFileDD />,
    title: 'Add File Download Definition',
    requiresAuth: true,
    breadcrumb: ['File Download Definition', 'Add'],
  },
  {
    path: PROTECTED_ROUTES.FILE_DOWNLOAD_DEFINITION_CHANGE,
    element: <ChangeFileDD />,
    title: 'Change File Download Definition',
    requiresAuth: true,
    breadcrumb: ['File Download Definition', 'Change'],
  },

  // Files
  {
    path: PROTECTED_ROUTES.FILES,
    element: <Files />,
    title: 'Files Management',
    requiresAuth: true,
    breadcrumb: ['Files'],
  },

  // Input File Definitions
  {
    path: PROTECTED_ROUTES.INPUT_FILE_DEFINITIONS,
    element: <InputFileDefinition />,
    title: 'Input File Definitions',
    requiresAuth: true,
    breadcrumb: ['Input File Definitions'],
  },
  {
    path: PROTECTED_ROUTES.INPUT_FILE_DEFINITION_ADD,
    element: <AddInputFileDefinition />,
    title: 'Add Input File Definition',
    requiresAuth: true,
    breadcrumb: ['Input File Definitions', 'Add'],
  },
  {
    path: PROTECTED_ROUTES.INPUT_FILE_DEFINITION_CHANGE,
    element: <ChangeInputFileDefinition />,
    title: 'Change Input File Definition',
    requiresAuth: true,
    breadcrumb: ['Input File Definitions', 'Change'],
  },

  // Prep Mails
  {
    path: PROTECTED_ROUTES.PREP_MAILS,
    element: <PrepMails />,
    title: 'Prep Mails',
    requiresAuth: true,
    breadcrumb: ['Prep Mails'],
  },

  // Trigger Leads
  {
    path: PROTECTED_ROUTES.TRIGGER_LEADS,
    element: <TriggerLeads />,
    title: 'Trigger Leads',
    requiresAuth: true,
    breadcrumb: ['Trigger Leads'],
  },

  {
    path: PROTECTED_ROUTES.TRIGGER_LEADS_BY_ID,
    element: <TriggerLeadsById />,
    title: 'Trigger Leads By ID',
    requiresAuth: true,
    breadcrumb: ['Trigger Leads'],
  },

  //snowflake
  {
    path: PROTECTED_ROUTES.SNOWFLAKE,
    element: <Snowflake />,
    title: 'Snowflake',
    requiresAuth: true,
    breadcrumb: ['Snowflake'],
  },
  {
    path: PROTECTED_ROUTES.SNOWFLAKE_ADD,
    element: <AddSnowflake />,
    title: 'Snowflake',
    requiresAuth: true,
    breadcrumb: ['Snowflake'],
  },
  {
    path: PROTECTED_ROUTES.SNOWFLAKE_CHANGE,
    element: <ChangeSnowflake />,
    title: 'Snowflake',
    requiresAuth: true,
    breadcrumb: ['Snowflake'],
  },

  {
    path: PROTECTED_ROUTES.SNOWFLAKE_ADD,
    element: <AddSnowflake />,
    title: 'Add Snowflake',
    requiresAuth: true,

    breadcrumb: ['Snowflake', 'Add'],
  },
  {
    path: PROTECTED_ROUTES.SNOWFLAKE_CHANGE,
    element: <ChangeSnowflake />,
    title: 'Change Snowflake',
    requiresAuth: true,

    breadcrumb: ['Snowflake', 'Change'],
  },

  //activity logs
  {
    path: PROTECTED_ROUTES.ACTIVITY_LOG_BY_FDD,
    element: <ActivityLog />,
    title: 'Activity Logs By File Download Definition',
    requiresAuth: true,
    breadcrumb: ['Activity Logs'],
  },

  {
    path: PROTECTED_ROUTES.ACTIVITY_LOG_BY_PREP_MAIL,
    element: <ActivityLog />,
    title: 'Activity Logs By Prep Mail',
    requiresAuth: true,
    breadcrumb: ['Activity Logs'],
  },

  {
    path: PROTECTED_ROUTES.ACTIVITY_LOG_BY_INPUT_FILE_DEFINITION,
    element: <ActivityLog />,
    title: 'Activity Logs By Input File Definition',
    requiresAuth: true,
    breadcrumb: ['Activity Logs'],
  },
  {
    path: PROTECTED_ROUTES.FDD_ACTIVITY_LOG_BY_ID,
    element: <ActivityLogByID />,
    title: 'Activity Logs By ID',
    requiresAuth: true,
    breadcrumb: ['Activity Logs'],
  },
  {
    path: PROTECTED_ROUTES.INPUT_FILE_DEFINITION_ACTIVITY_LOG_BY_ID,
    element: <ActivityLogByID />,
    title: 'Activity Logs By ID',
    requiresAuth: true,
    breadcrumb: ['Activity Logs'],
  },
  {
    path: PROTECTED_ROUTES.PREP_MAIL_ACTIVITY_LOG_BY_ID,
    element: <ActivityLogByID />,
    title: 'Activity Logs By ID',
    requiresAuth: true,
    breadcrumb: ['Activity Logs'],
  },
]

// Redirect routes (for backward compatibility and common patterns)
export const redirectRoutes = [
  { from: PUBLIC_ROUTES.LOGIN, to: PUBLIC_ROUTES.HOME },
  { from: PUBLIC_ROUTES.AUTH, to: PUBLIC_ROUTES.HOME },
  { from: '/home', to: PUBLIC_ROUTES.HOME },
  { from: '/index', to: PUBLIC_ROUTES.HOME },
]

// Helper function to get route by path
export const getRouteByPath = (path: string): RouteConfig | undefined => {
  return [...publicRoutes, ...protectedRoutes].find(
    route => route.path === path
  )
}

// Helper function to check if route requires authentication
export const isProtectedRoute = (path: string): boolean => {
  const route = getRouteByPath(path)
  return route?.requiresAuth || false
}

// Helper function to get breadcrumb for a route
export const getBreadcrumb = (path: string): string[] => {
  const route = getRouteByPath(path)
  return route?.breadcrumb || []
}

// Helper function to get page title for a route
export const getPageTitle = (path: string): string => {
  const route = getRouteByPath(path)
  return route?.title || 'Data Pipeline'
}
