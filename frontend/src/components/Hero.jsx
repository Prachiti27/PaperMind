import React, { useContext } from 'react'
import { motion } from 'motion/react'
import ShopContext from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'

const Hero = () => {

  const {isLoggedIn} = useContext(ShopContext)
  const navigate = useNavigate()

  const handleUpload = async () => {
    if(isLoggedIn){
      navigate('/generate-summary')
    }
    else{
      navigate('/login')
    }
  }

  return (
    <motion.div 
      className='flex flex-col gap-5 items-center mt-15'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <motion.h1 
        className='text-[#4F46E5] font-bold text-5xl tracking-wider drop-shadow-lg'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Your Personal AI Assistant
      </motion.h1>
      <motion.p 
        className='text-[#111827] text-2xl tracking-wide'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Upload research papers, get structured summaries, and chat with AI instantly.
      </motion.p>
      <button 
        onClick={handleUpload}
        className='px-8 py-4 mt-2 bg-[#4F46E5] font-semibold text-white text-xl rounded-sm shadow-lg hover:bg-[#4F46E5] hover:cursor-pointer'
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        Upload a Paper
      </button>
    </motion.div>
  )
}

export default Hero
