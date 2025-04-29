import { motion } from "framer-motion";

const Preloader = () => {
  return (
    <motion.div 
      id="preloader" 
      className="fixed inset-0 bg-[hsl(258,54%,14%)] z-50 flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 2 }}
    >
      <div className="text-center">
        <div className="w-20 h-20 border-4 border-[hsl(46,78%,52%)] rounded-full border-t-transparent animate-spin mx-auto mb-4"></div>
        <p className="font-cinzel text-[hsl(46,78%,52%)] text-xl">Preparing your magical experience...</p>
      </div>
    </motion.div>
  );
};

export default Preloader;
