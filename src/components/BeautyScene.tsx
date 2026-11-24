"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import { useRef, useState } from "react";
import type { Group } from "three";

function SculpturalBottle() {
  const group = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!group.current) return;
    const targetX = state.pointer.x * 0.22;
    const targetY = state.pointer.y * 0.14;
    group.current.rotation.y += (targetX - group.current.rotation.y) * 0.04;
    group.current.rotation.x += (-targetY - group.current.rotation.x) * 0.04;
  });

  return (
    <Float speed={1.35} rotationIntensity={0.12} floatIntensity={0.7}>
      <group
        ref={group}
        scale={hovered ? 1.05 : 1}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <mesh position={[0, -0.2, 0]} castShadow>
          <cylinderGeometry args={[1.22, 1.38, 3.15, 64, 1, false]} />
          <meshStandardMaterial
            color="#cdb08a"
            roughness={0.16}
            metalness={0.45}
          />
        </mesh>
        <mesh position={[0, 1.76, 0]} castShadow>
          <cylinderGeometry args={[0.78, 0.78, 0.38, 64]} />
          <meshStandardMaterial color="#171514" roughness={0.22} metalness={0.7} />
        </mesh>
        <mesh position={[0, 2.28, 0]} castShadow>
          <boxGeometry args={[1.05, 0.68, 0.72]} />
          <meshStandardMaterial color="#c5a477" roughness={0.2} metalness={0.7} />
        </mesh>
        <mesh position={[0, -0.1, 0.005]}>
          <cylinderGeometry args={[1.05, 1.18, 2.72, 64]} />
          <MeshTransmissionMaterial
            backside
            samples={2}
            resolution={128}
            thickness={0.18}
            transmission={0.68}
            roughness={0.08}
            chromaticAberration={0.02}
            color="#e7cda4"
          />
        </mesh>
        <mesh position={[0, 0.2, 1.2]} rotation={[0, 0, 0]}>
          <planeGeometry args={[1.25, 1]} />
          <meshStandardMaterial color="#211714" roughness={0.7} metalness={0.1} />
        </mesh>
      </group>
    </Float>
  );
}

export default function BeautyScene() {
  return (
    <Canvas
      dpr={[1, 1.25]}
      camera={{ position: [0, 0.2, 7], fov: 36 }}
      gl={{ antialias: true, alpha: true }}
      fallback={<div className="scene-fallback" aria-hidden="true"><span /></div>}
    >
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 6, 5]} intensity={3.2} castShadow />
      <pointLight position={[-4, 1, 3]} intensity={12} color="#c5a477" />
      <SculpturalBottle />
    </Canvas>
  );
}
