import React from 'react'

interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary: () => void
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50'>
      <div className='max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center'>
        <div className='mb-4'>
          <svg
            className='mx-auto h-12 w-12 text-red-500'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
            />
          </svg>
        </div>

        <h1 className='text-xl font-semibold text-gray-900 mb-2'>
          Something went wrong
        </h1>

        <p className='text-gray-600 mb-4 text-sm'>
          {error.message || 'An unexpected error occurred. Please try again.'}
        </p>

        <div className='space-y-2'>
          <button
            onClick={resetErrorBoundary}
            className='w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200'
          >
            Try again
          </button>

          <button
            onClick={() => (window.location.href = '/')}
            className='w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-200'
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default ErrorFallback
