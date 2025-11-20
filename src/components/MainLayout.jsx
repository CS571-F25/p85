import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const MainLayout = () => {
  // 1. State to hold the search text
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 2. Pass the "setter" to Header so typing updates the state */}
      <Header onSearch={setSearchQuery} />

      <main>
        {/* 3. CRITICAL: Pass the "value" to the pages (Home, TV, Movies) */}
        <Outlet context={{ searchQuery }} /> 
      </main>
    </div>
  );
};

export default MainLayout;