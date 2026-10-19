"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { MotionValue } from "motion/react";
import { BRAND } from "@/lib/design-tokens";
import {
  createGrooveTexture,
  createRibbonGeometry,
  createShadowTexture,
  createStudioEnvironment,
  type RibbonSpec,
} from "./sculpture";

export interface HeroSceneProps {
  /** 0 while the hero fills the viewport → 1 once it has scrolled away. */
  scrollProgress: MotionValue<number>;
  /** Visible on screen and the tab is in the foreground. */
  active: boolean;
  reducedMotion: boolean;
  /** Fine pointer available — enables pointer parallax. */
  interactive: boolean;
  quality: "high" | "low";
  /** performance.now() in seconds at which the entrance should begin. */
  entranceAt: number;
  /** "stage": wide canvas behind the headline, sculpture pushed right. "inline": centred. */
  layout: "stage" | "inline";
  onReady: () => void;
  onContextLost: () => void;
}

type Vec3 = [number, number, number];

/** Radius (world units) around the look target that must stay in frame. */
const FRAME_RADIUS = 3.75;
const FOV = 28;
const LOOK_Y = -0.15;
const ENTRANCE_S = 1.8;
/** Resting angle of the sculpture when nothing is animating (reduced motion). */
const REST_YAW = -0.55;

/** Three interlaced ribbons, each in its own tilted frame. */
const RIBBONS: { spec: RibbonSpec; rotation: Vec3; sway: { axis: "x" | "y" | "z"; amp: number; speed: number; phase: number } }[] = [
  {
    // Main diagonal sweep that wraps the core.
    spec: { start: -0.4, sweep: Math.PI * 1.45, radius: 1.28, swell: 0.32, lift: 0.28, waves: 0.8, width: [0.26, 0.86], twistStart: 0.3, twist: Math.PI * 1.15, curl: 0.32, red: [0.6, 0.95] },
    rotation: [0.55, 0, -0.75],
    sway: { axis: "z", amp: 0.14, speed: 0.19, phase: 0 },
  },
  {
    // Upper flared lip.
    spec: { start: 1.9, sweep: Math.PI * 0.95, radius: 1.18, swell: 0.42, lift: 0.18, waves: 0.5, width: [0.2, 0.7], twistStart: -0.6, twist: Math.PI * 0.9, curl: 0.4, red: [0.75, 1] },
    rotation: [-0.9, 0.5, 0.6],
    sway: { axis: "x", amp: 0.12, speed: 0.15, phase: 1.7 },
  },
  {
    // Lower counter-sweep.
    spec: { start: 3.6, sweep: Math.PI * 1.05, radius: 1.32, swell: 0.28, lift: 0.22, waves: 0.6, width: [0.2, 0.62], twistStart: 1.1, twist: -Math.PI * 0.85, curl: 0.28, red: [1.1, 1.2] },
    rotation: [1.25, -0.4, 0.25],
    sway: { axis: "y", amp: 0.16, speed: 0.23, phase: 3.4 },
  },
];

const BEADS: { position: Vec3; radius: number; chrome: boolean; phase: number }[] = [
  { position: [2.05, 0.75, 0.6], radius: 0.07, chrome: true, phase: 0 },
  { position: [2.35, 1.0, 0.2], radius: 0.04, chrome: true, phase: 1.3 },
  { position: [0.15, -0.35, 1.25], radius: 0.06, chrome: true, phase: 2.4 },
];

const PEBBLES: { position: Vec3; radius: number }[] = [
  { position: [1.3, -1.78, 0.45], radius: 0.26 },
  { position: [1.68, -1.9, 0.18], radius: 0.15 },
  { position: [1.0, -1.93, 0.85], radius: 0.11 },
];

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
const nowSeconds = () => performance.now() / 1000;

/** Pre-filtered studio reflections, attached to the scene as `scene.environment`. */
function StudioEnvironment() {
  const gl = useThree((s) => s.gl);
  const invalidate = useThree((s) => s.invalidate);
  const envMap = useMemo(() => createStudioEnvironment(gl), [gl]);

  useEffect(() => {
    invalidate();
    return () => envMap.dispose();
  }, [envMap, invalidate]);

  return <primitive object={envMap} attach="environment" />;
}

function Sculpture({
  scrollProgress,
  reducedMotion,
  interactive,
  quality,
  entranceAt,
  layout,
  onReady,
}: Omit<HeroSceneProps, "active" | "onContextLost">) {
  const sculpture = useRef<THREE.Group>(null);
  const ribbons = useRef<(THREE.Group | null)[]>([]);
  const wire = useRef<THREE.Group>(null);
  const beads = useRef<(THREE.Mesh | null)[]>([]);
  const redLight = useRef<THREE.PointLight>(null);

  const pointer = useRef({ x: 0, y: 0 });
  const smoothed = useRef({ x: 0, y: 0 });
  const yaw = useRef(REST_YAW);
  // Scene time accumulated from R3F's frame delta. We deliberately avoid reading
  // state.clock (a THREE.Clock, deprecated since r183) so there is one time
  // source; time also pauses with the render loop while the hero is off-screen.
  const elapsed = useRef(0);
  const entranceStart = useRef<number | null>(null);
  const reported = useRef(false);
  const cameraDistance = useRef(14);
  // Horizontal look offset: on the wide stage, looking left of the sculpture
  // places it in the right-hand part of the frame, clear of the headline.
  const lookX = useRef(0);
  const lookTarget = useMemo(() => new THREE.Vector3(), []);

  const width = useThree((s) => s.size.width);
  const height = useThree((s) => s.size.height);
  const invalidate = useThree((s) => s.invalidate);
  const high = quality === "high";

  // Distance at which FRAME_RADIUS fits both vertically and horizontally.
  useEffect(() => {
    if (height === 0) return;
    const halfTan = Math.tan(THREE.MathUtils.degToRad(FOV / 2));
    const aspect = width / height;
    cameraDistance.current = Math.max(FRAME_RADIUS / halfTan, FRAME_RADIUS / (halfTan * aspect));
    const halfWidth = cameraDistance.current * halfTan * aspect;
    lookX.current = layout === "stage" ? -Math.max(0, Math.min(halfWidth - FRAME_RADIUS * 0.95, halfWidth * 0.5)) : 0;
    invalidate();
  }, [width, height, invalidate, layout]);

  const textures = useMemo(() => ({ groove: createGrooveTexture(), shadow: createShadowTexture() }), []);

  const materials = useMemo(() => {
    const ribbon = new THREE.MeshPhysicalMaterial({
      color: "#ffffff",
      vertexColors: true,
      metalness: 1,
      roughness: 0.3,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      side: THREE.DoubleSide,
      envMapIntensity: 1.15,
    });
    if (high) {
      // Brushed, grooved metal: highlights stretch along each ribbon.
      ribbon.anisotropy = 0.85;
      ribbon.bumpMap = textures.groove;
      ribbon.bumpScale = 0.55;
    }
    return {
      ribbon,
      core: new THREE.MeshPhysicalMaterial({ color: "#161616", metalness: 0.6, roughness: 0.42, clearcoat: 0.5, clearcoatRoughness: 0.35 }),
      chrome: new THREE.MeshStandardMaterial({ color: "#e6e6e6", metalness: 1, roughness: 0.08, envMapIntensity: 1.3 }),
      plinth: new THREE.MeshStandardMaterial({ color: BRAND.charcoal, metalness: 0.35, roughness: 0.55 }),
      plinthTop: new THREE.MeshStandardMaterial({ color: "#1f1f1f", metalness: 0.5, roughness: 0.35 }),
      slab: new THREE.MeshStandardMaterial({ color: "#4a4a4a", metalness: 0.25, roughness: 0.6 }),
      pebble: new THREE.MeshStandardMaterial({ color: "#141414", metalness: 0.3, roughness: 0.5 }),
      lightRod: new THREE.MeshBasicMaterial({ color: new THREE.Color("#ffffff").multiplyScalar(2.2), toneMapped: false }),
      shadow: new THREE.MeshBasicMaterial({ map: textures.shadow, transparent: true, depthWrite: false, opacity: 0.9 }),
    };
  }, [high, textures]);

  const geometries = useMemo(() => {
    const segU = high ? 220 : 110;
    const segV = high ? 28 : 14;
    // Elliptical chrome wire that loops around sculpture and plinth.
    const wireCurve = new THREE.EllipseCurve(0, 0, 3.15, 2.55, 0, Math.PI * 2, false, 0);
    const wirePoints = wireCurve.getPoints(high ? 200 : 100).map((p) => new THREE.Vector3(p.x, 0, p.y));
    return {
      ribbons: RIBBONS.map((r) => createRibbonGeometry(r.spec, segU, segV)),
      core: new THREE.SphereGeometry(0.98, high ? 64 : 32, high ? 64 : 32),
      bead: new THREE.SphereGeometry(1, 24, 24),
      wire: new THREE.TubeGeometry(new THREE.CatmullRomCurve3(wirePoints, true), high ? 240 : 120, 0.016, 8, true),
      plinth: new THREE.CylinderGeometry(2.45, 1.85, 1.7, high ? 96 : 48, 1, true),
      plinthTop: new THREE.CircleGeometry(2.45, high ? 96 : 48),
      plinthRim: new THREE.TorusGeometry(2.45, 0.022, 8, high ? 160 : 80),
      baseDisc: new THREE.CylinderGeometry(0.62, 0.62, 0.06, 48),
      slab: new THREE.BoxGeometry(1.45, 5.2, 0.14),
      rod: new THREE.CylinderGeometry(0.014, 0.014, 1, 8),
      shadow: new THREE.PlaneGeometry(3.6, 3.6),
    };
  }, [high]);

  useEffect(
    () => () => {
      textures.groove.dispose();
      textures.shadow.dispose();
    },
    [textures]
  );
  useEffect(() => () => Object.values(materials).forEach((m) => m.dispose()), [materials]);
  useEffect(
    () => () => {
      Object.values(geometries).forEach((g) => (Array.isArray(g) ? g.forEach((x) => x.dispose()) : g.dispose()));
    },
    [geometries]
  );

  useEffect(() => {
    if (!interactive || reducedMotion) return;
    const handlePointer = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", handlePointer, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointer);
  }, [interactive, reducedMotion]);

  useFrame((state, rawDelta) => {
    const group = sculpture.current;
    if (!group) return;

    const delta = Math.min(rawDelta, 0.1);
    elapsed.current += delta;
    const t = elapsed.current;
    const now = nowSeconds();
    if (entranceStart.current === null) entranceStart.current = Math.max(entranceAt, now);

    const motion = reducedMotion ? 0 : 1;
    const entrance = reducedMotion ? 1 : easeOutQuart(THREE.MathUtils.clamp((now - entranceStart.current) / ENTRANCE_S, 0, 1));
    const pending = 1 - entrance;
    const progress = reducedMotion ? 0 : THREE.MathUtils.clamp(scrollProgress.get(), 0, 1);

    // Pointer: restrained, damped camera parallax — enhances, never drives.
    const target = interactive && !reducedMotion ? pointer.current : { x: 0, y: 0 };
    smoothed.current.x = THREE.MathUtils.damp(smoothed.current.x, target.x, 2.4, delta);
    smoothed.current.y = THREE.MathUtils.damp(smoothed.current.y, target.y, 2.4, delta);

    const distance = cameraDistance.current * (1 + progress * 0.08);
    state.camera.position.set(
      lookX.current + smoothed.current.x * 0.9,
      0.7 - smoothed.current.y * 0.55 + progress * 0.6,
      distance
    );
    state.camera.lookAt(lookTarget.set(lookX.current, LOOK_Y, 0));

    // Slow yaw with long calm stretches and gentle surges (never a constant spin).
    const surge = Math.pow(0.5 + 0.5 * Math.sin(t * 0.11), 3);
    yaw.current += delta * motion * (0.05 + 0.13 * surge);

    group.rotation.set(
      0.12 + Math.sin(t * 0.17) * 0.05 * motion + smoothed.current.y * 0.08,
      yaw.current - pending * 1.2 + progress * 0.8 + smoothed.current.x * 0.18,
      -0.08 + Math.sin(t * 0.13 + 1) * 0.04 * motion
    );
    group.scale.setScalar(0.82 + 0.18 * entrance);
    group.position.y = 0.15 + Math.sin(t * 0.45) * 0.06 * motion - pending * 0.4;

    // Each ribbon breathes on its own axis and timing.
    ribbons.current.forEach((ribbon, i) => {
      if (!ribbon) return;
      const def = RIBBONS[i];
      const unfurl = pending * (i % 2 === 0 ? 0.9 : -0.9);
      ribbon.rotation.set(def.rotation[0], def.rotation[1], def.rotation[2]);
      ribbon.rotation[def.sway.axis] += Math.sin(t * def.sway.speed + def.sway.phase) * def.sway.amp * motion + unfurl;
    });

    if (wire.current) {
      wire.current.rotation.set(
        1.28 + Math.sin(t * 0.09) * 0.05 * motion,
        0.2,
        0.32 + t * 0.025 * motion - pending * 0.6
      );
    }

    beads.current.forEach((bead, i) => {
      if (!bead) return;
      const def = BEADS[i];
      bead.position.set(def.position[0], def.position[1] + Math.sin(t * 0.7 + def.phase) * 0.08 * motion, def.position[2]);
    });

    // Highlights drift across the chrome as the studio slowly turns.
    state.scene.environmentRotation.y = 0.4 + t * 0.035 * motion;
    if (redLight.current) {
      redLight.current.position.set(Math.cos(t * 0.2) * 3.2, -0.6, 2.4 + Math.sin(t * 0.2) * 0.8);
    }

    if (!reported.current) {
      reported.current = true;
      onReady();
    }
  });

  return (
    <>
      <pointLight ref={redLight} intensity={high ? 3 : 2.5} distance={6} decay={2} color={BRAND.signal} />

      {/* Backdrop slab with vertical light rods */}
      <mesh geometry={geometries.slab} material={materials.slab} position={[-0.35, 0.55, -2.4]} />
      <mesh geometry={geometries.rod} material={materials.lightRod} position={[0.12, 2.75, -2.25]} scale={[1, 2.6, 1]} />
      <mesh geometry={geometries.rod} material={materials.lightRod} position={[0.38, 2.2, -2.25]} scale={[1, 1.4, 1]} />

      {/* Plinth */}
      <group position={[0, -2.95, 0]}>
        <mesh geometry={geometries.plinth} material={materials.plinth} />
        <mesh geometry={geometries.plinthTop} material={materials.plinthTop} position={[0, 0.85, 0]} rotation={[-Math.PI / 2, 0, 0]} />
        <mesh geometry={geometries.plinthRim} material={materials.chrome} position={[0, 0.85, 0]} rotation={[Math.PI / 2, 0, 0]} />
        <mesh geometry={geometries.baseDisc} material={materials.chrome} position={[0, 0.89, 0]} />
        <mesh geometry={geometries.shadow} material={materials.shadow} position={[0, 0.865, 0]} rotation={[-Math.PI / 2, 0, 0]} />
      </group>

      {PEBBLES.map((p, i) => (
        <mesh key={i} geometry={geometries.bead} material={materials.pebble} position={p.position} scale={p.radius} />
      ))}

      <group ref={wire}>
        <mesh geometry={geometries.wire} material={materials.chrome} />
      </group>

      {/* The sculpture: matte core wrapped in interlaced ribbons */}
      <group ref={sculpture}>
        <mesh geometry={geometries.core} material={materials.core} />
        {RIBBONS.map((_, i) => (
          <group
            key={i}
            ref={(el) => {
              ribbons.current[i] = el;
            }}
          >
            <mesh geometry={geometries.ribbons[i]} material={materials.ribbon} />
          </group>
        ))}
        {BEADS.map((b, i) => (
          <mesh
            key={i}
            ref={(el) => {
              beads.current[i] = el;
            }}
            geometry={geometries.bead}
            material={materials.chrome}
            scale={b.radius}
          />
        ))}
      </group>
    </>
  );
}

export default function HeroScene({ active, reducedMotion, quality, onContextLost, ...rest }: HeroSceneProps) {
  return (
    <Canvas
      frameloop={active && !reducedMotion ? "always" : "demand"}
      dpr={quality === "high" ? [1, 1.75] : [1, 1.25]}
      camera={{ fov: FOV, near: 0.1, far: 80, position: [0, 0.7, 14] }}
      gl={{ antialias: quality === "high", alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        // Neutral tone mapping keeps Signal Red red (ACES pushes it toward orange).
        gl.toneMapping = THREE.NeutralToneMapping;
        gl.domElement.addEventListener("webglcontextlost", onContextLost, { once: true });
      }}
    >
      <StudioEnvironment />
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 6, 5]} intensity={1.4} />
      <Sculpture reducedMotion={reducedMotion} quality={quality} {...rest} />
    </Canvas>
  );
}
