import React from "react";

export function BackgroundSpheres() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Top Left Sphere */}
      <div 
        className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.15) 30%, transparent 60%)",
          boxShadow: "inset 0 0 60px rgba(255,255,255,0.8), 0 20px 60px rgba(201,111,61,0.08)",
          filter: "blur(2px)",
          opacity: 0.9,
          transform: "translate3d(0, 0, 0)",
        }}
      />
      
      {/* Middle Right Copper Sphere */}
      <div 
        className="absolute top-[35%] right-[-10%] w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle at 40% 40%, rgba(201,111,61,0.25) 0%, rgba(201,111,61,0.08) 50%, transparent 80%)",
          boxShadow: "inset 0 0 50px rgba(255,255,255,0.3)",
          filter: "blur(4px)",
          opacity: 0.85,
          transform: "translate3d(0, 0, 0)",
        }}
      />
      
      {/* Bottom Left Glass Disc */}
      <div 
        className="absolute bottom-[-5%] left-[15%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full"
        style={{
          background: "radial-gradient(circle at 50% 10%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 50%, transparent 70%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)",
          filter: "blur(2px)",
          opacity: 0.75,
          transform: "translate3d(0, 0, 0)",
        }}
      />

      {/* Center Subtle Crystal Blob */}
      <div 
        className="absolute top-[60%] left-[60%] w-[25vw] h-[25vw] max-w-[400px] max-h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle at 70% 30%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.08) 40%, transparent 70%)",
          filter: "blur(4px)",
          opacity: 0.65,
          transform: "translate3d(0, 0, 0)",
        }}
      />
    </div>
  );
}
