import { RouterProvider } from "react-router";
import { router } from "./routes";
import { useEffect } from "react";
import { ReducedMotionWarning } from "./components/ReducedMotionWarning";

export default function App() {
  // Prevent keyboard shortcuts for saving/downloading
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent Ctrl+S / Cmd+S (save)
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
      }
      // Prevent Ctrl+P / Cmd+P (print)
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <ReducedMotionWarning />
    </>
  );
}