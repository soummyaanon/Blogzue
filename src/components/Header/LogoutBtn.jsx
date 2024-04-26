import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
    className='inline-block px-4 py-2 text-gray-300 hover:text-gray-400 duration-200'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn