import type { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Sidebar: FC = () => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(false);

  const menuItems = [
    { label: "Credentials", path: "/credentials" },
    { label: "File Download Definitions", path: "/FileDownloadDefinition" },
    { label: "Files", path: "/files" },
    { label: "Input File Definitions", path: "/InputFileDefinitions" },
    { label: "Prep mails", path: "/PrepMails" },
    // { label: "Task Statuses", path: "/TaskStatus" },
    { label: "Trigger Leads", path: "/TriggerLeads" },
    {
      label: "Task Logs",
      path: "/TaskLogs",
      children: [
        {
          label: "File Download Definition",
          path: "/TaskLog/FileDownloadDefinition",
        },
        {
          label: "Input File Definition",
          path: "/TaskLog/InputFileDefinition",
        },
        {
          label: "Prep Mils",
          path: "/TaskLog/PrepMailsDefinition",
        },
      ],
    },
  ];

  useEffect(() => console.log(openDropdown), [openDropdown]);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white border-r shadow-sm p-6 min-h-screen min-w-80">
      <h2 className="text-2xl font-semibold text-gray-800 mb-8">Admin Panel</h2>
      <ul className="space-y-4">
        {menuItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          const hasChildren = !!item.children;

          return (
            <li key={item.label}>
              <div
                className={`flex justify-between items-center px-3 py-2 rounded-md transition 
  ${
    isActive
      ? "bg-blue-100 text-blue-800 font-medium"
      : "hover:bg-gray-100 text-gray-700"
  }`}
              >
                {hasChildren ? (
                  <button
                    onClick={() => setOpenDropdown((prev) => !prev)}
                    className="flex items-center gap-2 w-full text-left"
                  >
                    {item.label}
                    <span>{openDropdown ? "▾" : "▸"}</span>
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    className="flex items-center gap-2 w-full"
                  >
                    {item.label}
                  </Link>
                )}
              </div>

              {hasChildren && openDropdown && (
                <ul className="pl-6 mt-2 space-y-2">
                  {item.children.map((sub) => {
                    const isSubActive = location.pathname.startsWith(sub.path);
                    return (
                      <li key={sub.label}>
                        <Link
                          to={sub.path}
                          className={`block px-3 py-2 rounded-md text-sm transition 
                          ${
                            isSubActive
                              ? "bg-blue-100 text-blue-800 font-medium"
                              : "hover:bg-gray-100 text-gray-700"
                          }`}
                        >
                          {sub.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
