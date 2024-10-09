import React from 'react';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <div className="min-h-screen h-full flex justify-center items-center w-full bg-yellow-200 bg-opacity-50">
      <section className="bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-16 lg:py-24 w-full">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-1">
            <div className="text-center lg:text-left">
              <h1 className="mt-4 text-3xl font-bold text-black sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                Shorten, Share & Track Your URLs
              </h1>
              <p className="mt-4 text-sm text-black sm:text-lg md:text-xl lg:mt-6 xl:text-2xl">
                Transform long URLs into short, manageable links effortlessly.
              </p>

              <Link
                to="/mainscreen"
                className="inline-flex items-center px-5 py-3 mt-6 font-semibold text-black transition-all duration-200 bg-yellow-300 rounded-full lg:mt-10 hover:bg-yellow-400 focus:bg-yellow-400"
                role="button"
              >
                Start Shortening
                <svg
                  className="w-5 h-5 ml-3 -mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </Link>

              <p className="mt-4 text-sm text-gray-600 sm:text-base">
                Already using our service?{' '}
                <Link to="/login" className="text-black transition-all duration-200 hover:underline">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HeroSection;
