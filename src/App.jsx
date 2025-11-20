import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';

// Import your pages
import Home from './pages/Home';
import MyList from './pages/MyList';
import Login from './pages/Login';
import Movies from './pages/Movies';   // <-- Make sure this is imported
import TvShows from './pages/TvShows'; // <-- Make sure this is imported

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="mylist" element={<MyList />} />
        <Route path="movies" element={<Movies />} />
        <Route path="tv" element={<TvShows />} />
        
      </Route>
      
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;