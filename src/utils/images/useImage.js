import { useEffect, useState } from "react";
import { getImage, preloadImage, subscribe, unsubscribe} from "./imageStore";

function useImage(id) {
  const [imageSrc, setImageSrc] = useState(() => {
    const initialImageData = getImage(id);
    return initialImageData.image
  });

  useEffect(() => {
    let isMounted = true;

    const loadImage = () => {
      const imageData = getImage(id);
      const src = imageData.image;
      preloadImage(src).then((preloadedImage) => {
        if (isMounted) {
          setImageSrc(preloadedImage);
        }
      });
    };

    loadImage();

    const interval = setInterval(loadImage, 2 * 60 * 1000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        loadImage();
      }
    };

    const handleFocus = () => {
      loadImage();
    };

    const onImageUpdate = () => {
      console.log("image updated")
      loadImage();
    };

    subscribe(id, onImageUpdate);

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);

    return () => {
      isMounted = false;
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
      unsubscribe(id, onImageUpdate);
    };
  }, [id]);

  return imageSrc;
}

export default useImage;
