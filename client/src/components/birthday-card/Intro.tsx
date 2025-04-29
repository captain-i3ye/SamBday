import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface IntroProps {
  onComplete: () => void;
  waxSealImage: string;
}

const Intro = ({ onComplete, waxSealImage }: IntroProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openLetter = () => {
    setIsOpen(true);
    setTimeout(() => {
      onComplete();
    }, 2500);
  };

  // Generate star field effect
  useEffect(() => {
    const starField = document.getElementById('starField');
    if (!starField) return;
    
    const numberOfStars = 100;
    
    for (let i = 0; i < numberOfStars; i++) {
      const star = document.createElement('div');
      star.classList.add('stars');
      
      const size = Math.random() * 3 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 5}s`;
      
      starField.appendChild(star);
    }
  }, []);

  return (
    <section id="intro" className="h-screen relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[hsl(258,54%,14%)] overflow-hidden" id="starField"></div>
      
      <motion.div 
        id="magicalLetter" 
        className={`magical-letter transform scale-75 w-[90%] max-w-lg mx-auto bg-[hsl(39,67%,93%)] rounded-lg p-8 shadow-2xl cursor-pointer relative z-10 ${isOpen ? 'open' : ''}`}
        onClick={openLetter}
        animate={isOpen ? { scale: 1.05 } : { scale: 0.75 }}
        transition={{ 
          type: "spring", 
          stiffness: 100, 
          damping: 10 
        }}
      >
        <div className="text-center">
          <div className="inline-block mb-2">
            <img 
              src={waxSealImage} 
              alt="Wax seal" 
              className="w-20 h-20 rounded-full mx-auto mb-2" 
            />
          </div>
            <h1 className="font-cinzel text-[hsl(283,77%,23%)] text-2xl md:text-3xl">
              A Magical Birthday Surprise For <span className="font-bold text-[hsl(46,78%,52%)] tracking-wide">Samraggi</span>
            </h1>
          <p className="font-tangerine text-[hsl(283,77%,23%)] text-3xl md:text-4xl mt-2">Tap to open</p>
          
          <div className="absolute -top-3 -right-3">
            <div className="animate-float">
              <i className="fas fa-feather text-[hsl(46,78%,52%)] text-xl"></i>
            </div>
          </div>
          <div className="absolute -bottom-3 -left-3">
            <div className="animate-float-delay-1">
              <i className="fas fa-moon text-[hsl(255,66%,87%)] text-xl"></i>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Intro;
