import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { LogOut } from 'lucide-react'

function LogoutBtn() {
  const dispatch = useDispatch()

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout())
    })
  }

  return (
    <button
      className='flex items-center px-4 py-2 rounded-md text-gray-100 bg-red-600 hover:bg-red-700 transition duration-200'
      onClick={logoutHandler}
    >
      <LogOut className="w-5 h-5 mr-2" />
      Logout
    </button>
  )
}

export default LogoutBtn