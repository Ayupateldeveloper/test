import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { LogOut, User, Settings, BarChart, Moon, Sun } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { motion } from 'framer-motion'

const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const [userName, setUserName] = useState('')
  const userRole = localStorage.getItem('userRole') || 'user'
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const currentUserEmail = localStorage.getItem('currentUserEmail')
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const currentUser = users.find((user: any) => user.email === currentUserEmail)
    if (currentUser) {
      setUserName(currentUser.name)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('userRole')
    localStorage.removeItem('currentUserEmail')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 transition-colors duration-500">
      <nav className="bg-white dark:bg-gray-800 bg-opacity-10 dark:bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-white">FutureAuth Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center">
              <span className="mr-4 text-sm font-medium text-white">{userRole}</span>
              <button
                onClick={toggleTheme}
                className="mr-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button
                onClick={handleLogout}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h1 
              className="text-3xl font-bold text-white"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Welcome, {userName}
            </motion.h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {userRole === 'admin' && (
                  <Link to="/user-management" className="block">
                    <motion.div 
                      className="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300 backdrop-filter backdrop-blur-lg bg-opacity-10 dark:bg-opacity-10"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <User className="h-8 w-8 text-indigo-300 dark:text-indigo-400 mb-4" />
                      <h3 className="font-semibold text-white">User Management</h3>
                      <p className="mt-2 text-gray-200">Manage user accounts and permissions</p>
                    </motion.div>
                  </Link>
                )}
                <motion.div 
                  className="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300 backdrop-filter backdrop-blur-lg bg-opacity-10 dark:bg-opacity-10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Settings className="h-8 w-8 text-indigo-300 dark:text-indigo-400 mb-4" />
                  <h3 className="font-semibold text-white">System Settings</h3>
                  <p className="mt-2 text-gray-200">Configure system-wide settings</p>
                </motion.div>
                <motion.div 
                  className="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300 backdrop-filter backdrop-blur-lg bg-opacity-10 dark:bg-opacity-10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <BarChart className="h-8 w-8 text-indigo-300 dark:text-indigo-400 mb-4" />
                  <h3 className="font-semibold text-white">Analytics</h3>
                  <p className="mt-2 text-gray-200">View system analytics and reports</p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard