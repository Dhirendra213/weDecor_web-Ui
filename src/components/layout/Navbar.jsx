import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { FiLogOut, FiUser, FiLayout } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setIsProfileOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'glass shadow-lg shadow-rose-deep/5 py-3'
          : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl">🌸</span>
            <span className="text-2xl font-bold font-heading gradient-text">
              weDecore
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium transition-colors duration-200 hover:text-rose-deep ${location.pathname === link.path
                    ? 'text-rose-deep'
                    : 'text-charcoal/70'
                  }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-rose-deep to-gold rounded-full"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Auth Buttons / Profile */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-rose-deep/10 hover:bg-rose-deep/20 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-deep to-gold flex items-center justify-center text-white text-sm font-semibold">
                    {user?.name?.[0]?.toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-charcoal">
                    {user?.name?.split(' ')[0]}
                  </span>
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-blush/50 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-blush/50">
                        <p className="text-sm font-semibold text-charcoal">{user?.name}</p>
                        <p className="text-xs text-slate">{user?.email}</p>
                      </div>
                      {isAdmin && (
                        <Link
                          to="/admin/dashboard"
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-charcoal hover:bg-blush/50 transition-colors"
                        >
                          <FiLayout size={16} />
                          Admin Dashboard
                        </Link>
                      )}
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-charcoal hover:bg-blush/50 transition-colors"
                      >
                        <FiUser size={16} />
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-danger hover:bg-danger/5 transition-colors border-t border-blush/50"
                      >
                        <FiLogOut size={16} />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2 text-sm font-medium text-charcoal hover:text-rose-deep transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-rose-deep to-rose-medium rounded-full hover:shadow-lg hover:shadow-rose-deep/25 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-blush/50 transition-colors"
          >
            {isMobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 backdrop-blur-lg border-t border-blush/30 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${location.pathname === link.path
                      ? 'bg-rose-deep/10 text-rose-deep'
                      : 'text-charcoal/70 hover:bg-blush/50'
                    }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-2 border-t border-blush/50">
                {isAuthenticated ? (
                  <>
                    {isAdmin && (
                      <Link
                        to="/admin/dashboard"
                        className="block px-4 py-3 rounded-lg text-sm font-medium text-charcoal hover:bg-blush/50"
                      >
                        🎛️ Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-danger hover:bg-danger/5"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="flex gap-2">
                    <Link
                      to="/login"
                      className="flex-1 text-center px-4 py-3 rounded-lg text-sm font-medium text-charcoal border border-charcoal/20 hover:bg-blush/50"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="flex-1 text-center px-4 py-3 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-rose-deep to-rose-medium"
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
