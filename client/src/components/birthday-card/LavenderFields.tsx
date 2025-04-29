import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import sakura_bg from "@/assets/photos/sakura_bg.jpg";



interface LavenderFieldsProps {
  onContinue: () => void;
  images: string[];
}

const LavenderFields = ({ onContinue, images }: LavenderFieldsProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="lavenderFields" className="min-h-screen relative flex flex-col items-center justify-center py-16 px-4">
      <div 
        className="absolute inset-0 bg-cover bg-center parallax" 
        style={{ backgroundImage: sakura_bg}}
      ></div>
      
      <div className="absolute inset-0 bg-[hsl(258,54%,14%)]/70"></div>
      
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
          <h2 className="font-cinzel text-[hsl(255,66%,87%)] text-5xl md:text-5xl mb-4">Dreams</h2>
          <p className="font-tangerine text-[hsl(39,67%,93%)] text-5xl md:text-4xl italic">
            Your favorite flower, like your soul, is beautiful and calming...
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div 
            className="bg-[hsl(283,77%,23%)]/70 p-6 rounded-lg shadow-xl hover:shadow-[hsl(255,66%,87%)]/50 transition-all duration-300"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="prose prose-invert max-w-none">
              <p className="first-letter:text-4xl first-letter:font-tangerine first-letter:mr-1 first-letter:float-left first-letter:text-[hsl(46,78%,52%)]">
              As we dream of sakura season and walking beneath cherry blossoms, I'm reminded of your favorite color, lavender. It's the color of the peace you bring just by being you – a quiet calm that feels like coming home.
              </p>
              <p className="mt-4">
              You're basically my personal sunshine, lighting up everything! 😉 Seriously though, on your Birthday, I just wanted to celebrate you and the incredible light you bring into my life. Forget magic tricks, you are the real magic that makes every day feel special. Happy Birthday!
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            {images.map((image, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <motion.div 
                    className="magical-image"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(150, 131, 236, 0.5)' }}
                    onClick={() => setSelectedImage(image)}
                  >
                    <img 
                      src={`${image}?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80`} 
                      alt={`Lavender image ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg bg-[hsl(258,54%,14%)] border-[hsl(255,66%,87%)]">
                  <div className="p-0">
                    <img 
                      src={`${image}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80`}
                      alt={`Lavender image ${index + 1}`}
                      className="w-full h-auto rounded-md"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </motion.div>
        </div>
        
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.button 
            className="font-cinzel bg-[hsl(255,66%,87%)] hover:bg-[hsl(255,66%,87%)]/80 text-[hsl(258,54%,14%)] px-8 py-3 rounded-full transform transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[hsl(46,78%,52%)]"
            onClick={onContinue}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Continue <i className="fas fa-chevron-down ml-2"></i>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default LavenderFields;
