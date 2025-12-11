import React from 'react';
import { useOutletContext } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

const Home = () => {
  // 1. Get 'allContent' from context
  const { searchQuery, myList, toggleMyList, setSelectedMovie, allContent, loading } = useOutletContext();
  
  // 2. Show loading state while fetching
  if (loading) return <div className="text-white pt-32 text-center text-xl">Loading content...</div>;

  const filteredContent = allContent.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-24 pb-10">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-bold mb-6 text-white">
          {searchQuery ? `Search Results: "${searchQuery}"` : 'Trending Now'}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredContent.length > 0 ? (
            filteredContent.map((item) => (
              <MovieCard 
                key={item.id} 
                title={item.title} 
                image={item.image}
                isAdded={myList.includes(item.id)}
                onToggle={() => toggleMyList(item.id)}
                onClick={() => setSelectedMovie(item)} 
              />
            ))
          ) : (
             <p className="text-gray-500 text-lg col-span-full text-center mt-10">
              No results found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;