import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-linear-to-b from-black to-transparent transition-all duration-300">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/">
          <h1 className="text-red-600 text-3xl font-bold uppercase">Streamline</h1>
        </Link>

        {/* Primary Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-white hover:text-gray-300">Home</Link>
          <Link to="/tv" className="text-white hover:text-gray-300">TV Shows</Link>
          <Link to="/movies" className="text-white hover:text-gray-300">Movies</Link>
          <Link to="/mylist" className="text-white hover:text-gray-300">My List</Link>
        </nav>

        {/* Secondary Navigation (Search, Profile) */}
        <div className="flex items-center space-x-4">
          <button className="text-white">
            {/* Search Icon (we'll add an icon later) */}
            Search
          </button>
          <Link to="/profile" className="text-white">
            {/* Profile Icon (we'll add an icon later) */}
            Profile
          </Link>
          <Link to="/logout" className="bg-red-600 text-white px-4 py-2 rounded-sm">
            Logout
          </Link>
        </div>

      </div>
    </header>
  );
};

export default Header;