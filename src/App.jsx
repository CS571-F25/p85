import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import our new layout and pages
import MainLayout from './components/MainLayout';
import Home from './pages/Home';

// We'll create these pages later
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Player from './pages/Player';
// import MyList from './pages/MyList';

function App() {
  return (
    <Routes>
      {/* Route 1: For main app pages (Home, MyList, etc.) */}
      {/* These routes are nested inside MainLayout, so they all get the Header */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        {/* <Route path="mylist" element={<MyList />} /> */}
        {/* <Route path="movies" element={<Movies />} /> */}
        {/* <Route path="tv" element={<TvShows />} /> */}
      </Route>

      {/* Route 2: For auth pages (Login, Register) */}
      {/* These pages will NOT have the main Header */}
      {/* <Route path="/login" element={<Login />} /> */}
      {/* <Route path="/register" element={<Register />} /> */}

      {/* Route 3: For the video player */}
      {/* <Route path="/player/:id" element={<Player />} /> */}
    </Routes>
  );
}

export default App;