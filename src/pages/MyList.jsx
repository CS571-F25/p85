import React from 'react';
import { useOutletContext, Link } from 'react-router-dom'; // Added Link
import { useAuth } from '../context/AuthContext'; // 1. Import Auth Hook
import MovieCard from '../components/MovieCard';
import { CONTENT_DATA } from '../data';

const MyList = () => {
  const { user } = useAuth(); // 2. Get the current user
  const { myList, toggleMyList, setSelectedMovie } = useOutletContext();

  // 3. The "Not Signed In" View
  if (!user) {
    return (
      <div className="pt-32 px-6 pb-10 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="bg-gray-900/80 p-10 rounded-lg border border-gray-700 max-w-lg w-full backdrop-blur-sm">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-red-600 mx-auto mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
          <h2 className="text-3xl font-bold text-white mb-4">Your List is Waiting</h2>
          <p className="text-gray-400 mb-8 text-lg">
            Sign in to save movies, create your watchlist, and pick up exactly where you left off.
          </p>
          <Link 
            to="/login" 
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded transition transform hover:scale-105"
          >
            Sign In Now
          </Link>
          <p className="mt-4 text-sm text-gray-500">
            Don't have an account? <Link to="/register" className="text-white hover:underline">Sign up free.</Link>
          </p>
        </div>
      </div>
    );
  }

  // 4. The Standard View (Only runs if user IS logged in)
  const myMovies = CONTENT_DATA.filter(item => myList.includes(item.id));

  return (
    <div className="pt-24 px-6 pb-10">
      <h1 className="text-3xl text-white font-bold mb-6">My List</h1>
      
      {myMovies.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {myMovies.map(movie => (
            <MovieCard 
              key={movie.id} 
              title={movie.title}
              image={movie.image}
              isAdded={true} 
              onToggle={() => toggleMyList(movie.id)}
              onClick={() => setSelectedMovie(movie)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center mt-20 text-gray-500">
          <p className="text-xl">Your list is empty.</p>
          <p className="text-sm mt-2">Go to Home or Movies to add some favorites!</p>
        </div>
      )}
    </div>
  );
};

export default MyList;