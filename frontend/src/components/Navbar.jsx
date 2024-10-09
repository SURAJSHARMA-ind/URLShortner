import React from 'react'
import { Link } from 'react-router-dom'


function Navbar() {
  return (
    <div>
      <header className="bg-yellow-300 absolute z-10  w-full bg-opacity-50 ">
        <div className="px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex-shrink-0">
              <Link to="" title="" className="flex border border-solid border-black rounded-md">
                <h1 className='text-2xl text-white rounded-l bg-gradient-to-tl from bg-yellow-500 to-red-300 font-extrabold p-1'>Tiny</h1>
                <h1 className='text-2xl text-white rounded-r bg-gradient-to-tl from bg-red-500 to-yellow-200 font-extrabold p-1'>Urls</h1>
              </Link>
            </div>

            <button type="button" className="inline-flex p-2  text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100">
              <svg className="block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16"></path>
              </svg>
              <svg className="hidden w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            <div className=" lg:block  items-center lg:justify-center lg:space-x-10 md:flex-col  sm:flex-col">
              <Link to="/features" title="" className="text-base text-black transition-all duration-200 hover:text-opacity-80">Features</Link>
              <Link to="api" title="" className="text-base text-black transition-all duration-200 hover:text-opacity-80">API</Link>
              <Link to="pricing" title="" className="text-base text-black transition-all duration-200 hover:text-opacity-80">Pricing</Link>
            </div>

            <Link to="/mainscreen" title="" className="hidden lg:inline-flex items-center justify-center px-5 py-2.5 text-base transition-all duration-200 hover:bg-yellow-300 hover:text-black focus:text-black focus:bg-yellow-300 font-semibold text-white bg-black rounded-full" role="button">Get Started</Link>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Navbar
