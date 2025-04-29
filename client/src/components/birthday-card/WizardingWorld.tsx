import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParticles } from "@/hooks/useParticles";

interface Message {
  id: number;
  spell: string;
  content: string;
  title: string;
}

interface WizardingWorldProps {
  onContinue: () => void;
  backgroundImage: string;
  messages: Message[];
}

const WizardingWorld = ({ onContinue, backgroundImage, messages = [] }: WizardingWorldProps) => {
  const [activeSpell, setActiveSpell] = useState<string | null>(null);
  const { createParticleEffect } = useParticles();

  // Spell circles data
  const spellCircles = [
    {
      spell: "lumos",
      icon: "fas fa-lightbulb",
      title: "Lumos",
      message: messages.find(m => m.spell === "lumos") || {
        id: 1,
        spell: "lumos",
        title: "The Light of My Life",
        content: "Just as Lumos illuminates the darkness, you bring light to my world every day. Your smile brightens even my darkest moments. On your birthday, I wish for your path to be filled with the warm glow of happiness and endless magical discoveries."
      }
    },
    {
      spell: "accio",
      icon: "fas fa-hand-sparkles",
      title: "Accio",
      message: messages.find(m => m.spell === "accio") || {
        id: 2,
        spell: "accio",
        title: "Accio Happiness!",
        content: "You've summoned my heart from the very first day we met. No magic could be stronger than what draws me to you. May your birthday summon all the joy, laughter, and love you deserve!"
      }
    },
    {
      spell: "revelio",
      icon: "fas fa-eye",
      title: "Revelio",
      message: messages.find(m => m.spell === "revelio") || {
        id: 3,
        spell: "revelio",
        title: "A Revealed Secret",
        content: "Revelio! Here's a secret I want to share: Every morning, I wake up grateful for another day with you in my life. Your birthday reveals another chapter in our story, and I can't wait to keep writing it with you."
      }
    }
  ];

  const castSpell = (spell: string, event: React.MouseEvent<HTMLDivElement>) => {
    // Create particle effect
    createParticleEffect(event.currentTarget);
    
    // Show spell result
    setTimeout(() => {
      setActiveSpell(spell);
    }, 800);
  };

  return (
    <section id="wizardingWorld" className="min-h-screen relative flex flex-col items-center justify-center py-16 px-4">
      <div 
        className="absolute inset-0 bg-cover bg-center parallax" 
        style={{ backgroundImage: `url('${backgroundImage}?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&h=900&q=80')` }}
      ></div>
      
      <div className="absolute inset-0 bg-[hsl(258,54%,14%)]/80"></div>
      
      <motion.div 
        className="container max-w-4xl mx-auto relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-cinzel text-[hsl(46,78%,52%)] text-4xl md:text-5xl mb-4">
            The Wizarding World Awaits
          </h2>
          <p className="font-tangerine text-[hsl(39,67%,93%)] text-3xl md:text-4xl italic">
            Cast a spell to reveal magical wishes...
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {spellCircles.map((circle, index) => (
            <motion.div 
              key={index}
              className="spell-circle text-center bg-[hsl(283,77%,23%)]/60 p-6 rounded-full border-2 border-[hsl(46,78%,52%)] aspect-square flex flex-col items-center justify-center cursor-pointer"
              data-spell={circle.spell}
              onClick={(e) => castSpell(circle.spell, e)}
              whileHover={{ 
                scale: 1.1, 
                boxShadow: '0 0 30px rgba(150, 131, 236, 0.8)',
                borderColor: 'rgba(150, 131, 236, 1)'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <i className={`${circle.icon} text-[hsl(46,78%,52%)] text-3xl mb-2`}></i>
              <h3 className="font-cinzel text-[hsl(255,66%,87%)] text-xl">{circle.title}</h3>
              <p className="text-[hsl(240,12%,85%)] text-sm mt-1">Click to cast</p>
            </motion.div>
          ))}
        </motion.div>
        
        <AnimatePresence>
          {activeSpell && (
            <motion.div 
              id="spellResults" 
              className="bg-[hsl(39,67%,93%)]/90 p-6 rounded-lg shadow-xl text-[hsl(283,77%,23%)] max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              {spellCircles.map((circle, index) => (
                circle.spell === activeSpell && (
                  <motion.div key={index}>
                    <h3 className="font-cinzel text-2xl mb-4 text-center">{circle.message.title}</h3>
                    <p className="mb-4">{circle.message.content.split('.')[0]}.</p>
                    <p>{circle.message.content.split('.').slice(1).join('.')}</p>
                  </motion.div>
                )
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button 
            className="font-cinzel bg-[hsl(46,78%,52%)] hover:bg-[hsl(46,78%,52%)]/80 text-[hsl(258,54%,14%)] px-8 py-3 rounded-full transform transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[hsl(255,66%,87%)] mt-4"
            onClick={onContinue}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Continue Your Magical Journey <i className="fas fa-broom ml-2"></i>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default WizardingWorld;
