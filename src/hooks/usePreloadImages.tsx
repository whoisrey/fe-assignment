import {useState, useEffect} from 'react';

interface ImageItem {
  imageUrl: string;
}

export const usePreloadImages = (imageItems: ImageItem[]) => {
  const [currentPromise, setCurrentPromise] = useState(null);

  useEffect(() => {
    if (!imageItems || imageItems.length === 0) {
      return;
    }

    const imagePromises = imageItems.map(item => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = item.imageUrl;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    const allPromise = Promise.all(imagePromises);

    setCurrentPromise(allPromise);

    allPromise
      .then(() => {
        setCurrentPromise(null);
      })
      .catch(error => {
        console.error('Image loading failed:', error);

        setCurrentPromise(null);
      });
  }, [imageItems]);

  if (currentPromise) {
    throw currentPromise;
  }
};
