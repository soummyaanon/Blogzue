import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [dispatch])
  
return !loading ? (
  <div style={{ backdropFilter: 'blur(10px)' }} className='min-h-screen flex flex-col justify-between bg-black text-gray-200 bg-opacity-50'>
  <div className='w-full block'>
      <Header className='text-2xl font-bold p-4  transition-colors duration-200' />
      <main className='px-4 py-8'>
        <Outlet />
      </main>
      <Footer className='text-sm p-4 bg-gray-800 hover:text-white transition-colors duration-200' />
    </div>
  </div>
) : null
}

export default App