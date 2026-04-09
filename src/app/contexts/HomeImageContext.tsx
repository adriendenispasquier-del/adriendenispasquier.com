import { createContext, useContext, useState, ReactNode } from "react";

interface HomeImageContextType {
  hoveredImage: string | null;
  showComingSoon: boolean;
  currentProjectPath: string | null;
  currentProjectName: string | null;
  currentProjectSlug: string | null; // New: to identify if it's a doodle project
  setHoveredImage: (image: string | null) => void;
  setShowComingSoon: (show: boolean) => void;
  handleSectionHover: (slug: string) => void;
  handleSectionLeave: () => void;
  cycleRandomImage: () => void; // New method for mobile touch
}

const HomeImageContext = createContext<HomeImageContextType | null>(null);

export function useHomeImage() {
  const context = useContext(HomeImageContext);
  if (!context) {
    // Return dummy functions if not in home context
    return {
      hoveredImage: null,
      showComingSoon: false,
      currentProjectPath: null,
      currentProjectName: null,
      currentProjectSlug: null,
      setHoveredImage: () => {},
      setShowComingSoon: () => {},
      handleSectionHover: () => {},
      handleSectionLeave: () => {},
      cycleRandomImage: () => {},
    };
  }
  return context;
}

interface HomeImageProviderProps {
  children: ReactNode;
  onSectionHover: (slug: string) => void;
  onSectionLeave: () => void;
  hoveredImage: string | null;
  showComingSoon: boolean;
  currentProjectPath: string | null;
  currentProjectName: string | null;
  currentProjectSlug: string | null; // New
  setHoveredImage: (image: string | null) => void;
  setShowComingSoon: (show: boolean) => void;
  onCycleRandomImage: () => void; // New prop
}

export function HomeImageProvider({
  children,
  onSectionHover,
  onSectionLeave,
  hoveredImage,
  showComingSoon,
  currentProjectPath,
  currentProjectName,
  currentProjectSlug,
  setHoveredImage,
  setShowComingSoon,
  onCycleRandomImage,
}: HomeImageProviderProps) {
  return (
    <HomeImageContext.Provider
      value={{
        hoveredImage,
        showComingSoon,
        currentProjectPath,
        currentProjectName,
        currentProjectSlug,
        setHoveredImage,
        setShowComingSoon,
        handleSectionHover: onSectionHover,
        handleSectionLeave: onSectionLeave,
        cycleRandomImage: onCycleRandomImage,
      }}
    >
      {children}
    </HomeImageContext.Provider>
  );
}