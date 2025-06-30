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
    
    if (month === 5 && date === 30 && firstName === "Mike") {
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

  useEffect(() => {
    if (!showConfetti) return;

    const confettiContainer = document.createElement('div');
    confettiContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 9999;
      overflow: hidden;
    `;
    document.body.appendChild(confettiContainer);

    const colors = [
      '#4F46E5', // Indigo
      '#059669', // Emerald
      '#DC2626', // Red
      '#7C3AED', // Violet
      '#EA580C', // Orange
      '#0891B2', // Cyan
      '#BE185D', // Pink
      '#65A30D', // Lime
      '#1F2937', // Gray
      '#FCD34D'  // Amber
    ];

    const createConfettiBurst = (startX, startY, side = 'left', intensity = 1) => {
      const particleCount = Math.floor(50 * intensity); 
      
      for (let i = 0; i < particleCount; i++) {
        const confettiPiece = document.createElement('div');
        const size = Math.random() * 6 + 4;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        const shapes = ['rectangle', 'square', 'circle'];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        
        let shapeStyles = '';
        switch(shape) {
          case 'circle':
            shapeStyles = `
              width: ${size}px; 
              height: ${size}px; 
              border-radius: 50%;
            `;
            break;
          case 'square':
            shapeStyles = `
              width: ${size}px; 
              height: ${size}px; 
              border-radius: 1px;
            `;
            break;
          default: 
            shapeStyles = `
              width: ${size * 1.5}px; 
              height: ${size * 0.8}px; 
              border-radius: 2px;
            `;
        }

        let baseAngle;
        if (side === 'left') {
          baseAngle = (Math.PI / 4) + (Math.random() * Math.PI / 6); 
        } else {
          baseAngle = (Math.PI * 7/12) + (Math.random() * Math.PI / 6); 
        }
        
        const velocity = Math.random() * 500 + 100; 
        const gravity = 300; 
        const drag = 0.999; 
        const spin = (Math.random() - 0.5) * 900; 
        
        confettiPiece.style.cssText = `
          position: absolute;
          ${shapeStyles}
          background-color: ${color};
          left: ${startX}px;
          top: ${startY}px;
          transform: rotate(${Math.random() * 360}deg);
          opacity: 0.9;
          box-shadow: 0 2px 4px rgba(0,0,0,0.15);
        `;

        const duration = Math.random() * 2000 + 6000; 
        const startTime = performance.now();
        
        const animate = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = elapsed / duration;
          
          if (progress >= 1) {
            confettiPiece.remove();
            return;
          }
          
          const t = elapsed / 1000; 
          
          const vx = velocity * Math.cos(baseAngle);
          const vy = velocity * Math.sin(baseAngle);
          
          const currentVx = vx * (drag ** (t * 10));
          
          const x = currentVx * t;
          const y = vy * t - 0.5 * gravity * t * t;
          
          const opacity = progress > 0.6 ? (1 - progress) * 2.5 : 0.9;
          
          confettiPiece.style.transform = `
            translate(${x}px, ${-y}px) 
            rotate(${spin * progress}deg)
          `;
          confettiPiece.style.opacity = Math.max(0, opacity);
          
          if (startY - y > window.innerHeight + 100 || Math.abs(x) > window.innerWidth) {
            confettiPiece.remove();
            return;
          }
          
          requestAnimationFrame(animate);
        };
        
        confettiContainer.appendChild(confettiPiece);
        requestAnimationFrame(animate);
      }
    };

    const leftCorner = { x: 50, y: window.innerHeight - 50 };
    const rightCorner = { x: window.innerWidth - 50, y: window.innerHeight - 50 };

    createConfettiBurst(leftCorner.x, leftCorner.y, 'left', 1.5);
    createConfettiBurst(rightCorner.x, rightCorner.y, 'right', 1.5);

    const bursts = [800, 1600, 2400, 3200, 4000, 4800];
    
    bursts.forEach((delay, index) => {
      const intensity = 1.2 - (index * 0.1);
      
      setTimeout(() => {
        createConfettiBurst(leftCorner.x, leftCorner.y, 'left', Math.max(0.6, intensity));
      }, delay);
      
      setTimeout(() => {
        createConfettiBurst(rightCorner.x, rightCorner.y, 'right', Math.max(0.6, intensity));
      }, delay + 50);
    });

    setTimeout(() => {
      createConfettiBurst(leftCorner.x, leftCorner.y, 'left', 1.5);
      createConfettiBurst(rightCorner.x, rightCorner.y, 'right', 1.5);
    }, 5500);

    const cleanup = setTimeout(() => {
      if (document.body.contains(confettiContainer)) {
        confettiContainer.style.transition = 'opacity 1s ease-out';
        confettiContainer.style.opacity = '0';
        
        setTimeout(() => {
          if (document.body.contains(confettiContainer)) {
            document.body.removeChild(confettiContainer);
          }
        }, 1000);
      }
      setShowConfetti(false);
    }, 10000);

    return () => {
      clearTimeout(cleanup);
      if (document.body.contains(confettiContainer)) {
        document.body.removeChild(confettiContainer);
      }
    };
  }, [showConfetti]);

  return greeting;
};

export default useWelcomeText;