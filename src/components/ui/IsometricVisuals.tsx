import { motion } from "framer-motion";

export function IsometricBox01({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <motion.svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        initial={{ y: 0 }}
        whileHover={{ y: -10 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <g transform="translate(100, 50)">
          {/* Top Face */}
          <path d="M0 0 L60 30 L0 60 L-60 30 Z" fill="#252F37" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          {/* Left Face */}
          <path d="M-60 30 L0 60 L0 130 L-60 100 Z" fill="#1B232A" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          {/* Right Face */}
          <path d="M0 60 L60 30 L60 100 L0 130 Z" fill="#11161B" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          
          {/* Accent Element on Top Face */}
          <path d="M0 15 L30 30 L0 45 L-30 30 Z" fill="#E4573F" opacity="0.8" />
        </g>
      </motion.svg>
    </div>
  );
}

export function IsometricBoxes02({ className = "" }: { className?: string }) {
  // A helper function to draw a single isometric cube
  // w = 40 (from -20 to 20), h = 20 for top face
  const Cube = ({ x, y, delay, highlight = false }: { x: number, y: number, delay: number, highlight?: boolean }) => (
    <motion.g
      transform={`translate(${x}, ${y})`}
      variants={{
        hover: { y: -5, x: 2 }
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25, delay }}
    >
      {/* Top Face */}
      <path d="M0 0 L20 10 L0 20 L-20 10 Z" fill={highlight ? "#E4573F" : "#252F37"} stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
      {/* Left Face */}
      <path d="M-20 10 L0 20 L0 40 L-20 30 Z" fill="#1B232A" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
      {/* Right Face */}
      <path d="M0 20 L20 10 L20 30 L0 40 Z" fill="#151C22" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
    </motion.g>
  );

  return (
    <div className={`relative ${className}`}>
      <motion.svg
        viewBox="0 0 200 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <motion.g
          transform="translate(100, 20)"
          variants={{
            hover: { y: -4, x: 3, scale: 1.025 }
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {/* Row 4 (Bottom) */}
          <Cube x={-60} y={30} delay={0.0} />
          <Cube x={-20} y={50} delay={0.01} />
          <Cube x={20} y={70} delay={0.02} />
          <Cube x={60} y={90} delay={0.03} />

          {/* Row 3 */}
          <Cube x={-40} y={20} delay={0.02} />
          <Cube x={0} y={40} delay={0.03} />
          <Cube x={40} y={60} delay={0.04} />

          {/* Row 2 */}
          <Cube x={-20} y={10} delay={0.04} />
          <Cube x={20} y={30} delay={0.05} />

          {/* Row 1 (Top Peak) */}
          <Cube x={0} y={0} delay={0.06} highlight />
        </motion.g>
      </motion.svg>
    </div>
  );
}
