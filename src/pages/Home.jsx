import React from 'react';
import { useOutletContext } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { CONTENT_DATA } from '../data'; // Make sure you created the data.js file!

const Home = () => {
  // 1. Get the search text from the MainLayout
  const context = useOutletContext();
  const searchQuery = context?.searchQuery || ''; // Safety check

  // 2. Filter the data (Movies + TV) based on search
  const filteredContent = CONTENT_DATA ? CONTENT_DATA.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  return (
    <div className="pt-24 pb-10">
      <div className="container mx-auto px-6">
        
        {/* Dynamic Title */}
        <h2 className="text-2xl font-bold mb-6 text-white">
          {searchQuery ? `Search Results: "${searchQuery}"` : 'Trending Now'}
        </h2>

        {/* 3. The Movie Grid (Replaces the old gray placeholder box) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredContent.length > 0 ? (
            filteredContent.map((item) => (
              <MovieCard 
                key={item.id} 
                title={item.title} 
                image={item.image} 
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