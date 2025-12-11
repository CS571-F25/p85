import React from 'react';
import { useOutletContext } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

const Home = () => {
  // 1. Get continueWatching from context
  const { searchQuery, myList, toggleMyList, setSelectedMovie, allContent, loading, continueWatching } = useOutletContext();

  if (loading) return <div className="text-white pt-32 text-center text-xl">Loading content...</div>;

  const filteredContent = allContent.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 2. Filter the "Continue Watching" movies
  // We map the IDs back to the full movie objects
  const continueWatchingMovies = (continueWatching || [])
    .map(id => allContent.find(item => item.id === id))
    .filter(item => item !== undefined); // Remove any that weren't found

  return (
    <div className="pt-24 pb-10">
      <div className="container mx-auto px-6">
        
        {/* 3. New Section: Continue Watching (Only show if not empty and no search active) */}
        {!searchQuery && continueWatchingMovies.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2 text-red-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Continue Watching
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {continueWatchingMovies.map((item) => (
                <MovieCard 
                  key={item.id} 
                  title={item.title} 
                  image={item.image}
                  isAdded={myList.includes(item.id)}
                  onToggle={() => toggleMyList(item.id)}
                  onClick={() => setSelectedMovie(item)} 
                />
              ))}
            </div>
          </div>
        )}

        {/* Existing Trending Section */}
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