export const blankImage =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAgAAAAAAAD/AQA4IBAwADs=";

export const preloadImage = (imageSrc) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => resolve(imageSrc);
  });
};

export const cacheImage = async (id, imageSrc) => {
  const preloadedImage = await preloadImage(imageSrc);
  localStorage.setItem(id, preloadedImage);
};

export const getCachedImage = (id) => {
  const storedImage = localStorage.getItem(id);
  return storedImage || null;
};

export const deleteImageCache = (id) => {
  localStorage.removeItem(id);
};
