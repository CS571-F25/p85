import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';
import DetailModal from './DetailModal';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, getDocs, doc, onSnapshot, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

const MainLayout = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [allContent, setAllContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myList, setMyList] = useState([]);
  const [continueWatching, setContinueWatching] = useState([]);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
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
    fetchMovies();
  }, []);

  useEffect(() => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const unsubscribe = onSnapshot(userRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setMyList(data.myList || []);
          setContinueWatching(data.continueWatching || []);
        } else {
          setDoc(userRef, { myList: [], continueWatching: [] }, { merge: true });
        }
      });
      return () => unsubscribe();
    } else {
      setMyList([]);
      setContinueWatching([]);
    }
  }, [user]);

  const toggleMyList = async (id) => {
    if (!user) {
      if (window.confirm("You must be signed in to save movies.\n\nDo you want to go to the login page now?")) navigate('/login');
      return;
    }
    const userRef = doc(db, "users", user.uid);
    try {
      if (myList.includes(id)) {
        await updateDoc(userRef, { myList: arrayRemove(id) });
      } else {
        await updateDoc(userRef, { myList: arrayUnion(id) });
      }
    } catch (e) { console.error(e); }
  };

  // 1. NEW: Handle Play Logic with Auth Check
  const handlePlayMovie = (id) => {
    // SECURITY CHECK: Stop if not logged in
    if (!user) {
      if (window.confirm("You must be signed in to watch movies.\n\nDo you want to go to the login page now?")) {
        navigate('/login');
      }
      return false; // Return FALSE to tell modal "Do not play"
    }

    // If logged in, save history and allow play
    addToHistory(id);
    return true; // Return TRUE to allow play
  };

  const addToHistory = async (id) => {
    if (!user) return;
    const newHistory = [id, ...continueWatching.filter(item => item !== id)].slice(0, 10);
    try {
      await setDoc(doc(db, "users", user.uid), { continueWatching: newHistory }, { merge: true });
    } catch (e) { console.error(e); }
  };

  const removeFromHistory = async (id) => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    try {
      await updateDoc(userRef, { continueWatching: arrayRemove(id) });
    } catch (e) { console.error(e); }
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      <Header onSearch={setSearchQuery} />
      
      <main>
        <Outlet context={{ searchQuery, myList, toggleMyList, setSelectedMovie, allContent, loading, continueWatching }} /> 
      </main>

      {selectedMovie && (
        <DetailModal 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
          isAdded={myList.includes(selectedMovie.id)}
          onToggleList={toggleMyList}
          // 2. Pass the new secure handler
          onPlay={() => handlePlayMovie(selectedMovie.id)}
          isInHistory={continueWatching.includes(selectedMovie.id)}
          onRemoveFromHistory={() => removeFromHistory(selectedMovie.id)}
        />
      )}
    </div>
  );
};

export default MainLayout;