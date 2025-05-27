// client/src/components/MenuContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Type for the context value
interface MenuContextType {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

// Creating the context
const MenuContext = createContext<MenuContextType | undefined>(undefined);

interface MenuProviderProps {
  children: ReactNode;
}

// Provider component to wrap around your app
export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  return (
    <MenuContext.Provider value={{ isMenuOpen, toggleMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

// Custom hook to use the context
export const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenuContext must be used within a MenuProvider');
  }
  return context;
};
