import React, { createContext, useContext } from 'react';
import type { Theme } from '../theme/types';
import { defaultTheme } from '../theme/defaultTheme';

interface UIContextType {
  theme: Theme;
}

const UIContext = createContext<UIContextType>({ theme: defaultTheme });

export const useUIContext = () => useContext(UIContext);

export const UIProvider: React.FC<{ theme?: Theme; children: React.ReactNode }> = ({
  theme = defaultTheme,
  children,
}) => {
  return <UIContext.Provider value={{ theme }}>{children}</UIContext.Provider>;
};
