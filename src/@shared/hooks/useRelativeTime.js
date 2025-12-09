import { useEffect, useState } from "react";

export function getRelativeTime(isoDateString) {
  const date = new Date(isoDateString);
  const now = new Date();
  
  const chicagoDate = new Date(date.toLocaleString('en-US', { timeZone: 'America/Chicago' }));
  const chicagoNow = new Date(now.toLocaleString('en-US', { timeZone: 'America/Chicago' }));
  
  const diffMs = chicagoNow - chicagoDate;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  
  const hour = chicagoDate.getHours();

  
  if (diffMinutes < 1) {
    return 'Just now';
  }
  
  if (diffMinutes < 60) {
    return diffMinutes === 1 ? '1 minute ago' : `${diffMinutes} minutes ago`;
  }
  
  if (diffDays === 0 && chicagoDate.getDate() === chicagoNow.getDate()) {
    if (diffHours === 1) {
      return '1 hour ago';
    }
    if (diffHours < 24) {
      return `${diffHours} hours ago`;
    }
  }
  
  if (diffDays === 1 || 
      (diffDays === 0 && chicagoDate.getDate() !== chicagoNow.getDate())) {
    return `Yesterday`;
  }
  
  if (diffDays >= 2 && diffDays <= 6) {
    const dayNames = ['Two', 'Three', 'Four', 'Five', 'Six'];
    return `${dayNames[diffDays - 2]} days ago`;
  }
  
  if (diffDays >= 7 && diffDays < 14) {
    return 'Over a week ago';
  }
  
  if (diffDays >= 14 && diffDays < 21) {
    const weeks = Math.floor(diffDays / 7);
    return weeks === 2 ? 'Two weeks ago' : `${weeks} weeks ago`;
  }

if (diffDays >= 21 && diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return weeks === 3 ? 'Three weeks ago' : `${weeks} weeks ago`;
  }
  
  
  if (diffDays >= 30) {
    const months = Math.floor(diffDays / 30);
    if (months === 1) return 'Over a month ago';
    if (months < 12) return `${months} months ago`;
    
    const years = Math.floor(diffDays / 365);
    return years === 1 ? 'Over a year ago' : `${years} years ago`;
  }
  
  return 'A long time ago';
}


export function useRelativeTime(isoDateString) {
  const [relativeTime, setRelativeTime] = useState(() => getRelativeTime(isoDateString));
  
  useEffect(() => {
    setRelativeTime(getRelativeTime(isoDateString));
    
    const interval = setInterval(() => {
      setRelativeTime(getRelativeTime(isoDateString));
    }, 60000); 
    
    return () => clearInterval(interval);
  }, [isoDateString]);
  
  return relativeTime;
}

export default useRelativeTime;