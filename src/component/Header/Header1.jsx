import React from 'react'
import { Container, Logo, Logoutbtn } from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
  ]

  return (
    <header className='py-4 shadow-xl bg-gradient-to-r from-slate-800 via-gray-700 to-slate-800 border-b border-gray-600'>
      <Container>
        <nav className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <Link to='/' className='flex items-center space-x-3 group'>
              {React.createElement(Logo, { width: '70px' })}
              <span className='text-white font-bold text-xl hidden md:block group-hover:text-gray-200 transition-colors duration-200'>BlogApp</span>
            </Link>
          </div>
          <ul className='flex items-center space-x-1'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.slug}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='px-4 py-2 text-gray-200 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 font-medium border border-transparent hover:border-gray-500 cursor-pointer'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <Logoutbtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
