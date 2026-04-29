import { useState, useEffect } from 'react';
import { useUIContext } from '../context/UIContext';

export function useAssetLoader(): boolean {
  const { theme } = useUIContext();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const assetsToLoad = theme.assets || [];

    if (assetsToLoad.length === 0) {
      setIsLoaded(true);
      return;
    }

    let loadedCount = 0;

    const onLoad = () => {
      loadedCount++;
      if (loadedCount === assetsToLoad.length && isMounted) {
        setIsLoaded(true);
      }
    };

    const onError = (e: string | Event) => {
      console.error(`Failed to load asset:`, e);
      // Even if one fails, we should probably still try to render,
      // or at least not block forever. For now, just count it.
      onLoad();
    };

    assetsToLoad.forEach((assetUrl) => {
      const img = new Image();
      img.onload = onLoad;
      img.onerror = onError;
      img.src = assetUrl;
    });

    return () => {
      isMounted = false;
    };
  }, [theme.assets]);

  return isLoaded;
}
