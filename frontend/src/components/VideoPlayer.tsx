import React, { useRef, useEffect } from 'react';

interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  videoTitle: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  isOpen,
  onClose,
  videoUrl,
  videoTitle,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  
  // Handle escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);
  
  // Focus the close button when the video player opens
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-black z-50"
      style={{ display: isOpen ? 'block' : 'none' }}
    >
      <button
        type="button"
        ref={closeButtonRef}
        onClick={onClose}
        aria-label="Cerrar reproductor"
        className="absolute top-5 right-5 bg-[rgba(30,30,30,0.7)] text-white border-none text-2xl 
                   cursor-pointer rounded-full w-10 h-10 flex items-center justify-center
                   transition-colors hover:bg-[rgba(255,0,0,0.8)]
                   focus-visible:outline-white focus-visible:outline-3 focus-visible:outline-offset-2"
      >
        ✖
      </button>
      <iframe
        src={videoUrl}
        title={`Reproductor - ${videoTitle || 'Video'}`}
        className="w-full h-full border-0"
        allowFullScreen
        sandbox="allow-scripts allow-same-origin"
      ></iframe>
    </div>
  );
};

export default VideoPlayer;