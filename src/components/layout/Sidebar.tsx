import { Link, useLocation } from 'react-router-dom'
import { PROTECTED_ROUTES } from '../../constants/routes'
import {
  Shield,
  Download,
  FolderOpen,
  FileText,
  Mail,
  Zap,
  Target,
} from 'lucide-react'

const Sidebar: React.FC = () => {
  const location = useLocation()

  const menuItems = [
    // {
    //   path: PROTECTED_ROUTES.DASHBOARD,
    //   label: 'Dashboard',
    //   icon: <BarChart3 size={18} />,
    // },
    {
      path: PROTECTED_ROUTES.CREDENTIALS,
      label: 'Credentials',
      icon: <Shield size={18} />,
    },
    {
      path: PROTECTED_ROUTES.FILE_DOWNLOAD_DEFINITION,
      label: 'File Download Definition',
      icon: <Download size={18} />,
    },
    {
      path: PROTECTED_ROUTES.FILES,
      label: 'Files',
      icon: <FolderOpen size={18} />,
    },
    {
      path: PROTECTED_ROUTES.INPUT_FILE_DEFINITIONS,
      label: 'Input File Definitions',
      icon: <FileText size={18} />,
    },
    {
      path: PROTECTED_ROUTES.PREP_MAILS,
      label: 'Prep Mails',
      icon: <Mail size={18} />,
    },
    {
      path: PROTECTED_ROUTES.TASK_STATUS,
      label: 'Task Status',
      icon: <Zap size={18} />,
    },
    {
      path: PROTECTED_ROUTES.TRIGGER_LEADS,
      label: 'Trigger Leads',
      icon: <Target size={18} />,
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
              className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <span className='mr-3 flex-shrink-0'>{item.icon}</span>
              <span className='font-medium'>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
