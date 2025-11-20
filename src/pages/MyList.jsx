import React from 'react';
import MovieCard from '../components/MovieCard';

const MyList = () => {
  // Ideally, we fetch this data using GET /bucket/mylist [cite: 45]
  const myMovies = [
    { id: 1, title: "Inception" },
    { id: 2, title: "Interstellar" }
  ];

  return (
    <div className="pt-24 px-6">
      <h1 className="text-3xl text-white font-bold mb-6">My List</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {myMovies.map(movie => (
          <MovieCard key={movie.id} title={movie.title} />
        ))}
      </div>
    </div>
  );
};

export default MyList;