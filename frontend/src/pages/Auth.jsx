import { Lock, Mail, User } from 'lucide-react'
import React, { useContext, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import ShopContext from '../context/ShopContext'
import axios from 'axios'
import toast from "react-hot-toast"

const Auth = () => {

  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const {setIsLoggedIn} = useContext(ShopContext)

  const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    if (isLogin) {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/login`,
        { email, password },
        { withCredentials: true }
      );
      setIsLoggedIn(true)
      toast.success("Logged in Successfully")
      navigate("/")
    } else {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/signup`,
        { name, email, password },
        { withCredentials: true }
      );
      toast.success("Account created successfully")
      navigate("/")
    }
  } catch (error) {
    console.log(error)
    toast.error(isLogin ? "Login failed" : "Signup failed")
  }
}

 
  return (
    <div className='min-h-screen bg-[#F9FAFB] flex items-center justify-center p-4'>
      <div className='bg-white shadow-xl rounded-2xl w-full max-w-md p-8'>
        <h1 className='text-3xl font-bold text-center text-gray-700 mb-6'>
          {isLogin ? "Login" : "Sign Up"} to <span className='text-[#4F46E5]'>PaperMind</span>
        </h1>
        <p className='text-center text-gray-500 mb-6'>
          {
            isLogin
              ? "Login to access your summaries"
              : "Create an account to start summarizing AI research"
          }
        </p>

        <form onSubmit={handleSubmit} className='space-y-5'>
          {
            !isLogin && (
              <div className='relative'>
                <User className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                <input
                  type='text'
                  placeholder='Full Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5]'
                  required
                />
              </div>
            )
          }

          <div className='relative'>
            <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
            <input
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5]'
              required
            />
          </div>

          <div className='relative'>
            <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5]'
              required
            />
          </div>

          <button
            type='submit'
            className='w-full py-3 bg-[#4F46E5] hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg'
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className='text-center text-gray-500 mt-4'>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className='text-indigo-600 hover:underline cursor-pointer'
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  )
}

export default Auth
