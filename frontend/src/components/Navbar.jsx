import React from 'react'
import { Link } from 'react-scroll'
import { motion } from 'motion/react'

const Navbar = () => {
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
      <div
        className='flex space-x-8 gap-10'
        whileHover={{ scale: 1.1, color: 'rgba(79, 70, 229, 0.8)' }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <Link
          to='hero'
          smooth={true}
          duration={500}
          className='text-[#4F46E5] text-xl font-medium hover:text-[#4F46E5]/80 hover:cursor-pointer'
        >
          Home
        </Link>
        <Link to='features' smooth={true} duration={500} className='text-[#4F46E5] text-xl font-medium hover:text-[#4F46E5]/80 hover:cursor-pointer'>
          Features
        </Link>
        <Link to='howitworks' smooth={true} duration={500} className='text-[#4F46E5] text-xl font-medium hover:text-[#4F46E5]/80 hover:cursor-pointer'>
          How It Works
        </Link>
        <Link to='pricing' smooth={true} duration={500} className='text-[#4F46E5] text-xl font-medium hover:text-[#4F46E5]/80 hover:cursor-pointer'>
          Pricing
        </Link>
      </div>
      <button
        className='px-6 py-2 bg-gradient-to-b from-[#4F46E5] to-[#4F46E5]/75 text-white text-xl font-semibold rounded-sm shadow-lg hover:bg-[#4F46E5]/50 tracking-wide transition duration-300'
        whileHover={{ scale: 1.05, backgroundColor: 'rgba(79, 70, 229, 0.5)' }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        Login
      </button>
    </motion.nav>
  )
}

export default Navbar
