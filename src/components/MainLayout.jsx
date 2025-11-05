import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* 1. The Header will always be at the top */}
      <Header />

      {/* 2. Page content will be injected here */}
      <main>
        <Outlet /> 
      </main>

      {/* We can add a Footer component here later */}
      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;