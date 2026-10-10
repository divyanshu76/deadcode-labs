"use client";

export function CookieSettingsTrigger() {
  return (
    <button
      onClick={() => document.dispatchEvent(new CustomEvent('open-cookie-settings'))}
      className="hover:text-[#3B2A21] transition-colors cursor-pointer"
    >
      Cookie Settings
    </button>
  );
}
