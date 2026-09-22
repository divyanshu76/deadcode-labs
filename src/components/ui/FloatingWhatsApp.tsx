"use client";

import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";

export function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 250);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a
      href="https://wa.me/919151741310"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed left-5 md:left-auto md:right-6 z-50 flex items-center justify-center w-12 h-12 md:w-13 md:h-13 bg-[#25D366] text-white rounded-full shadow-[0_6px_20px_rgba(37,211,102,0.35)] hover:scale-105 active:scale-95 transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
      }`}
      style={{
        bottom: "calc(24px + env(safe-area-inset-bottom, 0px))",
      }}
      aria-label="Direct WhatsApp Consultation with Founder"
    >
      <FaWhatsapp className="w-6 h-6 md:w-7 md:h-7" />
    </a>
  );
}
