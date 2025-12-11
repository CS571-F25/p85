import React from 'react';
import { useOutletContext } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { CONTENT_DATA } from '../data';

const Home = () => {
  // 1. Get setSelectedMovie
  const { searchQuery, myList, toggleMyList, setSelectedMovie } = useOutletContext();
  
  const filteredContent = CONTENT_DATA ? CONTENT_DATA.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  return (
    <div className="pt-24 pb-10">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-bold mb-6 text-white">
          {searchQuery ? `Search Results: "${searchQuery}"` : 'Trending Now'}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredContent.map((item) => (
            <MovieCard 
              key={item.id} 
              title={item.title} 
              image={item.image}
              isAdded={myList.includes(item.id)}
              onToggle={() => toggleMyList(item.id)}
              // 2. Add the click handler
              onClick={() => setSelectedMovie(item)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;