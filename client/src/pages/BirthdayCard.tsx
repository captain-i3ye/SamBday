import { useState, useEffect } from "react";
import Intro from "@/components/birthday-card/Intro";
import Welcome from "@/components/birthday-card/Welcome";
import LavenderFields from "@/components/birthday-card/LavenderFields";
import WizardingWorld from "@/components/birthday-card/WizardingWorld";
import MemoryGallery from "@/components/birthday-card/MemoryGallery";
import BirthdayMessage from "@/components/birthday-card/BirthdayMessage";
import Preloader from "@/components/birthday-card/Preloader";
import MusicToggle from "@/components/birthday-card/MusicToggle";
import { queryClient } from "@/lib/queryClient";
import { useQuery } from "@tanstack/react-query";
import audioSrc from "@/assets/harry_potter_bgm.mp3";
import special_moments0 from "@/assets/photos/special_moments/special_moments0.jpg";
import sillyTimes0 from "@/assets/photos/silly_times/silly_times0.jpeg";
import ourAdventure0 from "@/assets/photos/our_adventure/our_adventure0.jpg";
import date0 from "@/assets/photos/date/date0.jpeg";
import wizardingbg from "@/assets/photos/wizardin_bg.png";
import l1 from "@/assets/photos/lav/l1.jpg";
import l2 from "@/assets/photos/lav/l2.jpg";
import l3 from "@/assets/photos/lav/l3.jpeg";
import l4 from "@/assets/photos/lav/l4.jpg";

const BirthdayCard = () => {
  const [currentSection, setCurrentSection] = useState("intro");
  const [loading, setLoading] = useState(true);

  // Fetch messages from the server
  const { data: messages } = useQuery({
    queryKey: ["/api/messages"],
    staleTime: Infinity,
  });

  // Preloader timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const navigateToSection = (nextSection: string) => {
    setCurrentSection(nextSection);

    // Add scroll to top behavior 
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Audio Element
  
  // const audioSrc = "client/src/assets/harry_potter_bgm.mp3";

  // Images for sections
  const images = {
    lavenderFields: [
      l1,
      l2,
      l3,
      l4
    ],
    // memories front carousel images
    memories: [
      date0,
      ourAdventure0,
      special_moments0,
      sillyTimes0
    ],
    wizardingElements: [
      "https://images.unsplash.com/photo-1600356381284-f331cdd4a9c9", // Wax seal
      "https://images.unsplash.com/photo-1526047932273-341f2a7631f9", // Decorative element
      wizardingbg // Background for wizarding world
    ]
  };

  return (
    <div className="relative bg-[hsl(258,54%,14%)] font-lato text-[hsl(39,67%,93%)] overflow-x-hidden">
      {loading && <Preloader />}
      
      <MusicToggle audioSrc={audioSrc} />
      
      {currentSection === "intro" && (
        <Intro 
          onComplete={() => navigateToSection("welcome")} 
          waxSealImage={images.wizardingElements[0]} 
        />
      )}
      
      {currentSection === "welcome" && (
        <Welcome onContinue={() => navigateToSection("lavenderFields")} />
      )}
      
      {currentSection === "lavenderFields" && (
        <LavenderFields 
          onContinue={() => navigateToSection("wizardingWorld")} 
          images={images.lavenderFields}
        />
      )}
      
      {currentSection === "wizardingWorld" && (
        <WizardingWorld 
          onContinue={() => navigateToSection("memoryGallery")} 
          backgroundImage={images.wizardingElements[2]}
          messages={messages || []}
        />
      )}
      
      {currentSection === "memoryGallery" && (
        <MemoryGallery 
          onContinue={() => navigateToSection("birthdayMessage")} 
          images={images.memories}
        />
      )}
      
      {currentSection === "birthdayMessage" && (
        <BirthdayMessage 
          onReplay={() => {
            setCurrentSection("intro");
            window.location.reload();
          }}
          decorativeImage={images.wizardingElements[1]}
          finalMessage={messages?.[0]?.content || "Happy Birthday, My Love!"}
        />
      )}
    </div>
  );
};

export default BirthdayCard;
