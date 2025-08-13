import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Contact from './pages/Contact'
import Summary from './pages/Summary'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: { fontSize: '14px', borderRadius: '10px', padding: '10px', color: '#fff', background: '#4F46E5' }
        }}
      />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/generate-summary' element={<Summary />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </>
  )
}

export default App
