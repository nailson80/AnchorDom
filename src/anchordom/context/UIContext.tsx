import React, { createContext, useContext } from 'react';
import type { Theme } from '../theme/types';
import { defaultTheme } from '../theme/defaultTheme';

interface UIContextType {
  theme: Theme;
  scale: number;
  setScale: (scale: number) => void;
}

const UIContext = createContext<UIContextType>({
  theme: defaultTheme,
  scale: 1,
  setScale: () => {},
});

export const useUIContext = () => useContext(UIContext);

export const UIProvider: React.FC<{ theme?: Theme; scale?: number; setScale?: (scale: number) => void; children: React.ReactNode }> = ({
  theme = defaultTheme,
  scale = 1,
  setScale = () => {},
  children,
}) => {
  return <UIContext.Provider value={{ theme, scale, setScale }}>{children}</UIContext.Provider>;
};
