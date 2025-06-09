import type { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';


const menuItems = [
  { label: 'Credentials', path: '/credentials' },
  { label: 'File Download Definitions', path: '/FileDownloadDefinition' },
  { label: 'Files', path: '/files' },
  { label: 'Input File Definitions', path: '/InputFileDefinitions' },
  { label: 'Prep mails', path: '/PrepMails' },
  { label: 'Task Statuses', path: '/TaskStatus' },
  { label: 'Trigger Leads', path: '/TriggerLeads' },
];

const Sidebar: FC = () => {
  const location = useLocation();

  return (
    <aside className="w-90 bg-gradient-to-b from-gray-50 to-white border-r shadow-sm p-6 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-8">Admin Panel</h2>
      <ul className="space-y-4">
        {menuItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <li key={item.label}>
              <div className={`flex justify-between items-center px-3 py-2 rounded-md transition 
                ${isActive ? 'bg-blue-100 text-blue-800 font-medium' : 'hover:bg-gray-100 text-gray-700'}`}>
                <Link to={item.path} className="flex items-center gap-2 w-full">
               
                  {item.label}
                </Link>
               
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
