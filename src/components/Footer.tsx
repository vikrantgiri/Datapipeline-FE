import React from 'react'
import { APP_CONFIG } from '../constants/app'

const Footer: React.FC = () => {
  return (
    <footer className='bg-gray-800 text-white p-4 text-center'>
      <p>
        &copy; {new Date().getFullYear()} {APP_CONFIG.NAME}. All rights
        reserved.
      </p>
    </footer>
  )
}

export default Footer
