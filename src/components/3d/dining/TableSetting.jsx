import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

/**
 * Procedural Luxury Fine-Dining Table Setting
 * Composed of:
 * 1. Dark walnut pedestal table with beveled edge
 * 2. Elegant upholstered dining chairs with brass leg caps
 * 3. Antique brass candlestick centerpiece with flickering flame
 * 4. Fine crystal glassware with transmission
 * 5. Charger plates with gold rims & folded linen
 */
export function TableSetting({
  position = [0, -1.2, 0],
  rotation = [0, 0, 0],
  isRound = true,
  tableScale = 1,
}) {
  const candleFlameRef = useRef();
  const candleLightRef = useRef();

  // --- Materials ---
  const walnutTopMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#251a12'), // Rich dark walnut
      roughness: 0.38,
      metalness: 0.08,
    });
  }, []);

  const upholsteryMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#141312'), // Deep charcoal velvet
      roughness: 0.85,
      metalness: 0.04,
    });
  }, []);

  const chairLegMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1c140e'), // Dark walnut legs
      roughness: 0.5,
      metalness: 0.1,
    });
  }, []);

  const brassTrimMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#c59f4e'), // Antique gold/brass
      roughness: 0.3,
      metalness: 0.9,
    });
  }, []);

  const glassMat = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#ffffff'),
      transmission: 0.94,
      roughness: 0.04,
      ior: 1.52,
      thickness: 0.04,
      transparent: true,
      opacity: 1,
    });
  }, []);

  const chargerPlateMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1a1816'), // Matte charcoal slate
      roughness: 0.7,
      metalness: 0.15,
    });
  }, []);

  const linenMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#e8e2d5'), // Natural folded linen
      roughness: 0.9,
      metalness: 0.02,
    });
  }, []);

  const flameMat = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color('#ffc155'),
      transparent: true,
      opacity: 0.98,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  // Frame loop for candlelight flicker
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const f1 = Math.sin(time * 13.0) * 0.08;
    const f2 = Math.cos(time * 24.5) * 0.04;
    const noise = f1 + f2;

    if (candleFlameRef.current) {
      candleFlameRef.current.scale.set(1 + noise * 0.4, 1 + noise * 0.8, 1 + noise * 0.4);
      candleFlameRef.current.rotation.z = noise * 0.1;
    }

    if (candleLightRef.current) {
      candleLightRef.current.intensity = 1.3 + noise * 0.3;
    }
  });

  return (
    <group position={position} rotation={rotation} scale={tableScale}>
      {/* --- Table Base & Pedestal --- */}
      {isRound ? (
        <group>
          {/* Round Top */}
          <mesh position={[0, 0.75, 0]} material={walnutTopMat} receiveShadow castShadow>
            <cylinderGeometry args={[0.9, 0.9, 0.045, 40]} />
          </mesh>
          {/* Top Bevel Edge Rim */}
          <mesh position={[0, 0.73, 0]} material={brassTrimMat}>
            <torusGeometry args={[0.902, 0.008, 12, 40]} />
          </mesh>
          {/* Center Fluted Pedestal */}
          <mesh position={[0, 0.36, 0]} material={walnutTopMat} castShadow>
            <cylinderGeometry args={[0.08, 0.16, 0.72, 24]} />
          </mesh>
          {/* Heavy Base Foot */}
          <mesh position={[0, 0.02, 0]} material={brassTrimMat} receiveShadow>
            <cylinderGeometry args={[0.38, 0.42, 0.04, 32]} />
          </mesh>
        </group>
      ) : (
        <group>
          {/* Rectangular Top */}
          <mesh position={[0, 0.75, 0]} material={walnutTopMat} receiveShadow castShadow>
            <boxGeometry args={[1.8, 0.045, 0.95]} />
          </mesh>
          {/* 4 Tapered Legs */}
          {[-0.8, 0.8].map((x) =>
            [-0.38, 0.38].map((z) => (
              <group key={`leg-${x}-${z}`} position={[x, 0.36, z]}>
                <mesh material={chairLegMat} castShadow>
                  <cylinderGeometry args={[0.03, 0.02, 0.72, 12]} />
                </mesh>
                <mesh position={[0, -0.34, 0]} material={brassTrimMat}>
                  <cylinderGeometry args={[0.022, 0.02, 0.06, 12]} />
                </mesh>
              </group>
            ))
          )}
        </group>
      )}

      {/* --- Centerpiece Candlestick with Living Flame --- */}
      <group position={[0, 0.78, 0]}>
        {/* Brass Candle Base */}
        <mesh material={brassTrimMat}>
          <cylinderGeometry args={[0.06, 0.08, 0.03, 20]} />
        </mesh>
        {/* Brass Stem */}
        <mesh position={[0, 0.12, 0]} material={brassTrimMat}>
          <cylinderGeometry args={[0.015, 0.022, 0.22, 16]} />
        </mesh>
        {/* Wax Candle */}
        <mesh position={[0, 0.32, 0]}>
          <cylinderGeometry args={[0.018, 0.018, 0.2, 16]} />
          <meshStandardMaterial color="#f6f0df" roughness={0.7} />
        </mesh>
        {/* Wick */}
        <mesh position={[0, 0.43, 0]}>
          <cylinderGeometry args={[0.003, 0.003, 0.02, 8]} />
          <meshStandardMaterial color="#1f1b16" roughness={0.9} />
        </mesh>
        {/* Teardrop Flame */}
        <mesh ref={candleFlameRef} position={[0, 0.46, 0]} material={flameMat}>
          <coneGeometry args={[0.02, 0.07, 12]} />
        </mesh>

        {/* Dynamic Warm Candlelight */}
        <pointLight
          ref={candleLightRef}
          position={[0, 0.5, 0]}
          color="#ffaa44"
          intensity={1.3}
          distance={4.2}
          decay={2}
          castShadow
          shadow-bias={-0.001}
        />
      </group>

      {/* --- Tableware Settings (2 or 4 place settings) --- */}
      {[-0.55, 0.55].map((xOffset, idx) => (
        <group key={`setting-${idx}`} position={[xOffset, 0.78, 0]}>
          {/* Charger Plate */}
          <mesh material={chargerPlateMat} receiveShadow>
            <cylinderGeometry args={[0.18, 0.18, 0.012, 24]} />
          </mesh>
          {/* Gold rim on charger */}
          <mesh position={[0, 0.008, 0]} material={brassTrimMat}>
            <torusGeometry args={[0.18, 0.005, 8, 24]} />
          </mesh>
          {/* Folded Linen Napkin */}
          <mesh position={[0, 0.015, 0]} material={linenMat}>
            <boxGeometry args={[0.09, 0.01, 0.16]} />
          </mesh>
          {/* Crystal Wine Glass */}
          <group position={[0.16, 0, -0.1]}>
            {/* Base */}
            <mesh material={glassMat}>
              <cylinderGeometry args={[0.04, 0.04, 0.005, 16]} />
            </mesh>
            {/* Stem */}
            <mesh position={[0, 0.06, 0]} material={glassMat}>
              <cylinderGeometry args={[0.004, 0.004, 0.11, 8]} />
            </mesh>
            {/* Bowl */}
            <mesh position={[0, 0.14, 0]} material={glassMat}>
              <cylinderGeometry args={[0.038, 0.015, 0.09, 16, 1, true]} />
            </mesh>
          </group>
        </group>
      ))}

      {/* --- Flanking Upholstered Chairs --- */}
      {[
        { x: -1.2, z: 0, rotY: Math.PI / 2 },
        { x: 1.2, z: 0, rotY: -Math.PI / 2 },
      ].map((chair, i) => (
        <group key={`chair-${i}`} position={[chair.x, 0, chair.z]} rotation={[0, chair.rotY, 0]}>
          {/* Seat Cushion */}
          <mesh position={[0, 0.44, 0]} material={upholsteryMat} castShadow>
            <boxGeometry args={[0.46, 0.08, 0.46]} />
          </mesh>
          {/* Curved Backrest */}
          <mesh position={[0, 0.82, -0.2]} material={upholsteryMat} castShadow>
            <boxGeometry args={[0.44, 0.72, 0.06]} />
          </mesh>
          {/* Brass Backrest Top Rail */}
          <mesh position={[0, 1.18, -0.2]} material={brassTrimMat}>
            <cylinderGeometry args={[0.012, 0.012, 0.46, 12]} rotation={[0, 0, Math.PI / 2]} />
          </mesh>
          {/* 4 Chair Legs with Brass Caps */}
          {[-0.18, 0.18].map((lx) =>
            [-0.18, 0.18].map((lz) => (
              <group key={`chleg-${lx}-${lz}`} position={[lx, 0.2, lz]}>
                <mesh material={chairLegMat} castShadow>
                  <cylinderGeometry args={[0.018, 0.012, 0.42, 10]} />
                </mesh>
                <mesh position={[0, -0.18, 0]} material={brassTrimMat}>
                  <cylinderGeometry args={[0.015, 0.012, 0.06, 10]} />
                </mesh>
              </group>
            ))
          )}
        </group>
      ))}
    </group>
  );
}
