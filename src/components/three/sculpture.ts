import * as THREE from "three";
import { BRAND } from "@/lib/design-tokens";

/**
 * Procedural building blocks for the hero sculpture. Everything here is
 * generated once at mount — no per-frame allocation, no external assets.
 */

export interface RibbonSpec {
  /** Start angle around the core (radians). */
  start: number;
  /** Angle travelled around the core (radians). */
  sweep: number;
  /** Distance of the ribbon's spine from the core centre. */
  radius: number;
  /** Extra radius at the middle of the sweep. */
  swell: number;
  /** Vertical wave amplitude of the spine. */
  lift: number;
  /** Number of vertical waves over the sweep. */
  waves: number;
  /** Half-width at the middle and at the flared ends. */
  width: [mid: number, ends: number];
  /** Cross-section rotation at the start, and added over the length (radians). */
  twistStart: number;
  twist: number;
  /** How strongly the cross-section cups (0 = flat band). */
  curl: number;
  /** Portion of the length (0–1) over which Signal Red blooms. */
  red: [from: number, to: number];
}

const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = THREE.MathUtils.clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};

/**
 * Sweeps a flaring, twisting, cupped band around the core — the flowing
 * "petal" forms of the reference sculpture. Vertex colours carry the
 * charcoal → silver edge → Signal Red bloom so one material serves every ribbon.
 */
export function createRibbonGeometry(spec: RibbonSpec, segmentsU: number, segmentsV: number) {
  const vertsU = segmentsU + 1;
  const vertsV = segmentsV + 1;
  const positions = new Float32Array(vertsU * vertsV * 3);
  const colors = new Float32Array(vertsU * vertsV * 3);
  const uvs = new Float32Array(vertsU * vertsV * 2);

  const charcoal = new THREE.Color("#2a2a2a");
  const silver = new THREE.Color(BRAND.silver);
  const signal = new THREE.Color(BRAND.signal);
  const mixed = new THREE.Color();

  const spine = new THREE.Vector3();
  const ahead = new THREE.Vector3();
  const tangent = new THREE.Vector3();
  const outward = new THREE.Vector3();
  const binormal = new THREE.Vector3();
  const normal = new THREE.Vector3();
  const across = new THREE.Vector3();
  const surface = new THREE.Vector3();

  const spineAt = (u: number, out: THREE.Vector3) => {
    const angle = spec.start + u * spec.sweep;
    const r = spec.radius + spec.swell * Math.sin(Math.PI * u);
    return out.set(r * Math.cos(angle), spec.lift * Math.sin(u * spec.waves * Math.PI * 2), r * Math.sin(angle));
  };

  for (let i = 0; i < vertsU; i++) {
    const u = i / segmentsU;
    spineAt(u, spine);
    const eps = 1e-3;
    if (u + eps <= 1) spineAt(u + eps, ahead).sub(spine);
    else ahead.copy(spine).sub(spineAt(u - eps, ahead));
    tangent.copy(ahead).normalize();

    outward.set(spine.x, 0, spine.z).normalize();
    binormal.crossVectors(tangent, outward).normalize();
    normal.crossVectors(binormal, tangent).normalize();

    const theta = spec.twistStart + u * spec.twist;
    across.copy(binormal).multiplyScalar(Math.cos(theta)).addScaledVector(normal, Math.sin(theta));
    surface.copy(binormal).multiplyScalar(-Math.sin(theta)).addScaledVector(normal, Math.cos(theta));

    // Wide, flared ends with a narrower waist; rounded off at the very tips.
    const flare = Math.pow(Math.abs(2 * u - 1), 1.6);
    const tip = Math.sqrt(THREE.MathUtils.clamp(Math.sin(Math.PI * u) * 5, 0, 1));
    const halfWidth = (spec.width[0] + (spec.width[1] - spec.width[0]) * flare) * tip;

    const redAlong = smoothstep(spec.red[0], spec.red[1], u);

    for (let j = 0; j < vertsV; j++) {
      const v = (j / segmentsV) * 2 - 1;
      const k = (i * vertsV + j) * 3;
      positions[k] = spine.x + across.x * v * halfWidth + surface.x * spec.curl * halfWidth * v * v;
      positions[k + 1] = spine.y + across.y * v * halfWidth + surface.y * spec.curl * halfWidth * v * v;
      positions[k + 2] = spine.z + across.z * v * halfWidth + surface.z * spec.curl * halfWidth * v * v;

      // Silver catches both edges; red blooms only along one edge of part of the length.
      const silverEdge = smoothstep(0.35, 1, Math.abs(v)) * 0.9;
      const red = redAlong * smoothstep(0.15, 0.95, v) * 0.85;
      mixed.copy(charcoal).lerp(silver, silverEdge).lerp(signal, red);
      colors[k] = mixed.r;
      colors[k + 1] = mixed.g;
      colors[k + 2] = mixed.b;

      const t = (i * vertsV + j) * 2;
      uvs[t] = u;
      uvs[t + 1] = j / segmentsV;
    }
  }

  const indices: number[] = [];
  for (let i = 0; i < segmentsU; i++) {
    for (let j = 0; j < segmentsV; j++) {
      const a = i * vertsV + j;
      const b = (i + 1) * vertsV + j;
      indices.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

/** Fine machined grooves running along each ribbon, used as a bump map. */
export function createGrooveTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 4;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    for (let y = 0; y < canvas.height; y++) {
      const value = Math.round(128 + 110 * Math.sin((y / canvas.height) * Math.PI * 2 * 48));
      ctx.fillStyle = `rgb(${value},${value},${value})`;
      ctx.fillRect(0, y, canvas.width, 1);
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

/** Soft radial contact shadow drawn into a tiny canvas. */
export function createShadowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, "rgba(10, 10, 10, 0.65)");
    gradient.addColorStop(0.5, "rgba(10, 10, 10, 0.2)");
    gradient.addColorStop(1, "rgba(10, 10, 10, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
  }
  return new THREE.CanvasTexture(canvas);
}

/**
 * A dark studio with a few bright softboxes and one Signal Red panel.
 * Pre-filtered into an environment map, it gives black chrome its crisp
 * silver streaks and the controlled red reflections — with zero lights cost.
 */
export function createStudioEnvironment(renderer: THREE.WebGLRenderer) {
  const scene = new THREE.Scene();
  // Mid-grey walls: dark base colours still read as black chrome, while
  // silver-tinted areas and chrome trims pick up a visible metallic grey.
  scene.background = new THREE.Color("#4a4a4a");
  const panel = new THREE.PlaneGeometry(1, 1);
  const materials: THREE.Material[] = [];

  const addPanel = (color: THREE.ColorRepresentation, intensity: number, position: [number, number, number], scale: [number, number]) => {
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color).multiplyScalar(intensity),
      side: THREE.DoubleSide,
      toneMapped: false,
    });
    materials.push(material);
    const mesh = new THREE.Mesh(panel, material);
    mesh.position.set(...position);
    mesh.scale.set(scale[0], scale[1], 1);
    mesh.lookAt(0, 0, 0);
    scene.add(mesh);
  };

  addPanel("#ffffff", 4, [0, 7, 1], [9, 3]); // overhead softbox
  addPanel("#ffffff", 3.0, [-7, 1, 3], [1.4, 8]); // tall left strip
  addPanel("#ffffff", 1.6, [7, 2, -2], [0.8, 6]); // thin right strip
  addPanel("#ffffff", 1.1, [0, 0.5, -8], [7, 0.5]); // rear rim line
  addPanel("#f2f2f2", 0.9, [0, -6, 3], [10, 4]); // low fill so blacks keep shape
  addPanel(BRAND.signal, 1.4, [6, -1.5, 5], [1.6, 3.2]); // narrow Signal Red panel

  const pmrem = new THREE.PMREMGenerator(renderer);
  const texture = pmrem.fromScene(scene, 0.035).texture;
  pmrem.dispose();
  panel.dispose();
  materials.forEach((m) => m.dispose());
  return texture;
}
