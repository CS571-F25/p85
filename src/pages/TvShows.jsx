import React from 'react';
import { useOutletContext } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

const TvShows = () => {
  const { searchQuery, myList, toggleMyList, setSelectedMovie, allContent, loading } = useOutletContext();

  if (loading) return <div className="text-white pt-32 text-center text-xl">Loading TV shows...</div>;

  // Filter: Must be TV and match SEARCH
  const filteredShows = allContent.filter(item => 
    item.type === 'tv' && 
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-24 pb-10">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-bold mb-6 text-white">
          {searchQuery ? `Search Results: "${searchQuery}"` : 'TV Shows'}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredShows.map((show) => (
            <MovieCard 
              key={show.id} 
              title={show.title} 
              image={show.image} 
              isAdded={myList.includes(show.id)}
              onToggle={() => toggleMyList(show.id)}
              onClick={() => setSelectedMovie(show)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TvShows;