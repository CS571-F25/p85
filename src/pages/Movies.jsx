import React from 'react';
import { useOutletContext } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

const Movies = () => {
  const { searchQuery, myList, toggleMyList, setSelectedMovie, allContent, loading } = useOutletContext();

  if (loading) return <div className="text-white pt-32 text-center text-xl">Loading movies...</div>;

  // FIX: Filter for 'movie' instead of 'tv'
  const filteredMovies = allContent.filter(item => 
    item.type === 'movie' && 
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-24 pb-10">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-bold mb-6 text-white">
          {searchQuery ? `Search Results: "${searchQuery}"` : 'Movies'}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredMovies.map((movie) => (
            <MovieCard 
              key={movie.id} 
              title={movie.title} 
              image={movie.image} 
              isAdded={myList.includes(movie.id)}
              onToggle={() => toggleMyList(movie.id)}
              onClick={() => setSelectedMovie(movie)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movies;