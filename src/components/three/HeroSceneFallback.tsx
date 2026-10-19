import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Static vector rendition of the hero sculpture: plinth, backdrop slab,
 * matte core, flowing ribbons and chrome wire. It is the server-rendered
 * placeholder while the WebGL chunk loads, and the permanent visual when
 * WebGL is unavailable or fails — so the hero never shows an empty canvas.
 */
export function HeroSceneFallback({ className, layout = "inline" }: { className?: string; layout?: "stage" | "inline" }) {
  // Unique gradient ids per instance: desktop and mobile copies can coexist.
  const uid = useId().replace(/:/g, "");
  const ref = (name: string) => `url(#${uid}-${name})`;

  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center",
        layout === "stage" ? "justify-end pr-[5vw] pt-16" : "justify-center",
        className
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 420 460" className={layout === "stage" ? "h-[82%] w-auto max-w-[55%]" : "h-full w-auto max-w-full"} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={`${uid}-chrome`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#A8A8A8" />
            <stop offset="60%" stopColor="#EDEDED" />
            <stop offset="100%" stopColor="#7A7A7A" />
          </linearGradient>
          <radialGradient id={`${uid}-core`} cx="0.38" cy="0.32" r="0.75">
            <stop offset="0%" stopColor="#4A4A4A" />
            <stop offset="55%" stopColor="#1C1C1C" />
            <stop offset="100%" stopColor="#0E0E0E" />
          </radialGradient>
          <linearGradient id={`${uid}-ribbon`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1C1C1C" />
            <stop offset="45%" stopColor="#3A3A3A" />
            <stop offset="62%" stopColor="#D8D8D8" />
            <stop offset="75%" stopColor="#2A2A2A" />
            <stop offset="100%" stopColor="#E10600" />
          </linearGradient>
          <linearGradient id={`${uid}-ribbon-2`} x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2A2A2A" />
            <stop offset="50%" stopColor="#C0C0C0" />
            <stop offset="100%" stopColor="#1C1C1C" />
          </linearGradient>
          <linearGradient id={`${uid}-plinth`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2A2A2A" />
            <stop offset="100%" stopColor="#2A2A2A" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Backdrop slab and light rods */}
        <rect x="178" y="40" width="58" height="300" fill="#3A3A3A" />
        <rect x="230" y="18" width="2" height="150" fill="#FFFFFF" opacity="0.9" />

        {/* Plinth */}
        <path d="M92 352 L328 352 L300 460 L120 460 Z" fill={ref("plinth")} />
        <ellipse cx="210" cy="352" rx="118" ry="22" fill="#1C1C1C" />
        <ellipse cx="210" cy="352" rx="118" ry="22" stroke={ref("chrome")} strokeWidth="2" />

        {/* Rear arc of the chrome wire */}
        <path d="M58 300 Q70 70 250 92 Q380 112 372 250" stroke={ref("chrome")} strokeWidth="2" opacity="0.7" />

        {/* Core and ribbons */}
        <circle cx="210" cy="215" r="70" fill={ref("core")} />
        <path d="M118 150 C150 92 282 90 300 168 C312 220 262 248 236 236 C276 214 268 150 214 140 C170 132 140 160 118 150 Z" fill={ref("ribbon")} />
        <path d="M128 286 C112 236 150 204 188 214 C150 226 152 270 196 290 C240 310 292 284 304 252 C306 300 230 336 176 318 C152 310 136 302 128 286 Z" fill={ref("ribbon-2")} />
        <path d="M262 236 C286 262 300 292 290 316" stroke="#E10600" strokeWidth="3" strokeLinecap="round" opacity="0.9" />

        {/* Front arc of the chrome wire with beads */}
        <path d="M58 300 Q150 372 372 250" stroke={ref("chrome")} strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="312" cy="160" r="5" fill={ref("chrome")} />
        <circle cx="328" cy="146" r="3" fill={ref("chrome")} />

        {/* Pebbles on the plinth */}
        <circle cx="272" cy="338" r="14" fill="#141414" />
        <circle cx="292" cy="345" r="8" fill="#141414" />
      </svg>
    </div>
  );
}
