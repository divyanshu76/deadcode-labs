"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

type ConsentState = {
  necessary: boolean; // always true
  analytics: boolean;
  marketing: boolean;
};

const defaultConsent: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
};

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [consent, setConsent] = useState<ConsentState>(defaultConsent);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const stored = localStorage.getItem("deadcode-cookie-consent");
    if (!stored) {
      // Small delay before showing banner
      const t = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(t);
    } else {
      try {
        setConsent(JSON.parse(stored));
      } catch (e) {
        setIsVisible(true);
      }
    }
  }, []);

  useEffect(() => {
    const handleOpenSettings = () => {
      setIsVisible(true);
      setShowSettings(true);
    };
    document.addEventListener("open-cookie-settings", handleOpenSettings);
    return () => document.removeEventListener("open-cookie-settings", handleOpenSettings);
  }, []);

  const saveConsent = (newConsent: ConsentState) => {
    localStorage.setItem("deadcode-cookie-consent", JSON.stringify(newConsent));
    setConsent(newConsent);
    setIsVisible(false);
    setShowSettings(false);
  };

  const acceptAll = () => saveConsent({ necessary: true, analytics: true, marketing: true });
  const rejectOptional = () => saveConsent({ necessary: true, analytics: false, marketing: false });
  
  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0, transition: { duration: 0.3 } }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 md:w-[420px] z-[9999]"
        >
          <div className="glass-panel p-6 rounded-[20px] border border-white/20 shadow-2xl flex flex-col gap-4 text-[#FFF7F8] bg-black/80 backdrop-blur-xl">
            
            {!showSettings ? (
              <>
                <div>
                  <h3 className="font-bold text-lg mb-2">We value your privacy</h3>
                  <p className="text-sm text-[#D8C4C9] leading-relaxed">
                    We use strictly necessary cookies to make our site work. We do not use intrusive analytics or marketing cookies without your consent. 
                    Read our <a href="/cookie-policy" className="underline hover:text-white">Cookie Policy</a> for details.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 mt-2">
                  <Button variant="default" onClick={acceptAll} className="flex-1 text-sm h-10">
                    Accept All
                  </Button>
                  <Button variant="outline" onClick={rejectOptional} className="flex-1 text-sm h-10 border-white/20 hover:bg-white/10">
                    Reject Optional
                  </Button>
                </div>
                <button 
                  onClick={() => setShowSettings(true)}
                  className="text-xs text-[#927E6E] hover:text-[#FFF7F8] underline-offset-4 hover:underline mt-1 self-center transition-colors"
                >
                  Customize Settings
                </button>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg">Cookie Settings</h3>
                  <button onClick={() => setShowSettings(false)} className="text-[#927E6E] hover:text-white p-1">
                    ✕
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-semibold">Strictly Necessary</h4>
                      <p className="text-xs text-[#D8C4C9] mt-1">Required for the website to function. Cannot be disabled.</p>
                    </div>
                    <div className="text-xs font-bold text-[#4ADE80] px-2 py-1 bg-[#4ADE80]/10 rounded">Always Active</div>
                  </div>
                  
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-semibold">Analytics & Performance</h4>
                      <p className="text-xs text-[#D8C4C9] mt-1">Currently not implemented. Would help us understand how you use the site.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={consent.analytics}
                        onChange={(e) => setConsent(c => ({ ...c, analytics: e.target.checked }))}
                      />
                      <div className="w-9 h-5 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#E5092D]"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-semibold">Marketing & Advertising</h4>
                      <p className="text-xs text-[#D8C4C9] mt-1">Currently not implemented. Would be used for targeted ads.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={consent.marketing}
                        onChange={(e) => setConsent(c => ({ ...c, marketing: e.target.checked }))}
                      />
                      <div className="w-9 h-5 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#E5092D]"></div>
                    </label>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-4">
                  <Button variant="default" onClick={() => saveConsent(consent)} className="flex-1 text-sm h-10">
                    Save Preferences
                  </Button>
                </div>
              </>
            )}
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
