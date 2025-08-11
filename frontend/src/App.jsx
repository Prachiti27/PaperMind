import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Chat from './pages/Chat'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/chat' element={<Chat/>}/>
      </Routes>
    </>
  )
}

export default App
