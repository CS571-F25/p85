import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 1. Import the Auth Hook

const Header = ({ onSearch }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  
  // 2. Get the current user and logout function from our Context
  const { user, logOut } = useAuth(); 
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  // 3. Handle the Logout logic
  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/login'); // Redirect to login page after signing out
    } catch (error) {
      console.error("Failed to log out", error);
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
          {/* Only show "My List" if logged in? Optional, but good practice */}
          <Link to="/mylist" className="text-white hover:text-gray-300 transition">My List</Link>
        </nav>

        {/* Secondary Navigation */}
        <div className="flex items-center space-x-4">
          
          {/* Animated Search Bar */}
          <div className={`flex items-center transition-all duration-300 ${isSearchVisible ? 'bg-black/60 border border-white/50 px-2 py-1 rounded-full' : ''}`}>
            <button 
              onClick={() => setIsSearchVisible(!isSearchVisible)}
              className="text-white hover:text-gray-300 focus:outline-none flex items-center justify-center"
              aria-label="Toggle search bar"
            >
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
            </button>

            <input 
              type="text" 
              placeholder="Titles, people, genres" 
              className={`bg-transparent text-white text-sm outline-none ml-2 transition-all duration-300 ${isSearchVisible ? 'w-48 opacity-100' : 'w-0 opacity-0'}`}
              onChange={handleSearch} 
              aria-label="Search movies and TV shows"
            />
          </div>

          {/* 4. Dynamic Auth Buttons */}
          {user ? (
            // IF LOGGED IN: Show Name + Logout
            <div className="flex items-center space-x-4">
              <span className="text-white text-sm hidden md:block">
                Hi, {user.email?.split('@')[0] || "User"}
              </span>
              <button 
                onClick={handleLogout} 
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition text-sm font-semibold"
              >
                Logout
              </button>
            </div>
          ) : (
            // IF LOGGED OUT: Show Sign In Button
             <Link 
               to="/login" 
               className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition text-sm font-semibold"
             >
               Sign In
             </Link>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;