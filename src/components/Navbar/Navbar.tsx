import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import {
  Search,
  Bell,
  User,
  Menu,
  X,
  LogOut,
  Settings,
  ChevronDown
} from 'lucide-react';
import LanguageSwitcher from '../LanguageSwitcher';

interface NavbarProps {
  isLoggedIn?: boolean;
  user?: {
    name: string;
    avatar: string;
    role: 'student' | 'instructor';
  };
}

const Navbar: React.FC<NavbarProps> = ({
  isLoggedIn = false,
  user
}) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navigation = [
    { name: t('nav.courses'), href: '/courses' },
    { name: t('nav.dashboard'), href: '/dashboard', requiresAuth: true },
    { name: t('nav.instructor'), href: '/instructor', requiresAuth: false } // Make it always visible for demo
  ];

  const isActiveLink = (href: string) => {
    return location.pathname === href;
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <img 
                src="https://res.cloudinary.com/drvfzwgjm/image/upload/v1761166728/719f89c9-1a3b-4e05-b1a9-4e5865dea83b_nvqqvg.jpg" 
                alt="Paxora Learning Hub" 
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-cover"
              />
              <span className="text-lg sm:text-xl font-bold text-gray-900 hidden sm:block">Paxora Learning Hub</span>
              <span className="text-lg font-bold text-gray-900 sm:hidden">Paxora</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              if (item.requiresAuth && !isLoggedIn) return null;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActiveLink(item.href)
                      ? 'text-teal-600 bg-teal-50'
                      : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50'
                    }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Search Bar */}
          {isLoggedIn && (
            <div className="hidden lg:flex flex-1 max-w-lg mx-4 xl:mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder={t('common.search')}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Right Side */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            {isLoggedIn ? (
              <>
                {/* Notifications */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-gray-400 hover:text-gray-500 relative"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
                </motion.button>

                {/* User Menu */}
                <div className="relative">
                  <motion.button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-1 sm:space-x-2 p-1 sm:p-2 rounded-lg hover:bg-gray-50"
                    whileHover={{ scale: 1.02 }}
                  >
                    <img
                      src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face'}
                      alt={user?.name || 'User'}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="hidden md:block text-sm font-medium text-gray-700">
                      {user?.name || 'User'}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
                  </motion.button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
                      >
                        <Link
                          to="/profile"
                          className="flex items-center space-x-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <User className="w-4 h-4" />
                          <span>Profile</span>
                        </Link>
                        <Link
                          to="/settings"
                          className="flex items-center space-x-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Settings className="w-4 h-4" />
                          <span>Settings</span>
                        </Link>
                        <hr className="border-gray-200" />
                        <button className="flex items-center space-x-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 w-full text-left">
                          <LogOut className="w-4 h-4" />
                          <span>{t('nav.logout')}</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/signup"
                  className="bg-teal-600 text-white hover:bg-teal-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  {t('nav.signup')}
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => {
                  if (item.requiresAuth && !isLoggedIn) return null;

                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`block px-3 py-2 rounded-lg text-base font-medium ${isActiveLink(item.href)
                          ? 'text-teal-600 bg-teal-50'
                          : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50'
                        }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  );
                })}
                
                {/* Language Switcher for Mobile */}
                <div className="px-3 py-2 sm:hidden">
                  <LanguageSwitcher />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Backdrop for user menu */}
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;