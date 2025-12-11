import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signUp(email, password);
      navigate('/'); // Redirect to Home on success
    } catch (err) {
      setError(err.message); // Show error (e.g., "Password too weak")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/80 bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg')] bg-cover bg-center">
      <div className="bg-black/75 p-16 rounded-lg max-w-md w-full border border-gray-700 backdrop-blur-sm">
        <h2 className="text-3xl text-white font-bold mb-8">Sign Up</h2>
        
        {error && <p className="p-3 bg-red-500 text-white rounded mb-4 text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <input 
            type="email" 
            placeholder="Email" 
            className="p-3 rounded bg-[#333] text-white outline-none focus:bg-[#454545]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="p-3 rounded bg-[#333] text-white outline-none focus:bg-[#454545]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-red-600 text-white py-3 rounded font-bold hover:bg-red-700 transition">
            Sign Up
          </button>
        </form>
        
        <p className="text-gray-400 mt-4 text-sm">
          Already have an account? <Link to="/login" className="text-white hover:underline">Sign In.</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;