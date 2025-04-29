import { useState, useRef } from "react";
import { motion } from "framer-motion";

interface MusicToggleProps {
  audioSrc: string;
}

const MusicToggle = ({ audioSrc }: MusicToggleProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-40">
      <motion.button 
        id="musicToggle" 
        className="bg-[hsl(283,77%,23%)]/50 hover:bg-[hsl(283,77%,23%)] rounded-full p-3 text-[hsl(46,78%,52%)]" 
        aria-label="Toggle background music"
        onClick={toggleMusic}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <i className={`fas fa-volume-${isPlaying ? 'up' : 'mute'} text-xl`}></i>
      </motion.button>
      <audio id="bgMusic" loop ref={audioRef}>
        <source src={audioSrc} type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default MusicToggle;
