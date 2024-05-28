import React from 'react'
import logo from '../assets/mylogo.svg'; // adjust the path to match your file structure

function Logo() {
  return (
    <img src={logo} alt="Logo" className="w-20 h-auto" />
  )
}

export default Logo