import React from 'react';

const MovieCard = ({ title, image }) => {
  return (
    <div className="relative group bg-gray-900 rounded-md overflow-hidden hover:scale-105 hover:z-10 transition-all duration-300 cursor-pointer shadow-lg">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-[350px] object-cover opacity-90 group-hover:opacity-100"
      />
      {/* Gradient overlay for text readability */}
      <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-white text-sm font-bold drop-shadow-md">{title}</h3>
        <div className="flex items-center space-x-2 mt-2">
           <button className="bg-white text-black rounded-full p-1.5 hover:bg-gray-200">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
               <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
             </svg>
           </button>
           <button className="border border-gray-400 rounded-full p-1.5 hover:border-white text-white">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
             </svg>
           </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;