import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; 

import MainLayout from './components/MainLayout';
import Home from './pages/Home';
import MyList from './pages/MyList';
import Login from './pages/Login';
import Movies from './pages/Movies';
import TvShows from './pages/TvShows';
import Register from './pages/Register';

// We keep this component in case you want to protect other routes later,
// but we won't use it for MyList anymore.
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        
        {/* CHANGE THIS: Remove the <ProtectedRoute> wrapper */}
        <Route path="mylist" element={<MyList />} />
        
        <Route path="movies" element={<Movies />} />
        <Route path="tv" element={<TvShows />} />
        <Route path="register" element={<Register />} />
      </Route>
      
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;