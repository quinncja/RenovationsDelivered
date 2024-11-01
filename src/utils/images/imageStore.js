const imageMap = new Map();

const subscribers = new Map();

export const subscribe = (key, callback) => {
    if (!subscribers.has(key)) {
      subscribers.set(key, new Set());
    }
    subscribers.get(key).add(callback);
};

export const unsubscribe = (key, callback) => {
    if (subscribers.has(key)) {
      subscribers.get(key).delete(callback);
      if (subscribers.get(key).size === 0) {
        subscribers.delete(key);
      }
    }
};

const blankImage =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAgAAAAAAAD/AQA4IBAwADs=";

export const getImageMap = () =>{
    return imageMap;
}

export const setImage = (key, image, dependencies) => {
    imageMap.set(key, { image, dependencies });
    if (subscribers.has(key)) {
      subscribers.get(key).forEach(callback => callback());
    }
};

export const getImage = (key) => {
    const img = imageMap.get(key);
    if (img) {
      return img;
    }
    return { image: blankImage, dependencies: [] };
};

export const hasImage = (key) => {
  return imageMap.has(key);
};

export const preloadImage = (imageSrc) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => resolve(imageSrc);
    });
};


