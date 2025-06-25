import { Navigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import LoginForm from '../../../components/forms/LoginForm'
import authImage from '../../../assets/auth-image3.webp'
import { PROTECTED_ROUTES } from '../../../constants/routes'

const LoginPage: React.FC = () => {
  const { isAuthenticated, loading } = useAuth()

  // If user is authenticated, redirect to dashboard
  if (!loading && isAuthenticated) {
    return <Navigate to={PROTECTED_ROUTES.CREDENTIALS} replace />
  }

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600'></div>
      </div>
    )
  }

  return (
    <div className='min-h-screen flex'>
      <div className='hidden md:flex w-1/2 items-center justify-center bg-gray-100'>
        <img
          src={authImage}
          alt='Auth'
          className='w-full h-full object-cover'
        />
      </div>

      <div className='w-full md:w-1/2 flex items-center justify-center p-8'>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage
