import React from 'react'
import { Link } from 'react-router-dom'
import { PROTECTED_ROUTES } from '../../constants/routes'

const AccessDenied: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50'>
      <div className='max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center'>
        <div className='mb-4'>
          <svg
            className='mx-auto h-16 w-16 text-red-500'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
            />
          </svg>
        </div>

        <h1 className='text-2xl font-bold text-gray-900 mb-2'>
          403 - Access Denied
        </h1>

        <p className='text-gray-600 mb-6'>
          You don't have permission to access this page. Please contact your
          administrator if you believe this is an error.
        </p>

        <div className='space-y-3'>
          <Link
            to={PROTECTED_ROUTES.CREDENTIALS}
            className='block w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200'
          >
            Go to Dashboard
          </Link>

          <button
            onClick={() => window.history.back()}
            className='w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-200'
          >
            Go Back
          </button>
        </div>

        <div className='mt-6 pt-4 border-t border-gray-200'>
          <p className='text-xs text-gray-500'>
            If you need access to this page, please contact your system
            administrator.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AccessDenied
