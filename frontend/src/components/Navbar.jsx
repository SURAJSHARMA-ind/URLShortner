import React from 'react'
import { Link } from 'react-router-dom'


function Navbar() {

  return (
    <div className="bg-yellow-300 absolute z-10 flex justify-between w-full bg-opacity-50 ">
      <div className="group flex border border-black rounded-md m-2 w-fit">
        <Link to="" className="flex">
          <h1 className="text-2xl rounded-l text-white font-extrabold p-1 bg-yellow-500 group-hover:bg-yellow-600">
            Tiny
          </h1>
          <h1 className="text-2xl rounded-r text-white font-extrabold p-1 bg-red-500 group-hover:bg-red-600">
            Urls
          </h1>
        </Link>
      </div>


      <div className=" flex gap-4  lg:gap-6  sm:gap-4 m-5 text-center items-center ">
        <Link to="/features" title="" className="text-base text-black hover:text-red-500">Features</Link>
        <Link to="/api" title="" className="text-base text-black hover:text-red-500">API</Link>
        <Link to="/pricing" title="" className="text-base text-black hover:text-red-500">Pricing</Link>
      </div>
    </div>

  )
}

export default Navbar
