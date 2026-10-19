"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
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
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 md:w-[440px] z-[9999]"
        >
          <div className="glass-elevated border border-white/10 p-6 md:p-7 rounded-[26px] shadow-[0_24px_60px_rgba(0,0,0,0.55)] flex flex-col gap-4 text-ink backdrop-blur-2xl">
            
            {!showSettings ? (
              <>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2 h-2 rounded-full bg-signal" />
                    <h3 className="font-display font-bold text-lg text-ink tracking-tight">We value your privacy</h3>
                  </div>
                  <p className="text-[13.5px] text-ink-soft leading-relaxed">
                    We use strictly necessary cookies to ensure our digital platform operates properly. We do not deploy intrusive advertising cookies without your explicit consent. 
                    Read our{" "}
                    <a href="/cookie-policy" className="text-signal-bright font-semibold underline underline-offset-2 hover:text-signal-dark transition-colors">
                      Cookie Policy
                    </a>{" "}
                    for full transparency.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2.5 mt-1">
                  <Button 
                    variant="default" 
                    onClick={acceptAll} 
                    className="flex-1 text-sm h-11 bg-signal text-white hover:bg-signal-dark font-semibold rounded-full shadow-md"
                  >
                    Accept All
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={rejectOptional} 
                    className="flex-1 text-sm h-11 border-silver/50 text-ink hover:bg-white/[0.08] font-semibold rounded-full"
                  >
                    Reject Optional
                  </Button>
                </div>
                <button 
                  onClick={() => setShowSettings(true)}
                  className="text-xs font-mono font-medium text-ink-muted hover:text-signal-bright underline-offset-4 hover:underline mt-0.5 self-center transition-colors"
                >
                  Customize Settings
                </button>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <h3 className="font-display font-bold text-lg text-ink">Cookie Settings</h3>
                  <button 
                    onClick={() => setShowSettings(false)} 
                    className="text-ink-muted hover:text-ink p-1 text-base font-bold transition-colors"
                    aria-label="Close settings"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="space-y-4 my-1">
                  <div className="flex items-start justify-between gap-4 p-3 rounded-xl bg-white/[0.04] border border-white/10">
                    <div>
                      <h4 className="text-sm font-semibold text-ink">Strictly Necessary</h4>
                      <p className="text-xs text-ink-soft mt-1">Essential for site security, navigation, and session continuity. Always active.</p>
                    </div>
                    <span className="text-[11px] font-mono font-bold text-emerald-800 px-2.5 py-1 bg-emerald-100 rounded-full border border-emerald-200 shrink-0">
                      Active
                    </span>
                  </div>
                  
                  <div className="flex items-start justify-between gap-4 p-3 rounded-xl bg-white/[0.04] border border-white/10">
                    <div>
                      <h4 className="text-sm font-semibold text-ink">Analytics & Performance</h4>
                      <p className="text-xs text-ink-soft mt-1">Anonymous telemetry to measure speed and platform reliability.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={consent.analytics}
                        onChange={(e) => setConsent(c => ({ ...c, analytics: e.target.checked }))}
                      />
                      <div className="w-10 h-5 bg-white/15 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-signal"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-start justify-between gap-4 p-3 rounded-xl bg-white/[0.04] border border-white/10">
                    <div>
                      <h4 className="text-sm font-semibold text-ink">Marketing & Advertising</h4>
                      <p className="text-xs text-ink-soft mt-1">Used to evaluate audience engagement. Disabled by default.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={consent.marketing}
                        onChange={(e) => setConsent(c => ({ ...c, marketing: e.target.checked }))}
                      />
                      <div className="w-10 h-5 bg-white/15 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-signal"></div>
                    </label>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-2">
                  <Button 
                    variant="default" 
                    onClick={() => saveConsent(consent)} 
                    className="flex-1 text-sm h-11 bg-signal text-white hover:bg-signal-dark font-semibold rounded-full shadow-md"
                  >
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
