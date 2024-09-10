
export const blankImage =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAgAAAAAAAD/AQA4IBAwADs="; // Transparent 1x1 pixel image


export const preloadImage = (imageSrc) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imageSrc;
      
      img.onload = () => resolve(imageSrc); 
      
      img.onerror = (err) => {
        console.error('Image failed to load:', err); 
        resolve(blankImage);
      };
    });
  };

export const cacheImage = async (id, imageSrc) => {
  const preloadedImage = await preloadImage(imageSrc);
  localStorage.setItem(id, preloadedImage);
};

export const getCachedImage = (id) => {
  const storedImage = localStorage.getItem(id);
  if (storedImage) {
    return storedImage;
  }
  return null;
};

export const deleteImageCache = (id) => {
  localStorage.removeItem(id);
};