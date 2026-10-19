import { cn } from "@/lib/utils";

export type ServiceGlyphKind = "web" | "commerce" | "app" | "ai" | "automation" | "saas";

/**
 * Line illustrations that describe each service rather than decorate it.
 * Strokes use currentColor so the glyph adapts to light or dark panels;
 * Signal Red marks the single "active" detail in each drawing.
 */
export function ServiceGlyph({ kind, className }: { kind: ServiceGlyphKind; className?: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 160 100" className={cn("w-full h-auto", className)} aria-hidden="true">
      {kind === "web" && (
        <g {...common}>
          <rect x="18" y="12" width="124" height="76" rx="6" />
          <path d="M18 24 H142" />
          <circle cx="26" cy="18" r="1.6" /><circle cx="32" cy="18" r="1.6" /><circle cx="38" cy="18" r="1.6" />
          <rect x="28" y="32" width="58" height="26" rx="3" fill="currentColor" fillOpacity="0.08" />
          <path d="M28 66 H112 M28 73 H96 M28 80 H70" />
          <rect x="96" y="32" width="36" height="26" rx="3" />
          <circle cx="118" cy="48" r="3" fill="#E10600" stroke="none" />
        </g>
      )}
      {kind === "commerce" && (
        <g {...common}>
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${16 + i * 40} 18)`}>
              <rect width="32" height="44" rx="4" />
              <rect x="5" y="5" width="22" height="20" rx="2" fill="currentColor" fillOpacity="0.08" />
              <path d="M5 32 H22 M5 38 H16" />
            </g>
          ))}
          <path d="M126 70 h6 l6 16 h14 l4 -11 h-21" />
          <circle cx="140" cy="91" r="2" /><circle cx="150" cy="91" r="2" />
          <circle cx="154" cy="66" r="5" fill="#E10600" stroke="none" />
        </g>
      )}
      {kind === "app" && (
        <g {...common}>
          <rect x="14" y="12" width="132" height="76" rx="6" />
          <path d="M44 12 V88" />
          <path d="M22 24 H36 M22 32 H36 M22 40 H32" />
          {[28, 44, 22, 52, 36].map((h, i) => (
            <rect key={i} x={56 + i * 17} y={78 - h} width="10" height={h} rx="2" fill={i === 3 ? "#E10600" : "currentColor"} fillOpacity={i === 3 ? 1 : 0.12} stroke={i === 3 ? "none" : "currentColor"} />
          ))}
          <path d="M54 80 H140" />
        </g>
      )}
      {kind === "ai" && (
        <g {...common}>
          {[
            [30, 30], [30, 50], [30, 70],
            [80, 22], [80, 50], [80, 78],
            [130, 38], [130, 62],
          ].map(([x, y], i, nodes) =>
            i < 3
              ? [3, 4, 5].map((j) => <path key={`${i}-${j}`} d={`M${x} ${y} L${nodes[j][0]} ${nodes[j][1]}`} strokeOpacity="0.45" />)
              : i < 6
                ? [6, 7].map((j) => <path key={`${i}-${j}`} d={`M${x} ${y} L${nodes[j][0]} ${nodes[j][1]}`} strokeOpacity="0.45" />)
                : null
          )}
          {[[30, 30], [30, 50], [30, 70], [80, 22], [80, 78], [130, 38], [130, 62]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="4.5" fill="var(--bg-soft, #fafafa)" />
          ))}
          <circle cx="80" cy="50" r="6" fill="#E10600" stroke="none" />
        </g>
      )}
      {kind === "automation" && (
        <g {...common}>
          {[16, 60, 104].map((x, i) => (
            <g key={x}>
              <rect x={x} y="36" width="34" height="28" rx="5" fill={i === 1 ? "currentColor" : "none"} fillOpacity={i === 1 ? 0.08 : 0} />
              {i < 2 && <path d={`M${x + 34} 50 H${x + 44} M${x + 40} 46 l4 4 -4 4`} />}
            </g>
          ))}
          <path d="M33 36 V22 H121 V36" strokeDasharray="3 4" strokeOpacity="0.6" />
          <circle cx="77" cy="22" r="3.5" fill="#E10600" stroke="none" />
          <path d="M24 50 h18 M68 46 h18 M68 54 h12 M112 50 h18" strokeOpacity="0.6" />
        </g>
      )}
      {kind === "saas" && (
        <g {...common}>
          {[0, 1, 2].map((i) => (
            <path
              key={i}
              d={`M80 ${18 + i * 18} L130 ${36 + i * 18} L80 ${54 + i * 18} L30 ${36 + i * 18} Z`}
              fill="currentColor"
              fillOpacity={0.05 + i * 0.04}
              stroke={i === 0 ? "#E10600" : "currentColor"}
            />
          ))}
        </g>
      )}
    </svg>
  );
}
