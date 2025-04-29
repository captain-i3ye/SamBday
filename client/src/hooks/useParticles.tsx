import { useCallback } from "react";

interface ParticleOptions {
  count?: number;
  colors?: string[];
  duration?: number;
  size?: { min: number; max: number };
}

export const useParticles = () => {
  // Create particle effect for spells
  const createParticleEffect = useCallback((element: HTMLElement, options?: ParticleOptions) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const count = options?.count || 20;
    const colors = options?.colors || ['#E6B325', '#9683EC'];
    const duration = options?.duration || 1;
    const size = options?.size || { min: 2, max: 6 };
    
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-2 h-2 rounded-full bg-gold z-50 particles';
      document.body.appendChild(particle);
      
      const randomSize = Math.random() * (size.max - size.min) + size.min;
      particle.style.width = `${randomSize}px`;
      particle.style.height = `${randomSize}px`;
      
      // Random color
      const colorIndex = Math.floor(Math.random() * colors.length);
      particle.style.backgroundColor = colors[colorIndex];
      
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 100 + 50;
      const particleDuration = Math.random() * duration + 0.5;
      
      const destinationX = centerX + Math.cos(angle) * distance;
      const destinationY = centerY + Math.sin(angle) * distance;
      
      particle.style.left = `${centerX}px`;
      particle.style.top = `${centerY}px`;
      particle.style.opacity = '1';
      
      setTimeout(() => {
        particle.style.transition = `all ${particleDuration}s ease-out`;
        particle.style.left = `${destinationX}px`;
        particle.style.top = `${destinationY}px`;
        particle.style.opacity = '0';
        
        setTimeout(() => {
          particle.remove();
        }, particleDuration * 1000);
      }, 10);
    }
  }, []);

  // Create celebratory particles for final message
  const createCelebrationParticles = useCallback((container: HTMLElement, options?: ParticleOptions) => {
    const count = options?.count || 50;
    const colors = options?.colors || ['#E6B325', '#9683EC'];
    const duration = options?.duration || 3;
    const size = options?.size || { min: 2, max: 10 };
    
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full opacity-0';
      container.appendChild(particle);
      
      const randomSize = Math.random() * (size.max - size.min) + size.min;
      particle.style.width = `${randomSize}px`;
      particle.style.height = `${randomSize}px`;
      
      // Random color
      const colorIndex = Math.floor(Math.random() * colors.length);
      particle.style.backgroundColor = colors[colorIndex];
      
      const left = Math.random() * 100;
      const particleDuration = Math.random() * duration + 2;
      const delay = Math.random() * 3;
      
      particle.style.left = `${left}%`;
      particle.style.top = '0%';
      particle.style.opacity = '0';
      
      setTimeout(() => {
        particle.style.transition = `all ${particleDuration}s ease-out`;
        particle.style.transform = 'translateY(100vh)';
        particle.style.opacity = '0.8';
        
        setTimeout(() => {
          particle.style.opacity = '0';
          
          setTimeout(() => {
            particle.remove();
          }, 1000);
        }, particleDuration * 800);
      }, delay * 1000);
    }
  }, []);

  return {
    createParticleEffect,
    createCelebrationParticles
  };
};
