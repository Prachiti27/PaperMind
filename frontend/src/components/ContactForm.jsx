import React from 'react'
import { Mail, User, MessageCircle } from 'lucide-react'
import { motion } from 'motion/react'
import toast from 'react-hot-toast'

const ContactForm = () => {

  const handleSubmit = (e) => {
    e.preventDefault()
    toast.success('Message sent successfully!')
  }

  return (
    <div className='mb-5'>
      <h2 className="text-3xl font-bold mb-6 text-center drop-shadow-lg" style={{ color: '#4F46E5' }}>
        Contact Us
      </h2>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg"
      >
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-medium text-gray-700" htmlFor="name">
            Name <span className="text-red-500">*</span>
          </label>
          <div className="relative mb-4">
            <User className="absolute left-3 top-3 w-5 h-5" style={{ color: '#4F46E5' }} />
            <input
              id="name"
              name="name"
              type="text"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
              placeholder="Your Name"
            />
          </div>

          <label className="block mb-2 font-medium text-gray-700" htmlFor="email">
            Email <span className="text-red-500">*</span>
          </label>
          <div className="relative mb-4">
            <Mail className="absolute left-3 top-3 w-5 h-5" style={{ color: '#4F46E5' }} />
            <input
              id="email"
              name="email"
              type="email"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
              placeholder="Your Email"
            />
          </div>

          <label className="block mb-2 font-medium text-gray-700" htmlFor="message">
            Message <span className="text-red-500">*</span>
          </label>
          <div className="relative mb-6">
            <MessageCircle className="absolute left-3 top-3 w-5 h-5" style={{ color: '#4F46E5' }} />
            <textarea
              id="message"
              name="message"
              rows="4"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4F46E5] resize-none"
              placeholder="Write your message here..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-[#4F46E5] hover:bg-[#3b3ecf] text-white font-semibold py-3 rounded-md transition"
          >
            Send Message
          </button>
        </form>
      </motion.section>
    </div>
  )
}

export default ContactForm;
