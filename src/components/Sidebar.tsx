import { Link, useLocation } from 'react-router-dom'
import { PROTECTED_ROUTES } from '../constants/routes'
import {
  Shield,
  Download,
  FolderOpen,
  FileText,
  Mail,
  Target,
  Activity,
  ChevronDown,
  ChevronRight,
} from 'lucide-react'
import { useState, useEffect } from 'react'

const Sidebar: React.FC = () => {
  const location = useLocation()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  // Auto-expand parent when child route is active
  useEffect(() => {
    const activityLogRoutes = [
      PROTECTED_ROUTES.ACTIVITY_LOG_BY_FDD,
      PROTECTED_ROUTES.ACTIVITY_LOG_BY_INPUT_FILE_DEFINITION,
      PROTECTED_ROUTES.ACTIVITY_LOG_BY_PREP_MAIL,
    ]

    if (activityLogRoutes.includes(location.pathname as any)) {
      setExpandedItems(prev =>
        prev.includes('Activity Logs') ? prev : [...prev, 'Activity Logs']
      )
    }
  }, [location.pathname])

  const toggleExpanded = (label: string) => {
    setExpandedItems(prev =>
      prev.includes(label)
        ? prev.filter(item => item !== label)
        : [...prev, label]
    )
  }

  const menuItems = [
    {
      path: PROTECTED_ROUTES.CREDENTIALS,
      label: 'Credentials',
      icon: <Shield size={18} />,
    },
    {
      path: PROTECTED_ROUTES.FILE_DOWNLOAD_DEFINITION,
      label: 'File Download Definitions',
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
    // {
    //   path: PROTECTED_ROUTES.TASK_STATUS,
    //   label: 'Task Status',
    //   icon: <Zap size={18} />,
    // },
    {
      path: PROTECTED_ROUTES.TRIGGER_LEADS,
      label: 'Trigger Leads',
      icon: <Target size={18} />,
    },
    {
      label: 'Activity Logs',
      icon: <Activity size={18} />,
      children: [
        {
          path: PROTECTED_ROUTES.ACTIVITY_LOG_BY_FDD,
          label: 'Activity Logs By File Download Definition',
        },
        {
          path: PROTECTED_ROUTES.ACTIVITY_LOG_BY_INPUT_FILE_DEFINITION,
          label: 'Activity Logs By Input File Definition',
        },
        {
          path: PROTECTED_ROUTES.ACTIVITY_LOG_BY_PREP_MAIL,
          label: 'Activity Logs By Prep Mail',
        },
      ],
    },
  ]

  const renderMenuItem = (item: any) => {
    const isExpanded = expandedItems.includes(item.label)
    const hasChildren = item.children && item.children.length > 0
    const isActive =
      location.pathname === item.path ||
      (hasChildren &&
        item.children.some((child: any) => location.pathname === child.path))

    if (hasChildren) {
      return (
        <div key={item.label}>
          <button
            onClick={() => toggleExpanded(item.label)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
              isActive
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <div className='flex items-center'>
              <span className='mr-3 flex-shrink-0'>{item.icon}</span>
              <span className='font-medium'>{item.label}</span>
            </div>
            <span className='flex-shrink-0 transition-transform duration-200'>
              {isExpanded ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </span>
          </button>

          {isExpanded && (
            <div className='ml-6 mt-1 space-y-1 border-l-2 border-gray-600 pl-2'>
              {item.children.map((child: any) => {
                const isChildActive = location.pathname === child.path
                return (
                  <Link
                    key={child.path}
                    to={child.path}
                    className={`block px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                      isChildActive
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {child.label}
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      )
    }

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
  }

  return (
    <aside className='bg-gray-800 text-white w-96 p-4'>
      <nav className='flex flex-col gap-2'>
        {menuItems.map(item => renderMenuItem(item))}
      </nav>
    </aside>
  )
}

export default Sidebar
