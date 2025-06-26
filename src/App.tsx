import { Routes, Route, Navigate } from 'react-router-dom'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

// Layout components
import MainLayout from './layout/MainLayout'
import LoadingSpinner from './components/ui/LoadingSpinner'
import NotFound from './components/feedback/NotFound'
import AccessDenied from './components/feedback/AccessDenied'
import ServerError from './components/feedback/ServerError'
import ErrorFallback from './components/feedback/ErrorFallback'

// Import route configuration
import { publicRoutes, protectedRoutes, redirectRoutes } from './config/routes'

// Import auth context
import { AuthProvider } from './contexts/AuthContext'
import { useAuth } from './hooks/useAuth'

// Import constants
import { ERROR_ROUTES } from './constants/routes'

// Authentication guard component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <LoadingSpinner size='xl' fullScreen text='Checking authentication...' />
    )
  }

  if (!isAuthenticated) {
    return <Navigate to='/' replace />
  }

  return <>{children}</>
}

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      {publicRoutes.map(route => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <Suspense
              fallback={
                <LoadingSpinner fullScreen size='lg' text='Loading page...' />
              }
            >
              {route.element}
            </Suspense>
          }
        />
      ))}

      {/* Redirect routes for backward compatibility */}
      {redirectRoutes.map(redirect => (
        <Route
          key={redirect.from}
          path={redirect.from}
          element={<Navigate to={redirect.to} replace />}
        />
      ))}

      {/* Protected routes wrapped in MainLayout */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        {protectedRoutes.map(route => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <Suspense
                fallback={
                  <LoadingSpinner fullScreen size='lg' text='Loading page...' />
                }
              >
                {route.element}
              </Suspense>
            }
          />
        ))}
      </Route>

      {/* Error routes */}
      <Route path={ERROR_ROUTES.ACCESS_DENIED} element={<AccessDenied />} />
      <Route path={ERROR_ROUTES.SERVER_ERROR} element={<ServerError />} />

      {/* 404 - Not Found (catch all) */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

const App = () => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset the state of your app here
        window.location.href = '/'
      }}
    >
      <AuthProvider>
        <Suspense
          fallback={<LoadingSpinner size='xl' fullScreen text='Loading...' />}
        >
          <AppRoutes />
        </Suspense>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
