import React from 'react'
import logo from '../assets/mylogo.svg'; // adjust the path to match your file structure

function Logo() {
  return (
    <img src={logo} alt="Logo" className="w-16 h-auto transition duration-500 ease-in-out transform hover:scale-110" />
  )
}

export default Logo