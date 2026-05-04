import React, { useState, useEffect } from 'react';
import type { Theme } from '../theme/types';
import { UIProvider, useUIContext } from '../context/UIContext';
import { useAssetLoader } from '../hooks/useAssetLoader';

interface PanelProps {
  theme?: Theme;
  designWidth?: number;
  designHeight?: number;
  useSafeArea?: boolean;
  overlayMode?: boolean;
  children: React.ReactNode;
}

const InnerPanel: React.FC<Omit<PanelProps, 'theme'>> = ({
  designWidth = 1920,
  designHeight = 1080,
  useSafeArea = false,
  overlayMode = false,
  children,
}) => {
  const isLoaded = useAssetLoader();
  const { scale, setScale } = useUIContext();

  useEffect(() => {
    const handleResize = () => {
      const scaleX = window.innerWidth / designWidth;
      const scaleY = window.innerHeight / designHeight;
      // Use the minimum scale to fit everything (letterbox/pillarbox approach)
      setScale(Math.min(scaleX, scaleY));
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [designWidth, designHeight]);

  if (!isLoaded) {
    return null; // Or a loading spinner
  }

  const containerStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: overlayMode ? 'transparent' : '#000',
    pointerEvents: overlayMode ? 'none' : 'auto',

    // Inject safe area variables at the root
    ...(useSafeArea && {
      '--safe-top': 'env(safe-area-inset-top, 0px)',
      '--safe-right': 'env(safe-area-inset-right, 0px)',
      '--safe-bottom': 'env(safe-area-inset-bottom, 0px)',
      '--safe-left': 'env(safe-area-inset-left, 0px)',
    } as any),
  };

  const rootStyle: React.CSSProperties = {
    position: 'relative',
    width: designWidth,
    height: designHeight,
    transform: `scale(${scale})`,
    transformOrigin: 'center center',
    pointerEvents: overlayMode ? 'none' : 'auto',
  };

  return (
    <div id="anchordom-viewport" style={containerStyle}>
      <div id="anchordom-root" style={rootStyle}>
        {children}
      </div>
    </div>
  );
};

const PanelWithProvider: React.FC<PanelProps> = ({ theme, ...props }) => {
  const [scale, setScale] = useState(1);
  return (
    <UIProvider theme={theme} scale={scale} setScale={setScale}>
      <InnerPanel {...props} />
    </UIProvider>
  );
};

export const Panel = PanelWithProvider;
