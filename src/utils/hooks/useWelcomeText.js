import { useMemo, useEffect, useState } from "react";
import Userfront from "@userfront/toolkit";

const useWelcomeText = () => {
  const [showConfetti, setShowConfetti] = useState(false);

  const greeting = useMemo(() => {
    const now = new Date();
    const hours = now.getHours();
    const month = now.getMonth();
    const date = now.getDate();
    const name = Userfront.user.name;
    const firstName = name.trim().split(" ")[0];
    
    if (month === 5 && date === 27 && firstName === "Mike") {
      setShowConfetti(true);
      return "Happy Birthday Dad!";
    }
    
    let greetingText;
    if (hours >= 0 && hours < 5) {
      greetingText = "Go to sleep";
    } else if (hours >= 5 && hours < 12) {
      greetingText = "Good Morning";
    } else if (hours >= 12 && hours < 18) {
      greetingText = "Good Afternoon";
    } else if (hours >= 18 && hours < 24) {
      greetingText = "Good Evening";
    } else {
      greetingText = "Hello";
    }
    
    return firstName ? `${greetingText}, ${firstName}` : greetingText;
  }, []);

  // Confetti effect
  useEffect(() => {
    if (!showConfetti) return;

    const createConfetti = () => {
      const confettiContainer = document.createElement('div');
      confettiContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: 9999;
      `;
      document.body.appendChild(confettiContainer);

      const colors = ['#FF0080', '#00FF80', '#8000FF', '#FF8000', '#0080FF', '#FF4000', '#40FF00', '#FF0040', '#00FFFF', '#FFFF00', '#FF00FF', '#80FF80'];
      const shapes = ['rect', 'circle', 'triangle', 'diamond'];
      
      for (let i = 0; i < 200; i++) {
        const confettiPiece = document.createElement('div');
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const size = Math.random() * 8 + 6;
        
        let shapeStyles = '';
        switch(shape) {
          case 'circle':
            shapeStyles = `border-radius: 30%; width: ${size}px; height: ${size}px;`;
            break;
          case 'triangle':
            shapeStyles = `
              width: 0; 
              height: 0; 
              border-left: ${size/2}px solid transparent;
              border-right: ${size/2}px solid transparent;
              border-bottom: ${size}px solid ${colors[Math.floor(Math.random() * colors.length)]};
              background-color: transparent;
            `;
            break;
          case 'diamond':
            shapeStyles = `
              width: ${size}px; 
              height: ${size}px; 
              transform: rotate(45deg);
              border-radius: 2px;
            `;
            break;
          default:
            shapeStyles = `width: ${size}px; height: ${size * 0.6}px; border-radius: 1px;`;
        }
        
        confettiPiece.style.cssText = `
          position: absolute;
          ${shapeStyles}
          ${shape !== 'triangle' ? `background-color: ${colors[Math.floor(Math.random() * colors.length)]};` : ''}
          left: ${Math.random() * 100}vw;
          top: -10px;
          animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
          transform: rotate(${Math.random() * 360}deg);
        `;
        confettiContainer.appendChild(confettiPiece);
      }

      if (!document.getElementById('confetti-styles')) {
        const style = document.createElement('style');
        style.id = 'confetti-styles';
        style.textContent = `
          @keyframes confettiFall {
            from {
              transform: translateY(-10px) rotate(0deg);
              opacity: 1;
            }
            to {
              transform: translateY(100vh) rotate(720deg);
              opacity: 0;
            }
          }
        `;
        document.head.appendChild(style);
      }

      setTimeout(() => {
        document.body.removeChild(confettiContainer);
      }, 5000);
    };

    createConfetti();
    
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [showConfetti]);

  return greeting;
};

export default useWelcomeText;