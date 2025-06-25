import React from 'react'
import { Link } from 'react-router-dom'

const NotFound: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50'>
      <div className='max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center'>
        <div className='mb-4'>
          <svg
            className='mx-auto h-16 w-16 text-gray-400'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33'
            />
          </svg>
        </div>

        <h1 className='text-2xl font-bold text-gray-900 mb-2'>
          404 - Page Not Found
        </h1>

        <p className='text-gray-600 mb-6'>
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className='space-y-3'>
          <Link
            to='/'
            className='block w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200'
          >
            Go to Home
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
            If you believe this is an error, please contact support.
          </p>
        </div>
      </div>
    </div>
  )
}

export default NotFound
