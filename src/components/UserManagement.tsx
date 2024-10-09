import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

interface User {
  id: number
  name: string
  email: string
  role: string
  password: string
  addedBy: string
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'user' })
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const currentAdminEmail = localStorage.getItem('currentUserEmail') || ''

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]')
    const filteredUsers = storedUsers.filter((user: User) => user.addedBy === currentAdminEmail || user.email === currentAdminEmail)
    setUsers(filteredUsers)
  }, [currentAdminEmail])

  const addUser = () => {
    const user: User = { 
      ...newUser, 
      id: Date.now(), 
      password: '123456789', // Default password for new users
      addedBy: currentAdminEmail
    }
    const updatedUsers = [...users, user]
    setUsers(updatedUsers)
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]')
    localStorage.setItem('users', JSON.stringify([...allUsers, user]))
    setNewUser({ name: '', email: '', role: 'user' })
  }

  const updateUser = () => {
    if (editingUser) {
      const updatedUsers = users.map(u => u.id === editingUser.id ? editingUser : u)
      setUsers(updatedUsers)
      const allUsers = JSON.parse(localStorage.getItem('users') || '[]')
      const updatedAllUsers = allUsers.map((u: User) => u.id === editingUser.id ? editingUser : u)
      localStorage.setItem('users', JSON.stringify(updatedAllUsers))
      setEditingUser(null)
    }
  }

  const deleteUser = (id: number) => {
    const updatedUsers = users.filter(u => u.id !== id)
    setUsers(updatedUsers)
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]')
    const updatedAllUsers = allUsers.filter((u: User) => u.id !== id)
    localStorage.setItem('users', JSON.stringify(updatedAllUsers))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 transition-colors duration-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/dashboard" className="flex items-center text-white mb-6 hover:underline">
          <ArrowLeft className="mr-2" /> Back to Dashboard
        </Link>
        <motion.div 
          className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden backdrop-filter backdrop-blur-lg bg-opacity-10 dark:bg-opacity-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">User Management</h2>
            
            {/* Add/Edit User Form */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">{editingUser ? 'Edit User' : 'Add New User'}</h3>
              <div className="flex flex-col space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="p-2 border rounded-md bg-gray-700 border-gray-600 text-white"
                  value={editingUser ? editingUser.name : newUser.name}
                  onChange={(e) => editingUser ? setEditingUser({...editingUser, name: e.target.value}) : setNewUser({...newUser, name: e.target.value})}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="p-2 border rounded-md bg-gray-700 border-gray-600 text-white"
                  value={editingUser ? editingUser.email : newUser.email}
                  onChange={(e) => editingUser ? setEditingUser({...editingUser, email: e.target.value}) : setNewUser({...newUser, email: e.target.value})}
                />
                <select
                  className="p-2 border rounded-md bg-gray-700 border-gray-600 text-white"
                  value={editingUser ? editingUser.role : newUser.role}
                  onChange={(e) => editingUser ? setEditingUser({...editingUser, role: e.target.value}) : setNewUser({...newUser, role: e.target.value})}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                <motion.button
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300"
                  onClick={editingUser ? updateUser : addUser}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {editingUser ? 'Update' : 'Add'}
                </motion.button>
              </div>
            </div>

            {/* User List */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">User List</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                    {users.map(user => (
                      <motion.tr 
                        key={user.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{user.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{user.role}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4"
                            onClick={() => setEditingUser(user)}
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                            onClick={() => deleteUser(user.id)}
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default UserManagement