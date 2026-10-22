import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Site-wide social preview card, built from the approved logo mark and brand palette.
export const alt = "DEADCODE LABS — Digital ideas, engineered.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(join(process.cwd(), "src/app/icon.svg"));
  const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#111111",
          color: "#F5F5F5",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> only */}
        <img src={logoSrc} width={112} height={112} alt="" />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1 }}>DEADCODE LABS</div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 44, color: "#C0C0C0" }}>
            Digital ideas, engineered<span style={{ color: "#E10600" }}>.</span>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#8E8E8E" }}>
          <span>Web apps · E-commerce · AI · Automation</span>
          <span>deadcode.space</span>
        </div>
      </div>
    ),
    size,
  );
}
