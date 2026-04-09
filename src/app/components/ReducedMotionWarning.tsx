import { useState, useEffect } from "react";
import { X } from "lucide-react";

export function ReducedMotionWarning() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if user has dismissed the warning before
    const hasBeenDismissed = localStorage.getItem("reducedMotionWarningDismissed");
    if (hasBeenDismissed) {
      setDismissed(true);
      return;
    }

    // Check if user has "Reduce Motion" enabled
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    
    // Only show if explicitly set to reduce motion
    if (prefersReducedMotion.matches) {
      // Double check - wait a bit to ensure the setting is accurate
      setTimeout(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setShow(true);
        }
      }, 1000);
    }

    // Listen for changes to the preference
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    prefersReducedMotion.addEventListener("change", handleChange);
    return () => prefersReducedMotion.removeEventListener("change", handleChange);
  }, []);

  const handleDismiss = () => {
    setShow(false);
    setDismissed(true);
    localStorage.setItem("reducedMotionWarningDismissed", "true");
  };

  if (!show || dismissed) return null;

  return (
    <div className="fixed top-1/2 -translate-y-1/2 left-[2%] right-[2%] lg:left-[2%] lg:right-auto lg:max-w-[420px] z-50 bg-white border border-black p-6">
      <button
        onClick={handleDismiss}
        className="absolute top-3 right-3 p-1 hover:opacity-50 transition-opacity"
        aria-label="Dismiss notification"
      >
        <X size={20} />
      </button>
      
      <div className="pr-8">
        <h3 className="text-[20px] uppercase mb-3 tracking-normal">ANIMATION SETTINGS</h3>
        <p className="text-[12px] mb-4 leading-relaxed">
          Your device has "Reduce Motion" enabled. To view animated illustrations (GIFs), please disable this setting:
        </p>
        <div className="space-y-3">
          <div>
            <p className="text-[12px] uppercase mb-1">On iOS/iPad</p>
            <p className="text-[12px] leading-relaxed">
              Settings → Accessibility → Motion → Turn off "Reduce Motion"
            </p>
          </div>
          <div>
            <p className="text-[12px] uppercase mb-1">On macOS</p>
            <p className="text-[12px] leading-relaxed">
              System Settings → Accessibility → Display → Turn off "Reduce Motion"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}