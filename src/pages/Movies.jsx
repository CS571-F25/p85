import React from 'react';
import { useOutletContext } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { CONTENT_DATA } from '../data';

const Movies = () => {
  const { searchQuery } = useOutletContext();

  // Filter: Must be a MOVIE and match SEARCH
  const filteredMovies = CONTENT_DATA.filter(item => 
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
            <MovieCard key={movie.id} title={movie.title} image={movie.image} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movies;