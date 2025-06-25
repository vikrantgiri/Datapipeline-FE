import { Navigate } from 'react-router-dom'
import AuthForm from '../components/AuthForm'
import { useAuth } from '../hooks/useAuth'

const Home = () => {
  const { isAuthenticated, loading } = useAuth()

  // If user is authenticated, redirect to dashboard
  if (!loading && isAuthenticated) {
    return <Navigate to='/dashboard' replace />
  }

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4'></div>
          <p className='text-gray-600 font-medium'>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50'>
      {/* Background Pattern */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse'></div>
        <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse'></div>
        <div className='absolute top-40 left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse'></div>
      </div>

      <div className='relative min-h-screen flex'>
        {/* Left Side - Hero Section */}
        <div className='hidden lg:flex w-1/2 items-center justify-center relative overflow-hidden'>
          <div className='absolute inset-0 bg-gradient-to-br from-blue-600/90 to-indigo-800/90'></div>
          <div className='relative z-10 text-center text-white px-12'>
            <div className='mb-8'>
              <h1 className='text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent'>
                Data Pipeline
              </h1>
              <p className='text-xl text-blue-100 leading-relaxed max-w-md mx-auto'>
                Streamline your data workflows with our powerful and intuitive
                pipeline management platform
              </p>
            </div>

            <div className='space-y-4 text-left max-w-sm mx-auto'>
              <div className='flex items-center space-x-3'>
                <div className='w-2 h-2 bg-blue-300 rounded-full'></div>
                <span className='text-blue-100'>Real-time data processing</span>
              </div>
              <div className='flex items-center space-x-3'>
                <div className='w-2 h-2 bg-blue-300 rounded-full'></div>
                <span className='text-blue-100'>
                  Advanced analytics & insights
                </span>
              </div>
              <div className='flex items-center space-x-3'>
                <div className='w-2 h-2 bg-blue-300 rounded-full'></div>
                <span className='text-blue-100'>
                  Secure & scalable infrastructure
                </span>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className='absolute top-20 left-20 w-16 h-16 bg-white/10 rounded-full animate-pulse'></div>
          <div className='absolute bottom-20 right-20 w-12 h-12 bg-white/10 rounded-full animate-pulse'></div>
          <div className='absolute top-1/2 right-10 w-8 h-8 bg-white/10 rounded-full animate-pulse'></div>
        </div>

        {/* Right Side - Login Form */}
        <div className='w-full lg:w-1/2 flex items-center justify-center p-8'>
          <div className='w-full max-w-md'>
            {/* Logo/Brand */}
            <div className='text-center mb-8'>
              <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg'>
                <svg
                  className='w-8 h-8 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                  />
                </svg>
              </div>
              <h2 className='text-3xl font-bold text-gray-900 mb-2'>
                Welcome Back
              </h2>
              <p className='text-gray-600'>
                Sign in to your account to continue
              </p>
            </div>

            {/* Login Form */}
            <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8'>
              <AuthForm />
            </div>

            {/* Footer */}
            <div className='text-center mt-8'>
              <p className='text-sm text-gray-500'>
                Protected by enterprise-grade security
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
