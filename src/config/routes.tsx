import { lazy } from 'react'
import { PUBLIC_ROUTES, PROTECTED_ROUTES } from '../constants/routes'
import type { RouteConfig } from '../types'

// Lazy load all page components
const DashboardPage = lazy(
  () => import('../features/dashboard/components/DashboardPage')
)
const LoginPage = lazy(() => import('../features/auth/components/LoginPage'))

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
const AddFiles = lazy(() => import('../pages/Files/AddFiles'))

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
const AddPrepMails = lazy(() => import('../pages/prep-mails/AddPrepMails'))
const ChangePrepMails = lazy(
  () => import('../pages/prep-mails/ChangePrepMails')
)

// Task Status
const TaskStatus = lazy(() => import('../pages/Task-status/taskStatus'))
const ChangeTaskStatus = lazy(
  () => import('../pages/Task-status/ChangeTaskStatus')
)

// Trigger Leads
const TriggerLeads = lazy(() => import('../pages/Trigger-leads/TriggerLeads'))
const AddTriggerLeads = lazy(
  () => import('../pages/Trigger-leads/AddTriggerLeads')
)
const ChangeTriggerLeads = lazy(
  () => import('../pages/Trigger-leads/ChangeTriggerLeads')
)

// Task Logs
const TaskLogFileDD = lazy(() => import('../pages/TaskLogs/TaskLogFileDD'))
const TaskLogInputFileDefinition = lazy(
  () => import('../pages/TaskLogs/TaskLogInputFileDefinition')
)
const TaskLogPrepMailsDefinition = lazy(
  () => import('../pages/TaskLogs/TaskLogPrepMails')
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
  {
    path: PROTECTED_ROUTES.DASHBOARD,
    element: <DashboardPage />,
    title: 'Dashboard',
    requiresAuth: true,
    breadcrumb: ['Dashboard'],
  },

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
  {
    path: PROTECTED_ROUTES.FILES_ADD,
    element: <AddFiles />,
    title: 'Add Files',
    requiresAuth: true,
    breadcrumb: ['Files', 'Add'],
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
  {
    path: PROTECTED_ROUTES.PREP_MAILS_ADD,
    element: <AddPrepMails />,
    title: 'Add Prep Mail',
    requiresAuth: true,
    breadcrumb: ['Prep Mails', 'Add'],
  },
  {
    path: PROTECTED_ROUTES.PREP_MAILS_CHANGE,
    element: <ChangePrepMails />,
    title: 'Change Prep Mail',
    requiresAuth: true,
    breadcrumb: ['Prep Mails', 'Change'],
  },

  // Task Status
  {
    path: PROTECTED_ROUTES.TASK_STATUS,
    element: <TaskStatus />,
    title: 'Task Status',
    requiresAuth: true,
    breadcrumb: ['Task Status'],
  },
  {
    path: PROTECTED_ROUTES.TASK_STATUS_CHANGE,
    element: <ChangeTaskStatus />,
    title: 'Change Task Status',
    requiresAuth: true,
    breadcrumb: ['Task Status', 'Change'],
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
    path: PROTECTED_ROUTES.TRIGGER_LEADS_ADD,
    element: <AddTriggerLeads />,
    title: 'Add Trigger Lead',
    requiresAuth: true,
    breadcrumb: ['Trigger Leads', 'Add'],
  },
  {
    path: PROTECTED_ROUTES.TRIGGER_LEADS_CHANGE,
    element: <ChangeTriggerLeads />,
    title: 'Change Trigger Lead',
    requiresAuth: true,
    breadcrumb: ['Trigger Leads', 'Change'],
  },

  // Task Logs
  {
    path: PROTECTED_ROUTES.TASK_LOG_FILE_DD,
    element: <TaskLogFileDD />,
    title: 'Task Log - File Download Definition',
    requiresAuth: true,
    breadcrumb: ['Task Logs', 'File Download Definition'],
  },
  {
    path: PROTECTED_ROUTES.TASK_LOG_INPUT_FILE_DEFINITION,
    element: <TaskLogInputFileDefinition />,
    title: 'Task Log - Input File Definition',
    requiresAuth: true,
    breadcrumb: ['Task Logs', 'Input File Definition'],
  },
  {
    path: PROTECTED_ROUTES.TASK_LOG_PREP_MAILS_DEFINITION,
    element: <TaskLogPrepMailsDefinition />,
    title: 'Task Log - Prep Mails Definition',
    requiresAuth: true,
    breadcrumb: ['Task Logs', 'Prep Mails Definition'],
  },
]

// Redirect routes (for backward compatibility and common patterns)
export const redirectRoutes = [
  { from: PUBLIC_ROUTES.LOGIN, to: PUBLIC_ROUTES.HOME },
  { from: PUBLIC_ROUTES.AUTH, to: PUBLIC_ROUTES.HOME },
  { from: '/admin', to: PROTECTED_ROUTES.DASHBOARD },
  { from: '/home', to: PUBLIC_ROUTES.HOME },
  { from: '/index', to: PUBLIC_ROUTES.HOME },
  { from: '/main', to: PROTECTED_ROUTES.DASHBOARD },
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
