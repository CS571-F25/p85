import React from 'react';

const Home = () => {
  return (
    <div className="pt-24">
      {/* pt-24 (padding-top) is to add space so the content isn't hidden behind the fixed Header */}
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-bold mb-4">Trending Now</h2>
        {/* We'll add a ContentCarousel component here later */}
        <div className="h-40 bg-gray-800 rounded-lg">
          {/* Placeholder for content row */}
        </div>
      </div>
    </div>
  );
};

export default Home;