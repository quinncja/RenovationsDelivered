import { useEffect, useRef } from 'react';
import { preloadImage, getCachedImage } from './imageCacheUtils';

function useImage(id) {
  const imageSrc = useRef(getCachedImage(id));

  useEffect(() => {
    let isMounted = true;

    const loadImage = () => {
      const imageData = getCachedImage(id);
      preloadImage(imageData).then((preloadedImage) => {
          if (isMounted) {
            imageSrc.current = preloadedImage;
          }
      });
    };

    loadImage();

    const interval = setInterval(loadImage, 2 * 60 * 1000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        loadImage();
      }
    };

    const handleFocus = () => {
      loadImage();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      isMounted = false;
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [id]);

  return imageSrc.current;
}

export default useImage;
