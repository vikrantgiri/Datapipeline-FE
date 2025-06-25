import { Link } from 'react-router-dom'
import { HomeIcon, LogOut } from 'lucide-react'
import { Button } from 'antd'
import { useAuth } from '../hooks/useAuth'

const Header = () => {
  const { logout, isAuthenticated } = useAuth()

  return (
    <header className='bg-[#0582ca] text-white p-6 flex justify-between items-center'>
      <h1 className='text-xl font-bold'>HashRoot</h1>
      <nav className='space-x-4 w-fit flex items-center'>
        <Link
          to='/'
          className='flex flex-row gap-2 hover:text-[#A7E3E0] transition-colors'
        >
          <HomeIcon size={20} />
          Home
        </Link>

        {isAuthenticated && (
          <Button
            type='text'
            onClick={logout}
            className='flex flex-row gap-2 hover:text-[#A7E3E0] transition-colors'
            icon={<LogOut size={16} />}
          >
            Logout
          </Button>
        )}
      </nav>
    </header>
  )
}

export default Header
