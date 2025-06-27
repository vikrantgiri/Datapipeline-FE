const LoadingOverlay = () => {
  return (
    <div className='fixed top-0 left-0 w-screen h-screen z-50 backdrop-blur-xs bg-black/5 flex items-center justify-center px-4'>
      <div className='text-center max-w-md bg-black/60 p-6 rounded-xl shadow-lg'>
        <svg
          className='animate-spin h-12 w-12 text-white mx-auto mb-4'
          viewBox='0 0 24 24'
        >
          <circle
            className='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='4'
          />
          <path
            className='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
          />
        </svg>

        <h2 className='text-white text-xl font-semibold mb-2'>
          Please wait while we process your request
        </h2>
        <p className='text-gray-300 text-sm'>
          This trigger requires synchronous processing, so real-time updates
          aren't possible. You’ll be redirected or updated as soon as it’s done.
        </p>
      </div>
    </div>
  )
}

export default LoadingOverlay
