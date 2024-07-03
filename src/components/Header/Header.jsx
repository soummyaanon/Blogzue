import React, { useState } from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Home, LogIn, UserPlus, FileText, PlusCircle, Menu, X } from 'lucide-react'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true,
      icon: Home
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
      icon: LogIn
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
      icon: UserPlus
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
      icon: FileText
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
      icon: PlusCircle
    },
  ]

  const NavItem = ({ item, mobile = false }) => (
    <button
      key={item.name}
      onClick={() => {
        navigate(item.slug)
        if (mobile) setMobileMenuOpen(false)
      }}
      className={`flex items-center px-4 py-2 rounded-md hover:bg-gray-700 transition duration-200 ${
        mobile ? 'w-full justify-start' : ''
      }`}
    >
      <item.icon className="w-5 h-5 mr-2" />
      {item.name}
    </button>
  )

  return (
    <header className='py-4 shadow bg-transparent text-gray-100'>
      <Container>
        <nav className='flex items-center justify-between'>
          <div className='flex items-center'>
            <Link to='/' className='mr-4'>
              <Logo width='70px' />
            </Link>
          </div>
          <div className='hidden md:flex items-center space-x-4'>
            {navItems.map((item) => item.active ? <NavItem key={item.name} item={item} /> : null)}
            {authStatus && <LogoutBtn />}
          </div>
          <div className='md:hidden'>
            <button
              className='text-gray-100 hover:text-gray-300'
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </Container>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-90 md:hidden">
          <div className="flex flex-col items-center justify-center h-full">
            {navItems.map((item) => 
              item.active ? <NavItem key={item.name} item={item} mobile /> : null
            )}
            {authStatus && <LogoutBtn />}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header