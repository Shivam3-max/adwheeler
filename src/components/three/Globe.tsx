"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function latLngToVec3(lat: number, lng: number, r: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

const TERRITORIES = [
  [28.6, 77.2], [19.0, 72.8], [13.0, 80.2], [12.9, 77.5], // India
  [24.7, 46.7], [25.2, 55.2], // Gulf
  [1.35, 103.8], [3.1, 101.6], // SEA
  [51.5, -0.1], [40.7, -74.0], // future
];

function GlobeMesh() {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.12;
  });

  const points = useMemo(
    () => TERRITORIES.map(([lat, lng]) => latLngToVec3(lat, lng, 2.02)),
    []
  );

  return (
    <group ref={group} rotation={[0.35, 0, 0.1]}>
      <mesh>
        <sphereGeometry args={[2, 48, 48]} />
        <meshStandardMaterial
          color="#0b1220"
          emissive="#0a1a2a"
          emissiveIntensity={0.4}
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.005, 24, 24]} />
        <meshBasicMaterial color="#1d3a52" wireframe transparent opacity={0.28} />
      </mesh>
      {points.map((p, i) => (
        <group key={i} position={p}>
          <mesh>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshBasicMaterial color={i < 4 ? "#ff9e1b" : "#38e5df"} toneMapped={false} />
          </mesh>
          <mesh>
            <ringGeometry args={[0.06, 0.09, 20]} />
            <meshBasicMaterial
              color={i < 4 ? "#ff9e1b" : "#38e5df"}
              transparent
              opacity={0.5}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function Globe() {
  return (
    <Canvas dpr={[1, 1.6]} camera={{ position: [0, 0, 6], fov: 40 }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 3, 5]} intensity={40} color="#ff9e1b" distance={20} />
      <pointLight position={[-5, -2, 3]} intensity={30} color="#38e5df" distance={20} />
      <GlobeMesh />
    </Canvas>
  );
}
