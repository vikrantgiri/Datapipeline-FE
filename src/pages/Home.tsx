import { Navigate } from 'react-router-dom'
import AuthForm from '../components/AuthForm'
import { useAuth } from '../hooks/useAuth'
import authImage from '../assets/auth-image3.webp'

const Home = () => {
  const { isAuthenticated, loading } = useAuth()

  // If user is authenticated, redirect to dashboard
  if (!loading && isAuthenticated) {
    return <Navigate to='/dashboard' replace />
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
        <AuthForm />
      </div>
    </div>
  )
}

export default Home
