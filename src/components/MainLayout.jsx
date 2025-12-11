import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import Header from './Header';
import DetailModal from './DetailModal';
import { useAuth } from '../context/AuthContext'; // 2. Import Auth Hook

const MainLayout = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  
  // Get Auth info
  const { user } = useAuth();
  const navigate = useNavigate();

  const [myList, setMyList] = useState(() => {
    const saved = localStorage.getItem('streamline_mylist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('streamline_mylist', JSON.stringify(myList));
  }, [myList]);

  // 3. The Updated Toggle Function
  const toggleMyList = (id) => {
      // SECURITY CHECK: If no user, ask them instead of forcing them
      if (!user) {
        const wantsToLogin = window.confirm("You must be signed in to save movies.\n\nDo you want to go to the login page now?");
        
        if (wantsToLogin) {
          navigate('/login'); // Only redirect if they click "OK"
        }
        return; // Stop here. Do not add the movie.
      }

      // Standard logic (only runs if user exists)
      setMyList(prevList => {
        if (prevList.includes(id)) {
          return prevList.filter(item => item !== id);
        } else {
          return [...prevList, id];
        }
      });
    };
    
  return (
    <div className="min-h-screen bg-black text-white relative">
      <Header onSearch={setSearchQuery} />
      
      <main>
        <Outlet context={{ searchQuery, myList, toggleMyList, setSelectedMovie }} /> 
      </main>

      {selectedMovie && (
        <DetailModal 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
          isAdded={myList.includes(selectedMovie.id)}
          onToggleList={toggleMyList}
        />
      )}
    </div>
  );
};

export default MainLayout;