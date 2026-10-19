"use client";

export function CookieSettingsTrigger() {
  return (
    <button
      onClick={() => document.dispatchEvent(new CustomEvent('open-cookie-settings'))}
      className="hover:text-charcoal transition-colors cursor-pointer"
    >
      Cookie Settings
    </button>
  );
}
