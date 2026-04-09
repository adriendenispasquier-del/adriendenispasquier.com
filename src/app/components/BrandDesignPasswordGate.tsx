import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface BrandDesignPasswordGateProps {
  children: React.ReactNode;
  enabled?: boolean;    
}

const CORRECT_PASSWORD = 'NOTYET2026';
const PASSWORD_SESSION_KEY = 'brandDesignUnlocked';

export function BrandDesignPasswordGate({ children, enabled = false }: BrandDesignPasswordGateProps) {


  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  // Check if already unlocked in session
  useEffect(() => {
    const unlocked = sessionStorage.getItem(PASSWORD_SESSION_KEY);
    if (unlocked === 'true') {
      setIsUnlocked(true);
    }
    
    setIsChecking(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === CORRECT_PASSWORD) {
      setIsUnlocked(true);
      sessionStorage.setItem(PASSWORD_SESSION_KEY, 'true');
      setError(false);
    } else {
      setError(true);
      setPassword('');
      setTimeout(() => setError(false), 2000);
    }
  };

  if (!enabled) return <>{children}</>;   // ← add this line here

  // Show loading state while checking session
  if (isChecking) {
    return null;
  }

  // Show password gate
  if (!isUnlocked) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#f7f5f0] z-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md px-8"
        >
          <h1 className="text-[20px] uppercase tracking-wide mb-8 text-center">
            Protected Section
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoFocus
                className="w-full px-4 py-3 text-[16px] bg-transparent border-b border-black focus:outline-none focus:border-opacity-50 transition-colors"
              />
            </div>
            
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-[12px] text-red-600 text-center"
                >
                  Incorrect password
                </motion.p>
              )}
            </AnimatePresence>
            
            <button
              type="submit"
              className="w-full px-6 py-3 text-[12px] uppercase tracking-wide bg-black text-white hover:bg-opacity-80 transition-all duration-300"
            >
              Enter
            </button>
          </form>
          
          <p className="text-[12px] text-center mt-8 opacity-50">
            This section is password protected
          </p>
        </motion.div>
      </div>
    );
  }

  // Show content when unlocked
  return <>{children}</>;
}
