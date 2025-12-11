import React, { useState } from 'react';

const DetailModal = ({ movie, onClose, onToggleList, isAdded }) => {
  // 1. New state to track if we should show the video
  const [isPlaying, setIsPlaying] = useState(false);

  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      
      <div className="bg-[#181818] rounded-lg overflow-hidden max-w-4xl w-full shadow-2xl relative animate-fadeIn">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 transition"
          aria-label="Close details"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row">
          
          {/* LEFT SIDE: Image OR Video Player */}
          <div className="md:w-1/2 relative h-64 md:h-auto bg-black">
             {isPlaying && movie.videoUrl ? (
               // 2. The Video Player (iframe)
               <iframe 
                 src={movie.videoUrl} 
                 title={movie.title}
                 className="w-full h-full absolute inset-0"
                 frameBorder="0"
                 allow="autoplay; encrypted-media"
                 allowFullScreen
               ></iframe>
             ) : (
               // 3. The Original Image (Show this if NOT playing)
               <>
                 <img 
                  src={movie.image} 
                  alt={movie.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181818] to-transparent md:bg-gradient-to-r" />
               </>
             )}
          </div>

          {/* RIGHT SIDE: Text Info */}
          <div className="p-8 md:w-1/2 flex flex-col justify-center text-white">
            <h2 className="text-4xl font-bold mb-2">{movie.title}</h2>
            
            <div className="flex items-center space-x-4 text-sm text-gray-400 mb-6">
              <span className="text-green-400 font-bold">98% Match</span>
              <span>2023</span>
              <span className="border border-gray-500 px-1 text-xs">HD</span>
            </div>

            <p className="text-gray-300 mb-8 leading-relaxed">
              {movie.overview || "No details available."}
            </p>

            <div className="flex space-x-4">
              
              {/* 4. THE PLAY BUTTON: Sets isPlaying to true */}
              <button 
                onClick={() => setIsPlaying(true)} 
                className="flex items-center bg-white text-black px-6 py-2 rounded font-bold hover:bg-gray-200 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                  <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                </svg>
                {isPlaying ? "Playing..." : "Play"}
              </button>

              <button 
                onClick={() => onToggleList(movie.id)}
                className="flex items-center border border-gray-500 text-white px-6 py-2 rounded font-bold hover:bg-gray-800 transition"
              >
                {isAdded ? (
                   <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-green-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Added
                   </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    My List
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;