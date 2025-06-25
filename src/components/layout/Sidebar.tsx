import { Link, useLocation } from 'react-router-dom'
import { PROTECTED_ROUTES } from '../../constants/routes'

const Sidebar: React.FC = () => {
  const location = useLocation()

  const menuItems = [
    {
      path: PROTECTED_ROUTES.DASHBOARD,
      label: 'Dashboard',
      icon: '📊',
    },
    {
      path: PROTECTED_ROUTES.CREDENTIALS,
      label: 'Credentials',
      icon: '🔐',
    },
    {
      path: PROTECTED_ROUTES.FILE_DOWNLOAD_DEFINITION,
      label: 'File Download Definition',
      icon: '📥',
    },
    {
      path: PROTECTED_ROUTES.FILES,
      label: 'Files',
      icon: '📁',
    },
    {
      path: PROTECTED_ROUTES.INPUT_FILE_DEFINITIONS,
      label: 'Input File Definitions',
      icon: '📄',
    },
    {
      path: PROTECTED_ROUTES.PREP_MAILS,
      label: 'Prep Mails',
      icon: '📧',
    },
    {
      path: PROTECTED_ROUTES.TASK_STATUS,
      label: 'Task Status',
      icon: '⚡',
    },
    {
      path: PROTECTED_ROUTES.TRIGGER_LEADS,
      label: 'Trigger Leads',
      icon: '🎯',
    },
  ]

  return (
    <aside className='bg-gray-800 text-white w-64 min-h-screen p-4'>
      <nav className='space-y-2'>
        {menuItems.map(item => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-4 py-2 rounded-md transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <span className='mr-2'>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
