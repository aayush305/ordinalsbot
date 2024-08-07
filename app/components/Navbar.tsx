'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { menuOptions } from '../constants/menuOptions'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const isActive = (path: string) => pathname === path ? 'text-yellow-500' : ''

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">
          Logo
        </Link>
        <button
          className="text-white block md:hidden"
          onClick={toggleMenu}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
          </svg>
        </button>
        <div className="hidden md:flex md:items-center md:w-auto">
          <div className="text-sm md:flex-grow">
            {menuOptions.map((option) => (
              <Link key={option.name} href={option.path} className={`block mt-4 md:inline-block md:mt-0 text-white hover:text-gray-300 mr-4 ${isActive(option.path)}`}>
                {option.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* mobile menu as drawer*/}
      <div className={`${isOpen ? 'fixed' : 'hidden'} top-0 left-0 w-full h-full bg-gray-800 z-50`}>
        <div className="p-4">
          <button className="text-white block md:hidden mb-4" onClick={toggleMenu}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="text-sm">
            {menuOptions.map((option) => (
              <Link key={option.name} href={option.path} className={`block mt-4 text-white hover:text-gray-300 ${isActive(option.path)}`} onClick={toggleMenu}>
                {option.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
