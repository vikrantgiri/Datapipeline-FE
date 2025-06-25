import React from 'react'
import { LOADING_SIZES, LOADING_COLORS } from '../../constants/app'
import type { LoadingSpinnerProps } from '../../types'

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = LOADING_SIZES.MD,
  color = LOADING_COLORS.BLUE,
  text,
  fullScreen = false,
}) => {
  const sizeClasses = {
    [LOADING_SIZES.SM]: 'h-4 w-4',
    [LOADING_SIZES.MD]: 'h-8 w-8',
    [LOADING_SIZES.LG]: 'h-12 w-12',
    [LOADING_SIZES.XL]: 'h-16 w-16',
  }

  const colorClasses = {
    [LOADING_COLORS.BLUE]: 'border-blue-600',
    [LOADING_COLORS.GRAY]: 'border-gray-600',
    [LOADING_COLORS.WHITE]: 'border-white',
  }

  const spinner = (
    <div className='flex flex-col items-center justify-center'>
      <div
        className={`animate-spin rounded-full border-2 border-t-transparent ${sizeClasses[size]} ${colorClasses[color]}`}
      />
      {text && (
        <p className='mt-2 text-sm text-gray-600 animate-pulse'>{text}</p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        {spinner}
      </div>
    )
  }

  return spinner
}

export default LoadingSpinner
