import React from 'react';

const MovieCard = ({ title, image, isAdded, onToggle, onClick }) => {
  
  // Helper for Keyboard support
  const handleKeyDown = (e) => {
    // If user presses Enter (Key 13) or Space (Key 32)
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div 
      onClick={onClick}
      onKeyDown={handleKeyDown} // 1. Listen for keys
      tabIndex="0"              // 2. Make focusable
      role="button"             // 3. Identify as button
      aria-label={`View details for ${title}`} // 4. Describe action
      className="relative group bg-gray-900 rounded-md overflow-hidden hover:scale-105 hover:z-10 transition-all duration-300 cursor-pointer shadow-lg focus:outline-none focus:ring-2 focus:ring-red-600" // Added focus ring
    >
      <img 
        src={image || "https://placehold.co/500x750?text=No+Image"} 
        alt={title} // Good: Alt text is already present
        className="w-full h-[350px] object-cover opacity-90 group-hover:opacity-100"
        onError={(e) => { e.target.src = "https://placehold.co/500x750?text=Error"; }}
      />

      <button 
        onClick={(e) => {
          e.stopPropagation(); 
          onToggle();
        }}
        className={`absolute top-2 right-2 p-2 rounded-full transition-colors z-20 ${
          isAdded ? 'bg-green-600 text-white' : 'bg-black/60 text-white hover:bg-white hover:text-black'
        }`}
        title={isAdded ? "Remove from My List" : "Add to My List"}
        aria-label={isAdded ? `Remove ${title} from My List` : `Add ${title} to My List`} // Accessible label
      >
        {isAdded ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-white text-sm font-bold drop-shadow-md">{title}</h3>
      </div>
    </div>
  );
};

export default MovieCard;