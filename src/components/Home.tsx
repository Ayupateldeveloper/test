import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { LogIn, UserPlus } from 'lucide-react'
import * as THREE from 'three'
import { motion } from 'framer-motion'

const Home: React.FC = () => {
  const globeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (globeRef.current) {
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
      const renderer = new THREE.WebGLRenderer({ alpha: true })
      renderer.setSize(200, 200)
      globeRef.current.appendChild(renderer.domElement)

      const geometry = new THREE.SphereGeometry(1, 32, 32)
      const material = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true,
      })
      const globe = new THREE.Mesh(geometry, material)
      scene.add(globe)

      camera.position.z = 2.5

      const animate = () => {
        requestAnimationFrame(animate)
        globe.rotation.x += 0.01
        globe.rotation.y += 0.01
        renderer.render(scene, camera)
      }

      animate()

      return () => {
        if (globeRef.current) {
          globeRef.current.removeChild(renderer.domElement)
        }
      }
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-md w-full space-y-8 relative z-10"
      >
        <div>
          <h1 className="mt-6 text-center text-5xl font-extrabold text-white">Welcome to FutureAuth</h1>
          <p className="mt-2 text-center text-xl text-gray-200">
            Secure your future with next-gen authentication
          </p>
        </div>
        <div ref={globeRef} className="flex justify-center"></div>
        <div className="mt-8 space-y-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/login"
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <LogIn className="mr-2 h-5 w-5" />
              Sign In
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/signup"
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <UserPlus className="mr-2 h-5 w-5" />
              Create an Account
            </Link>
          </motion.div>
        </div>
      </motion.div>
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent"></div>
    </div>
  )
}

export default Home