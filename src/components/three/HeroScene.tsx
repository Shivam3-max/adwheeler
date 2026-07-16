"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, Text, ContactShadows } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

/* ---- LED advertisements that cycle on the screen -------------------------- */
const ADS = [
  { line1: "YOUR AD", line2: "HERE", bg: "#1358d8", fg: "#ffffff" },
  { line1: "ELITE", line2: "OUTFITS", bg: "#c81e5a", fg: "#ffe9a8" },
  { line1: "SUPER DAN", line2: "PIZZA", bg: "#e2b100", fg: "#3a1d00" },
  { line1: "MOVE YOUR", line2: "BRAND", bg: "#0a8f83", fg: "#eafffb" },
];

function AdScreen({ w = 2.1, h = 1.35, z = 0, rotY = 0 }: { w?: number; h?: number; z?: number; rotY?: number }) {
  const [idx, setIdx] = useState(0);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const t = useRef(0);

  useFrame((_, delta) => {
    t.current += delta;
    if (t.current > 2.6) {
      t.current = 0;
      setIdx((i) => (i + 1) % ADS.length);
    }
  });

  const ad = ADS[idx];
  return (
    <group position={[0, 0, z]} rotation={[0, rotY, 0]}>
      <mesh>
        <planeGeometry args={[w, h]} />
        <meshStandardMaterial
          ref={matRef}
          color={ad.bg}
          emissive={ad.bg}
          emissiveIntensity={1.5}
          toneMapped={false}
        />
      </mesh>
      <Text
        position={[0, 0.22, 0.02]}
        fontSize={0.3}
        color={ad.fg}
        anchorX="center"
        anchorY="middle"
        letterSpacing={-0.02}
        font={undefined}
      >
        {ad.line1}
      </Text>
      <Text position={[0, -0.16, 0.02]} fontSize={0.36} color={ad.fg} anchorX="center" anchorY="middle">
        {ad.line2}
      </Text>
    </group>
  );
}

/* ---- The AD Wheeler vehicle (stylised from primitives) -------------------- */
function Vehicle() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.02;
  });

  const bodyMat = <meshStandardMaterial color="#f2b02a" metalness={0.5} roughness={0.35} />;

  return (
    <group ref={group} position={[0, 0.02, 0]}>
      {/* chassis / cabin */}
      <mesh position={[0, 0.55, 1.15]} castShadow>
        <boxGeometry args={[1.35, 1.0, 0.9]} />
        {bodyMat}
      </mesh>
      {/* windshield */}
      <mesh position={[0, 0.7, 1.62]}>
        <boxGeometry args={[1.15, 0.55, 0.05]} />
        <meshStandardMaterial color="#0a1a2a" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* LED box (the billboard body) */}
      <mesh position={[0, 0.95, -0.35]} castShadow>
        <boxGeometry args={[1.55, 1.7, 1.9]} />
        <meshStandardMaterial color="#161616" metalness={0.4} roughness={0.5} />
      </mesh>
      {/* roof cap */}
      <mesh position={[0, 1.9, -0.35]}>
        <boxGeometry args={[1.62, 0.12, 1.98]} />
        <meshStandardMaterial color="#0d0d0d" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* screens on 3 sides */}
      <AdScreen z={0} rotY={0} />
      <group position={[0, 0.95, -0.35]}>
        <group position={[0.79, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <AdScreen />
        </group>
        <group position={[-0.79, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <AdScreen />
        </group>
        <group position={[0, 0, -0.96]} rotation={[0, Math.PI, 0]}>
          <AdScreen />
        </group>
      </group>

      {/* wheels */}
      {[
        [0.75, 1.0],
        [-0.75, 1.0],
        [0.72, -0.9],
        [-0.72, -0.9],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.05, z]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.28, 0.28, 0.2, 20]} />
          <meshStandardMaterial color="#111214" roughness={0.7} />
        </mesh>
      ))}

      {/* headlight glow */}
      <pointLight position={[0, 0.6, 2.1]} color="#fff3d6" intensity={6} distance={6} />
    </group>
  );
}

/* ---- Stylised night skyline ---------------------------------------------- */
function City() {
  const buildings = useMemo(() => {
    const arr: { pos: [number, number, number]; scale: [number, number, number]; lit: boolean }[] = [];
    const rng = mulberry32(7);
    for (let i = 0; i < 46; i++) {
      const angle = rng() * Math.PI * 2;
      const radius = 8 + rng() * 16;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius - 4;
      const h = 2 + rng() * 9;
      arr.push({
        pos: [x, h / 2 - 0.5, z],
        scale: [1 + rng() * 1.6, h, 1 + rng() * 1.6],
        lit: rng() > 0.55,
      });
    }
    return arr;
  }, []);

  return (
    <group>
      {buildings.map((b, i) => (
        <mesh key={i} position={b.pos} scale={b.scale}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#0c1018"
            emissive={b.lit ? "#ff9e1b" : "#123047"}
            emissiveIntensity={b.lit ? 0.28 : 0.14}
            metalness={0.2}
            roughness={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ---- Camera rig: slow orbit + subtle mouse parallax ---------------------- */
function Rig() {
  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.12;
    const mx = state.pointer.x * 0.6;
    const my = state.pointer.y * 0.3;
    const r = 6.4;
    state.camera.position.x = Math.sin(t) * r + mx;
    state.camera.position.z = Math.cos(t) * r;
    state.camera.position.y = 2.6 + my;
    state.camera.lookAt(0, 0.9, 0);
  });
  return null;
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [6, 2.6, 4], fov: 42 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#07070a"]} />
      <fog attach="fog" args={["#07070a", 9, 30]} />

      <ambientLight intensity={0.25} />
      <directionalLight position={[6, 10, 4]} intensity={0.5} color="#8fb4ff" />
      <pointLight position={[-6, 4, -6]} intensity={30} color="#38e5df" distance={22} />
      <pointLight position={[6, 3, 6]} intensity={26} color="#ff9e1b" distance={22} />

      <Vehicle />
      <City />

      <ContactShadows position={[0, -0.02, 0]} opacity={0.55} scale={16} blur={2.6} far={6} />
      <Sparkles count={60} scale={[18, 6, 18]} size={2} speed={0.25} color="#ffcf7a" opacity={0.5} />

      <Rig />
    </Canvas>
  );
}

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
