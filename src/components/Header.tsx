import { Link } from 'react-router-dom'
import { HomeIcon, LogOut } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { PUBLIC_ROUTES } from '../constants/routes'

const Header: React.FC = () => {
  const { logout, isAuthenticated } = useAuth()

  return (
    <header className='bg-gray-800 text-gray-300 p-6 flex justify-between items-center'>
      <h1 className='text-xl font-bold'>HashRoot</h1>
      <nav className='space-x-4 w-fit flex items-center'>
        <Link
          to={PUBLIC_ROUTES.HOME}
          className='flex items-center gap-2 hover:text-blue-300 transition-colors'
        >
          <HomeIcon size={16} />
          Home
        </Link>

        {isAuthenticated && (
          <button
            onClick={logout}
            className='hover:text-blue-300 transition-colors flex items-center gap-2 cursor-pointer'
          >
            <LogOut size={16} />
            Logout
          </button>
        )}
      </nav>
    </header>
  )
}

export default Header
