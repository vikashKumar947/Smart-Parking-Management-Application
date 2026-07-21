import {
  FaHome,
  FaCar,
  FaParking,
  FaHistory,
  FaCog,
  FaPowerOff,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    icon: <FaHome />,
    path: "/",
  },
  {
    name: "Vehicle Entry",
    icon: <FaSignInAlt />,
    path: "/entry",
  },
  {
    name: "Vehicle Exit",
    icon: <FaSignOutAlt />,
    path: "/exit",
  },
  {
    name: "Parking Slots",
    icon: <FaParking />,
    path: "/slots",
  },
  {
    name: "History",
    icon: <FaHistory />,
    path: "/history",
  },
];

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-slate-900 text-white flex flex-col justify-between">

      {/* Logo */}

      <div>

        <div className="flex items-center gap-3 p-6 text-2xl font-bold border-b border-slate-700">
          <FaCar className="text-blue-500" />
          <span>Smart Parking</span>
        </div>

        {/* Navigation */}

        <nav className="mt-6">

          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-6 py-4 transition-all duration-200
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>

              <span>{item.name}</span>
            </NavLink>
          ))}

        </nav>

      </div>

      {/* Bottom */}

      <div className="border-t border-slate-700">

        <button className="flex items-center gap-4 w-full px-6 py-4 hover:bg-slate-800">
          <FaCog />
          Settings
        </button>

        <button className="flex items-center gap-4 w-full px-6 py-4 hover:bg-red-600">
          <FaPowerOff />
          Logout
        </button>

      </div>

    </aside>
  );
};

export default Sidebar;