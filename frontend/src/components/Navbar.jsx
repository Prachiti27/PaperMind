import React, { useContext } from 'react'
import { Link as ScrollLink } from 'react-scroll'
import { Link as RouterLink } from 'react-router-dom'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import ShopContext from '../context/ShopContext'
import axios from 'axios'
import toast from 'react-hot-toast'

const Navbar = () => {

  const navigate = useNavigate()

  const { isLoggedIn, setIsLoggedIn } = useContext(ShopContext)

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/logout`,
        {},
        { withCredentials: true }
      )
      setIsLoggedIn(false)
      toast.success('Logged out successfully')
      navigate('/')
    }
    catch (error) {
      console.log(error)
      toast.error('Logout failed!')
    }
  }

  return (
    <motion.nav
      className='px-12 py-5 flex items-center justify-between'
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <h1
        className='bg-gradient-to-b from-[#4F46E5] to-[#4F46E5]/75 bg-clip-text text-transparent text-3xl font-bold tracking-wide'
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        PaperMind
      </h1>
      {
        !isLoggedIn
          ?
          (
            <div
              className='flex space-x-8 gap-10'
              whileHover={{ scale: 1.1, color: 'rgba(79, 70, 229, 0.8)' }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <ScrollLink
                to='hero'
                smooth={true}
                duration={500}
                className='text-[#4F46E5] text-xl font-medium hover:text-[#4F46E5]/80 hover:cursor-pointer'
              >
                Home
              </ScrollLink>
              <ScrollLink to='features' smooth={true} duration={500} className='text-[#4F46E5] text-xl font-medium hover:text-[#4F46E5]/80 hover:cursor-pointer'>
                Features
              </ScrollLink>
              <ScrollLink to='howitworks' smooth={true} duration={500} className='text-[#4F46E5] text-xl font-medium hover:text-[#4F46E5]/80 hover:cursor-pointer'>
                How It Works
              </ScrollLink>
              <ScrollLink to='pricing' smooth={true} duration={500} className='text-[#4F46E5] text-xl font-medium hover:text-[#4F46E5]/80 hover:cursor-pointer'>
                Pricing
              </ScrollLink>
            </div>
          )
          : (
            <div
              className='flex space-x-8 gap-10'
              whileHover={{ scale: 1.1, color: 'rgba(79, 70, 229, 0.8)' }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <RouterLink to='/dashboard' className='text-[#4F46E5] text-xl font-medium hover:text-[#4F46E5]/80 hover:cursor-pointer'>
                Dashboard
              </RouterLink>

              <RouterLink to='/generate-summary' className='text-[#4F46E5] text-xl font-medium hover:text-[#4F46E5]/80 hover:cursor-pointer'>
                Generate Summary
              </RouterLink>

              <RouterLink to='/contact' className='text-[#4F46E5] text-xl font-medium hover:text-[#4F46E5]/80 hover:cursor-pointer'>
                Contact
              </RouterLink>
            </div>
          )
      }
      {
        isLoggedIn
          ? (
            <button
              onClick={handleLogout}
              className='px-6 py-2 bg-[#4F46E5] text-white text-xl font-semibold rounded-sm shadow-lg hover:bg-indigo-700 tracking-wide transition duration-300'
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(79, 70, 229, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Logout
            </button>
          )
          :
          (
            <button
              onClick={() => navigate('/login')}
              className='px-6 py-2 bg-[#4F46E5] text-white text-xl font-semibold rounded-sm shadow-lg hover:bg-indigo-700 tracking-wide transition duration-300'
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(79, 70, 229, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Login
            </button>
          )
      }
    </motion.nav >
  )
}

export default Navbar
