import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// 1. We accept the "onSearch" prop here to send text back to the App
const Header = ({ onSearch }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  // Helper to send the text to the parent component
  const handleSearch = (e) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black to-transparent transition-all duration-300">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/">
          <h1 className="text-red-600 text-3xl font-bold uppercase">Streamline</h1>
        </Link>

        {/* Primary Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-white hover:text-gray-300 transition">Home</Link>
          <Link to="/tv" className="text-white hover:text-gray-300 transition">TV Shows</Link>
          <Link to="/movies" className="text-white hover:text-gray-300 transition">Movies</Link>
          <Link to="/mylist" className="text-white hover:text-gray-300 transition">My List</Link>
        </nav>

        {/* Secondary Navigation (Search, Profile) */}
        <div className="flex items-center space-x-4">
          
          {/* Animated Search Bar */}
          <div className={`flex items-center transition-all duration-300 ${isSearchVisible ? 'bg-black/60 border border-white/50 px-2 py-1 rounded-full' : ''}`}>
            <button 
              onClick={() => setIsSearchVisible(!isSearchVisible)}
              className="text-white hover:text-gray-300 focus:outline-none flex items-center justify-center"
            >
               {/* Magnifying Glass Icon */}
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
            </button>

            {/* The Input Field - This was missing in your screenshot */}
            <input 
              type="text" 
              placeholder="Titles, people, genres" 
              className={`bg-transparent text-white text-sm outline-none ml-2 transition-all duration-300 ${isSearchVisible ? 'w-48 opacity-100' : 'w-0 opacity-0'}`}
              onChange={handleSearch} 
            />
          </div>

          <Link to="/profile" className="text-white hover:text-gray-300">
            Profile
          </Link>
          <Link to="/logout" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition">
            Logout
          </Link>
        </div>

      </div>
    </header>
  );
};

export default Header;