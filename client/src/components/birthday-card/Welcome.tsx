import { useEffect } from "react";
import { motion } from "framer-motion";

interface WelcomeProps {
  onContinue: () => void;
}

const Welcome = ({ onContinue }: WelcomeProps) => {
  // Staggered animation for each element
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      }
    }
  };

  // Journey Steps Content
  const journeySteps = [
    {
      icon: "fas fa-wand-sparkles",
      title: "Magical Memories",
      description: "Relive our most enchanting moments together."
    },
    {
      icon: "fas fa-hat-wizard",
      title: "Spellbinding Surprises",
      description: "Discover hidden secrets with a touch of your wand."
    },
    {
      icon: "fas fa-heart",
      title: "Loving Words",
      description: "Messages that come straight from the heart."
    }
  ];
  
  return (
    <section id="welcome" className="min-h-screen relative flex flex-col items-center justify-center py-16 px-4">
      <div className="absolute inset-0 bg-cover bg-center parallax opacity-30" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&h=900&q=80')" }}></div>
      
      <motion.div 
        className="container max-w-4xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center mb-12" variants={childVariants}>
          <h2 className="font-cinzel text-[hsl(46,78%,52%)] text-4xl md:text-5xl mb-4">
            Happy Birthday, My Love!
          </h2>
          <p className="font-tangerine text-[hsl(39,67%,93%)] text-3xl md:text-4xl italic">
            A magical journey awaits you...
          </p>
        </motion.div>
        
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" variants={childVariants}>
          {journeySteps.map((step, index) => (
            <motion.div 
              key={index}
              className="bg-[hsl(283,77%,23%)]/80 p-6 rounded-lg shadow-xl hover:shadow-[hsl(255,66%,87%)]/50 transition-all duration-300 transform hover:-translate-y-2"
              whileHover={{ y: -5 }}
            >
              <div className="text-center mb-4">
                <i className={`${step.icon} text-[hsl(46,78%,52%)] text-4xl`}></i>
              </div>
              <h3 className="font-cinzel text-[hsl(255,66%,87%)] text-xl mb-2 text-center">{step.title}</h3>
              <p className="text-[hsl(240,12%,85%)] text-center">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div className="text-center mt-12" variants={childVariants}>
          <motion.button 
            className="font-cinzel bg-[hsl(255,66%,87%)] hover:bg-[hsl(255,66%,87%)]/80 text-[hsl(258,54%,14%)] px-8 py-3 rounded-full transform transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[hsl(46,78%,52%)]"
            onClick={onContinue}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Begin Your Journey <i className="fas fa-chevron-down ml-2"></i>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Welcome;
