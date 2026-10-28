import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

/**
 * Antique Brass Ring Chandelier
 * Suspended brass crown holding warm candle fixtures with subtle flame flicker
 */
export function Chandelier({ position = [0, 3.2, 0] }) {
  const candlesGroupRef = useRef();
  const lightRef = useRef();

  const brassMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#b89146'),
      roughness: 0.35,
      metalness: 0.85,
    });
  }, []);

  const candleWaxMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#f5eedc'),
      roughness: 0.7,
      metalness: 0.05,
    });
  }, []);

  const flameMat = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color('#ffc866'),
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  // 6 candle sockets arranged radially on a 1.2m diameter brass ring
  const numCandles = 6;
  const radius = 0.95;
  const candlePositions = useMemo(() => {
    const list = [];
    for (let i = 0; i < numCandles; i++) {
      const angle = (i / numCandles) * Math.PI * 2;
      list.push([Math.cos(angle) * radius, 0.12, Math.sin(angle) * radius]);
    }
    return list;
  }, [numCandles, radius]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Subtle organic flame flicker
    const flicker = Math.sin(time * 11) * 0.08 + Math.sin(time * 23 + 1.2) * 0.04;

    if (lightRef.current) {
      lightRef.current.intensity = 1.6 + flicker * 0.3;
    }

    if (candlesGroupRef.current) {
      candlesGroupRef.current.children.forEach((candle, idx) => {
        const flame = candle.children[2]; // flame mesh
        if (flame) {
          flame.scale.y = 1 + Math.sin(time * 14 + idx) * 0.12;
        }
      });
    }
  });

  return (
    <group position={position}>
      {/* Suspension Rod from ceiling */}
      <mesh position={[0, 0.8, 0]} material={brassMat}>
        <cylinderGeometry args={[0.018, 0.018, 1.6, 12]} />
      </mesh>

      {/* Center Brass Hub */}
      <mesh position={[0, 0, 0]} material={brassMat}>
        <cylinderGeometry args={[0.14, 0.14, 0.08, 24]} />
      </mesh>

      {/* Main Chandelier Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} material={brassMat}>
        <torusGeometry args={[radius, 0.024, 16, 48]} />
      </mesh>

      {/* Radial Support Arms from center to ring */}
      {candlePositions.map((pos, idx) => {
        const angle = (idx / numCandles) * Math.PI * 2;
        return (
          <group key={`arm-${idx}`} rotation={[0, -angle, 0]}>
            <mesh position={[radius / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={brassMat}>
              <cylinderGeometry args={[0.012, 0.012, radius, 12]} />
            </mesh>
          </group>
        );
      })}

      {/* Candle Sockets & Flames */}
      <group ref={candlesGroupRef}>
        {candlePositions.map((pos, idx) => (
          <group key={`candle-${idx}`} position={pos}>
            {/* Brass Bobeche / Cup */}
            <mesh material={brassMat} position={[0, 0, 0]}>
              <cylinderGeometry args={[0.05, 0.03, 0.04, 16]} />
            </mesh>
            {/* Wax Candle */}
            <mesh material={candleWaxMat} position={[0, 0.12, 0]}>
              <cylinderGeometry args={[0.022, 0.022, 0.22, 16]} />
            </mesh>
            {/* Teardrop Flame */}
            <mesh material={flameMat} position={[0, 0.27, 0]}>
              <coneGeometry args={[0.025, 0.08, 12]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Warm Diffuse Chandelier Point Light */}
      <pointLight
        ref={lightRef}
        position={[0, 0.35, 0]}
        color="#ffba5a"
        intensity={1.8}
        distance={9}
        decay={2}
        castShadow
        shadow-bias={-0.001}
      />
    </group>
  );
}
