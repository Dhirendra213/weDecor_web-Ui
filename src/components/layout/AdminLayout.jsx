import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiGrid, FiUpload, FiImage, FiMessageSquare, FiLogOut, FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const sidebarLinks = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: FiGrid },
  { name: 'Upload Media', path: '/admin/upload', icon: FiUpload },
  { name: 'Manage Gallery', path: '/admin/gallery', icon: FiImage },
  { name: 'Messages', path: '/admin/messages', icon: FiMessageSquare },
];

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex bg-charcoal">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -260 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.4 }}
        className="w-64 bg-charcoal-light text-white border-r border-white/5 flex flex-col shrink-0"
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌸</span>
            <span className="text-xl font-bold font-heading text-white">
              weDecor
            </span>
          </div>
          <p className="text-xs text-white/40 mt-1">Admin Dashboard</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                  ? 'bg-rose-deep/20 text-rose-light'
                  : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                }`
              }
            >
              <link.icon size={18} />
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/5">
          <NavLink
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/50 hover:text-white/80 hover:bg-white/5 transition-all mb-1"
          >
            <FiArrowLeft size={18} />
            Back to Site
          </NavLink>


        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
