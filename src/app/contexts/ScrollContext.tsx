import { createContext, useContext, useState, ReactNode } from 'react';

interface ScrollContextType {
  showHeaderFooter: boolean;
  setShowHeaderFooter: (show: boolean) => void;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export function ScrollProvider({ children }: { children: ReactNode }) {
  const [showHeaderFooter, setShowHeaderFooter] = useState(true);

  return (
    <ScrollContext.Provider value={{ showHeaderFooter, setShowHeaderFooter }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScroll() {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    // Return default values instead of throwing to prevent crashes
    return {
      showHeaderFooter: true,
      setShowHeaderFooter: () => {}
    };
  }
  return context;
}