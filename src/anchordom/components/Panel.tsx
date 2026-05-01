import React, { useState, useEffect } from 'react';
import type { Theme } from '../theme/types';
import { UIProvider, useUIContext } from '../context/UIContext';
import { useAssetLoader } from '../hooks/useAssetLoader';

interface PanelProps {
  theme?: Theme;
  designWidth?: number;
  designHeight?: number;
  useSafeArea?: boolean;
  children: React.ReactNode;
}

const InnerPanel: React.FC<Omit<PanelProps, 'theme'>> = ({
  designWidth = 1920,
  designHeight = 1080,
  useSafeArea = false,
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
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    pointerEvents: 'none', // Let clicks pass through the container to the game underneath if needed

    // Inject safe area variables at the root
    ...(useSafeArea && {
      '--safe-top': 'env(safe-area-inset-top, 0px)',
      '--safe-right': 'env(safe-area-inset-right, 0px)',
      '--safe-bottom': 'env(safe-area-inset-bottom, 0px)',
      '--safe-left': 'env(safe-area-inset-left, 0px)',
    } as any),
  };

  const virtualCanvasStyle: React.CSSProperties = {
    position: 'relative',
    width: designWidth,
    height: designHeight,
    transform: `scale(${scale})`,
    transformOrigin: 'center center',
    pointerEvents: 'auto', // Re-enable pointer events for UI elements
  };

  return (
    <div style={containerStyle}>
      <div id="anchordom-virtual-canvas" style={virtualCanvasStyle}>
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
