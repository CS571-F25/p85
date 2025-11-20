import React from 'react';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black/80">
      <div className="bg-black p-8 rounded-lg max-w-md w-full border border-gray-700">
        <h2 className="text-3xl text-white font-bold mb-6">Sign In</h2>
        <button className="w-full bg-red-600 text-white py-3 rounded font-bold hover:bg-red-700 transition">
          Sign In with Badger ID
        </button>
      </div>
    </div>
  );
};

export default Login;