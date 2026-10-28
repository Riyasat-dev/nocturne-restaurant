import { useMemo } from 'react';
import * as THREE from 'three';
import { TableSetting } from './TableSetting';
import { Chandelier } from './Chandelier';
import { DustParticles } from '../DustParticles';

/**
 * 3D Fine-Dining Restaurant Salon
 * Dark walnut flooring, architectural niches, multiple dining settings,
 * antique brass chandeliers, and intimate candlelight atmosphere.
 */
export function DiningHall({ isMobile }) {
  // --- Materials ---
  const floorMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#140f0b'), // Polished dark walnut floor
      roughness: 0.5,
      metalness: 0.12,
    });
  }, []);

  const backWallMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0b0907'), // Deep charcoal architectural paneling
      roughness: 0.85,
      metalness: 0.05,
    });
  }, []);

  const archNicheMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#070605'), // Recessed shadowed alcove
      roughness: 0.95,
      metalness: 0.02,
    });
  }, []);

  const brassTrimMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#b89146'),
      roughness: 0.35,
      metalness: 0.85,
    });
  }, []);

  return (
    <group position={[0, 0, 0]}>
      {/* --- Polished Dark Walnut Parquet Floor --- */}
      <mesh
        position={[0, -1.22, -2]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
        material={floorMaterial}
      >
        <planeGeometry args={[26, 32]} />
      </mesh>

      {/* --- Rear Architectural Feature Wall with Arched Niches --- */}
      <group position={[0, 1.5, -8.5]}>
        {/* Main Wall Face */}
        <mesh material={backWallMaterial} receiveShadow>
          <boxGeometry args={[24, 6.5, 0.4]} />
        </mesh>

        {/* 3 Symmetrical Arched Sommelier Alcoves */}
        {[-4.5, 0, 4.5].map((x, i) => (
          <group key={`alcove-${i}`} position={[x, -0.2, 0.15]}>
            <mesh material={archNicheMaterial}>
              <boxGeometry args={[2.4, 4.2, 0.2]} />
            </mesh>
            {/* Brass Alcove Trim */}
            <mesh position={[0, 2.1, 0.1]} material={brassTrimMat}>
              <boxGeometry args={[2.46, 0.06, 0.04]} />
            </mesh>
            {/* Subtle Amber Alcove Uplight */}
            <pointLight
              position={[0, -1.2, 0.4]}
              color="#d98938"
              intensity={0.65}
              distance={4}
              decay={2}
            />
          </group>
        ))}
      </group>

      {/* --- Side Walls --- */}
      <mesh position={[-9.5, 1.5, -2]} rotation={[0, Math.PI / 2, 0]} material={backWallMaterial} receiveShadow>
        <planeGeometry args={[24, 7]} />
      </mesh>
      <mesh position={[9.5, 1.5, -2]} rotation={[0, -Math.PI / 2, 0]} material={backWallMaterial} receiveShadow>
        <planeGeometry args={[24, 7]} />
      </mesh>

      {/* --- Ceiling with Dark Coffered Beams --- */}
      <group position={[0, 4.6, -2]}>
        <mesh material={backWallMaterial}>
          <planeGeometry args={[26, 32]} rotation={[Math.PI / 2, 0, 0]} />
        </mesh>
        {/* Longitudinal Beams */}
        {[-4, 0, 4].map((bx) => (
          <mesh key={`beam-${bx}`} position={[bx, -0.2, 0]} material={floorMaterial}>
            <boxGeometry args={[0.3, 0.4, 28]} />
          </mesh>
        ))}
      </group>

      {/* --- Antique Brass Chandeliers --- */}
      <Chandelier position={[0, 3.2, 0.5]} />
      <Chandelier position={[0, 3.2, -4.8]} />

      {/* --- Fine-Dining Table Settings --- */}
      {/* 1. Centerpiece Grand Round VIP Table */}
      <TableSetting
        position={[0, -1.2, 0]}
        rotation={[0, 0, 0]}
        isRound={true}
        tableScale={isMobile ? 0.85 : 1.0}
      />

      {/* 2. Left Flanking Table */}
      <TableSetting
        position={[-3.2, -1.2, -2.6]}
        rotation={[0, Math.PI / 6, 0]}
        isRound={false}
        tableScale={isMobile ? 0.75 : 0.95}
      />

      {/* 3. Right Flanking Table */}
      <TableSetting
        position={[3.2, -1.2, -2.6]}
        rotation={[0, -Math.PI / 6, 0]}
        isRound={false}
        tableScale={isMobile ? 0.75 : 0.95}
      />

      {/* 4. Deep Background Tables creating vast restaurant depth */}
      <TableSetting
        position={[-2.4, -1.2, -5.6]}
        rotation={[0, 0, 0]}
        isRound={true}
        tableScale={0.8}
      />
      <TableSetting
        position={[2.4, -1.2, -5.6]}
        rotation={[0, 0, 0]}
        isRound={true}
        tableScale={0.8}
      />

      {/* --- Controlled Salon Atmospheric Lighting --- */}
      {/* Deep contrast ambient light */}
      <ambientLight intensity={0.18} color="#151210" />

      {/* Subtle cool-slate architectural rim fill from rear */}
      <directionalLight
        position={[0, 5, -8]}
        intensity={0.35}
        color="#8f9bb3"
      />

      {/* Floating Dining Salon Dust Particles */}
      <DustParticles count={isMobile ? 100 : 160} isAwakened={true} />
    </group>
  );
}
