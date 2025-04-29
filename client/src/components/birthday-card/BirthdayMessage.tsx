import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useParticles } from "@/hooks/useParticles";

interface BirthdayMessageProps {
  onReplay: () => void;
  decorativeImage: string;
  finalMessage: string;
}

const BirthdayMessage = ({ onReplay, decorativeImage, finalMessage }: BirthdayMessageProps) => {
  const [messageRevealed, setMessageRevealed] = useState(false);
  const [particles, setParticles] = useState<HTMLDivElement[]>([]);
  const particlesContainerRef = useRef<HTMLDivElement>(null);
  const { createCelebrationParticles } = useParticles();
  
  // Reveal the message after mouse movement or timeout
  useEffect(() => {
    const revealMessage = () => {
      if (!messageRevealed) {
        setMessageRevealed(true);
        
        // Create celebratory particles
        if (particlesContainerRef.current) {
          createCelebrationParticles(particlesContainerRef.current);
        }
      }
    };
    
    // Set up event listener for mouse movement
    document.addEventListener("mousemove", revealMessage);
    
    // Also reveal after a timeout if no mouse movement
    const timer = setTimeout(revealMessage, 5000);
    
    return () => {
      document.removeEventListener("mousemove", revealMessage);
      clearTimeout(timer);
    };
  }, [messageRevealed, createCelebrationParticles]);

  return (
    <section id="birthdayMessage" className="min-h-screen relative flex flex-col items-center justify-center py-16 px-4 wand-cursor">
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1564648351416-3eec9f3e85de?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&h=900&q=80')" }}
      ></div>
      
      <div className="absolute inset-0 bg-[hsl(258,54%,14%)]/90"></div>
      <div id="particles" ref={particlesContainerRef} className="absolute inset-0 particles"></div>
      
      <motion.div 
        className="container max-w-2xl mx-auto relative z-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <img 
            src={`${decorativeImage}?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80`}
            alt="Decorative element" 
            className="w-24 h-24 mx-auto rounded-full border-4 border-[hsl(46,78%,52%)]" 
          />
        </motion.div>
        
        <motion.div 
          id="finalMessage" 
          className="bg-[hsl(283,77%,23%)]/80 p-8 rounded-lg border-2 border-[hsl(255,66%,87%)] shadow-2xl shadow-[hsl(255,66%,87%)]/30 mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={messageRevealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ 
            type: "spring", 
            stiffness: 100, 
            damping: 15,
            delay: 0.4
          }}
        >
          <h2 className="font-cinzel text-[hsl(46,78%,52%)] text-3xl md:text-4xl mb-4">Happy Birthday, My Love</h2>
          
          <p className="font-lato text-[hsl(39,67%,93%)] leading-relaxed mb-4">
            In this realm of magic and wonder, my love for you shines brighter than any Lumos spell. Your soul, gentle as lavender fields and brave as a true Gryffindor, has enchanted me from the start.
          </p>
          
          <p className="font-lato text-[hsl(39,67%,93%)] leading-relaxed mb-6">
            {finalMessage}
          </p>
          
          <p className="font-tangerine text-[hsl(255,66%,87%)] text-3xl md:text-4xl">
            All my love, always and forever.
          </p>
        </motion.div>
        
        <motion.div 
          id="revealInstructions" 
          className="text-[hsl(39,67%,93%)] mb-6"
          initial={{ opacity: 1 }}
          animate={messageRevealed ? { opacity: 0, display: 'none' } : { opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p>Wave your wand (move your cursor) over the parchment to reveal your special message...</p>
        </motion.div>
        
        <motion.button 
          id="replayButton" 
          className="font-cinzel bg-[hsl(46,78%,52%)] hover:bg-[hsl(46,78%,52%)]/80 text-[hsl(258,54%,14%)] px-8 py-3 rounded-full transform transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[hsl(255,66%,87%)]"
          onClick={onReplay}
          initial={{ opacity: 0, display: 'none' }}
          animate={messageRevealed ? { opacity: 1, display: 'block' } : { opacity: 0, display: 'none' }}
          transition={{ duration: 0.5, delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Experience Again <i className="fas fa-redo ml-2"></i>
        </motion.button>
      </motion.div>
    </section>
  );
};

export default BirthdayMessage;
