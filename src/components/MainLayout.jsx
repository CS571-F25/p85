import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';
import DetailModal from './DetailModal';
import { useAuth } from '../context/AuthContext';
// 1. Firebase Imports
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const MainLayout = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  
  // 2. New State for Content
  const [allContent, setAllContent] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const navigate = useNavigate();

  // Initialize MyList from local storage
  const [myList, setMyList] = useState(() => {
    const saved = localStorage.getItem('streamline_mylist');
    return saved ? JSON.parse(saved) : [];
  });

  // 3. Fetch Data from Firebase on Mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "movies"));
        const dataList = querySnapshot.docs.map(doc => doc.data());
        setAllContent(dataList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Save MyList changes
  useEffect(() => {
    localStorage.setItem('streamline_mylist', JSON.stringify(myList));
  }, [myList]);

  // Toggle Logic with Login Check
  const toggleMyList = (id) => {
    if (!user) {
      const wantsToLogin = window.confirm("You must be signed in to save movies.\n\nDo you want to go to the login page now?");
      if (wantsToLogin) navigate('/login');
      return;
    }

    setMyList(prevList => {
      if (prevList.includes(id)) return prevList.filter(item => item !== id);
      else return [...prevList, id];
    });
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      <Header onSearch={setSearchQuery} />
      
      <main>
        {/* 4. Pass 'allContent' and 'loading' down to the pages */}
        <Outlet context={{ searchQuery, myList, toggleMyList, setSelectedMovie, allContent, loading }} /> 
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