import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { 
  WandSvg, GlassesSvg, LightningBoltSvg, SnowflakeSvg, 
  DeathlyHallowsSvg, CastleSvg, OwlSvg, PotionSvg 
} from "./HarryPotterSvgs";
import { harryPotterQuotes, specialPotterMessages } from "./HarryPotterQuotes";
import special_moments1 from "@/assets/photos/special_moments/special_moments1.jpg"
import special_moments2 from "@/assets/photos/special_moments/special_moments2.jpg";
import special_moments3 from "@/assets/photos/special_moments/special_moments3.jpg";
import silly_times2 from "@/assets/photos/silly_times/silly_times2.jpg";
import silly_times1 from "@/assets/photos/silly_times/silly_times1.jpg";
import silly_times3 from "@/assets/photos/silly_times/silly_times3.jpg";
import our_adventure1 from "@/assets/photos/our_adventure/our_adventure1.jpeg";
import our_adventure2 from "@/assets/photos/our_adventure/our_adventure2.jpeg";
import our_adventure3 from "@/assets/photos/our_adventure/our_adventure3.jpeg";
import date1 from "@/assets/photos/date/date1.jpeg";
import date2 from "@/assets/photos/date/date2.jpg";
import date3 from "@/assets/photos/date/date3.jpg";




interface MemoryGalleryProps {
  onContinue: () => void;
  images: string[];
}

const MemoryGallery = ({ onContinue, images }: MemoryGalleryProps) => {
  const [openDialog, setOpenDialog] = useState<number | null>(null);
  const [randomQuote, setRandomQuote] = useState(harryPotterQuotes[0]);
  const [potterMessage, setPotterMessage] = useState(specialPotterMessages[0]);
  
  // Select random Harry Potter quotes on mount and when dialog opens
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * harryPotterQuotes.length);
    setRandomQuote(harryPotterQuotes[randomIndex]);
    
    const messageIndex = Math.floor(Math.random() * specialPotterMessages.length);
    setPotterMessage(specialPotterMessages[messageIndex]);
  }, [openDialog]);

  // Memory cards data
  const memoryCards = [
    {
      frontIcon: "fas fa-camera",
      frontTitle: "Our First Date",
      frontSubtitle: "Click to explore",
      images: [
        images[0],
        date1,
        date2,
        date3
      ],
      backText: "That magical evening when time seemed to stand still."
    },
    {
      frontIcon: "fas fa-map-marked-alt",
      frontTitle: "Our Adventure",
      frontSubtitle: "Click to explore",
      images: [
        images[1],
        our_adventure1,
        our_adventure2,
        our_adventure3
      ],
      backText: "Exploring new paths together, hand in hand."
    },
    {
      frontIcon: "fas fa-gift",
      frontTitle: "Special Moments",
      frontSubtitle: "Click to explore",
      images: [
        images[2],
        special_moments1,
        special_moments2,
        special_moments3,
      ],
      backText: "Those little celebrations that make life extraordinary."
    },
    {
      frontIcon: "fas fa-laugh-beam",
      frontTitle: "Silly Times",
      frontSubtitle: "Click to explore",
      images: [
        images[3],
        silly_times1,
        silly_times2,
        silly_times3
      ],
      backText: "Your laughter is my favorite sound in the world."
    }
  ];

  return (
    <section id="memoryGallery" className="min-h-screen relative flex flex-col items-center justify-center py-16 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(258,54%,14%)] to-[hsl(283,77%,23%)]"></div>
      
      {/* Harry Potter floating SVG elements */}
      <div className="absolute top-10 left-10 opacity-50"><WandSvg /></div>
      <div className="absolute top-20 right-20 opacity-50"><GlassesSvg /></div>
      <div className="absolute bottom-20 left-20 opacity-50"><LightningBoltSvg /></div>
      <div className="absolute bottom-10 right-10 opacity-50"><DeathlyHallowsSvg /></div>
      <div className="absolute top-1/2 left-5 opacity-50"><SnowflakeSvg /></div>
      <div className="absolute top-1/3 right-5 opacity-50"><OwlSvg /></div>
      <div className="absolute bottom-1/3 left-5 opacity-50"><PotionSvg /></div>
      <div className="absolute bottom-1/4 right-1/3 opacity-50"><CastleSvg /></div>
      
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
          <h2 className="font-cinzel text-[hsl(46,78%,52%)] text-4xl md:text-5xl mb-4">Our Magical Timeline</h2>
          <p className="font-tangerine text-[hsl(39,67%,93%)] text-3xl md:text-4xl italic">
            Click each moment to reveal our magical journey together...
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          initial="hidden"
          animate="show"
        >
          {memoryCards.map((card, index) => (
            <motion.div 
              key={index}
              className="memory-box bg-[hsl(255,66%,87%)]/30 rounded-lg overflow-hidden shadow-lg border-2 border-[hsl(46,78%,52%)]/50 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(150,131,236,0.6)]"
              onClick={() => setOpenDialog(index)}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
            >
              <div className="flex flex-col items-center justify-center p-6 h-64">
                <div className="text-center">
                  <i className={`${card.frontIcon} text-[hsl(46,78%,52%)] text-3xl mb-3 animate-pulse-soft`}></i>
                  <h3 className="font-cinzel text-[hsl(39,67%,93%)] text-xl">{card.frontTitle}</h3>
                  <p className="font-tangerine text-[hsl(240,12%,85%)] text-2xl mt-2">{card.frontSubtitle}</p>
                  
                  <div className="flex justify-center mt-4 space-x-2">
                    <div className="w-2 h-2 rounded-full bg-[hsl(46,78%,52%)] animate-pulse-soft"></div>
                    <div className="w-2 h-2 rounded-full bg-[hsl(46,78%,52%)] animate-pulse-soft animation-delay-200"></div>
                    <div className="w-2 h-2 rounded-full bg-[hsl(46,78%,52%)] animate-pulse-soft animation-delay-400"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Carousels in Dialog */}
        {openDialog !== null && (
          <Dialog open={openDialog !== null} onOpenChange={() => setOpenDialog(null)}>
            <DialogContent className="bg-[hsl(39,67%,93%)] border-2 border-[hsl(46,78%,52%)] max-w-3xl relative overflow-hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6">
              <button 
                onClick={() => setOpenDialog(null)}
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-[hsl(255,66%,87%)] text-[hsl(258,54%,14%)] flex items-center justify-center hover:bg-[hsl(46,78%,52%)] transition-colors z-20"
                aria-label="Close dialog"
              >
                <i className="fas fa-times"></i>
              </button>
              <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-[hsl(255,66%,87%)]/30 backdrop-blur-sm"></div>
              <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-[hsl(255,66%,87%)]/30 backdrop-blur-sm"></div>
              
              <DialogTitle className="font-cinzel text-[hsl(258,54%,14%)] text-2xl relative z-10 flex items-center gap-2">
                <i className={`${memoryCards[openDialog].frontIcon} text-[hsl(46,78%,52%)] animate-pulse-soft`}></i>
                <span className="magical-text">{memoryCards[openDialog].frontTitle}</span>
              </DialogTitle>
              
              <DialogDescription className="text-[hsl(258,54%,14%)]/80 font-lato italic relative z-10">
                "{memoryCards[openDialog].backText}"
              </DialogDescription>
              
              {/* Harry Potter Quote */}
              <div className="mt-4 mb-2 p-3 bg-[hsl(255,66%,87%)]/20 rounded-lg border border-[hsl(46,78%,52%)]/30 relative z-10">
                <p className="font-cinzel text-[hsl(258,54%,14%)] italic mb-1 text-sm">"{randomQuote.quote}"</p>
                <p className="text-right text-[hsl(258,54%,14%)]/60 text-xs">— {randomQuote.character}</p>
              </div>
              
              <div className="py-4">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[hsl(255,66%,87%)] via-[hsl(46,78%,52%)] to-[hsl(255,66%,87%)] rounded-xl opacity-70 blur-md"></div>
                  <Carousel className="w-full relative">
                    <CarouselContent>
                      {memoryCards[openDialog].images.map((image, imgIndex) => (
                        <CarouselItem key={imgIndex} className="basis-full">
                          <div className="p-1">
                            <div className="border-2 border-lavender rounded-xl overflow-hidden h-[700px] shadow-lg">
                              <motion.img 
                                src={`${image}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80`}
                                alt={`${memoryCards[openDialog].frontTitle} ${imgIndex+1}`} 
                                className="w-full h-full object-cover"
                                initial={{ scale: 1 }}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.5 }}
                              />
                            </div>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <div className="absolute inset-y-0 left-0 flex items-center">
                      <CarouselPrevious className="bg-lavender/80 border-none text-wizarding hover:bg-lavender hover:scale-110 transition-transform" />
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <CarouselNext className="bg-lavender/80 border-none text-wizarding hover:bg-lavender hover:scale-110 transition-transform" />
                    </div>
                  </Carousel>
                </div>
                
                <div className="flex justify-center mt-4 items-center space-x-4">
                  <div className="flex space-x-2">
                    {memoryCards[openDialog].images.map((_, dotIndex) => (
                      <div 
                        key={dotIndex} 
                        className={`w-2 h-2 rounded-full bg-[hsl(46,78%,52%)] animate-pulse-soft ${
                          dotIndex === 1 ? 'animation-delay-200' : dotIndex === 2 ? 'animation-delay-400' : ''
                        }`}
                      ></div>
                    ))}
                  </div>
                  
                  <div className="font-cinzel text-[hsl(258,54%,14%)] text-sm bg-[hsl(255,66%,87%)]/20 px-3 py-1 rounded-full border border-[hsl(46,78%,52%)]/30">
                    <i className="fas fa-camera-retro mr-1 text-[hsl(46,78%,52%)]"></i>
                    <span>{memoryCards[openDialog].images.length} Magical Moments</span>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
        
        <motion.div 
          className="text-center"
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
            Continue to Your Message <i className="fas fa-scroll ml-2"></i>
          </motion.button>
          
          <motion.div 
            className="mt-8 max-w-md mx-auto p-4 rounded-lg bg-[hsl(255,66%,87%)]/10 border border-[hsl(46,78%,52%)]/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className="flex items-center justify-center mb-2 gap-2">
              <WandSvg />
              <span className="font-cinzel text-[hsl(46,78%,52%)] text-sm uppercase tracking-wider">Magical Message</span>
              <WandSvg />
            </div>
            <p className="text-[hsl(39,67%,93%)] font-tangerine text-4xl italic ">{potterMessage}</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default MemoryGallery;
