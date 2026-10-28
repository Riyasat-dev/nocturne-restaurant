import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { soundManager } from '../../../audio/SoundEffects';

/**
 * Procedural Grand Entrance Double Doors
 * - Tall dark walnut double doors with beveled architectural panels
 * - Antique brass pull bars and decorative backplates
 * - Dark stone archway / doorframe
 * - Warm golden interior light spilling through threshold
 * - Dynamic door opening animation
 */
export function GrandEntrance({
  isOpen,
  prefersReducedMotion,
  onComplete,
  isMobile,
}) {
  const leftDoorHingeRef = useRef();
  const rightDoorHingeRef = useRef();
  const backLightRef = useRef();
  const seamLightRef = useRef();

  const doorOpenProgress = useRef(0);
  const tweenRef = useRef(null);

  // --- Materials ---
  const walnutMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#22170f'), // Rich deep dark walnut
      roughness: 0.45,
      metalness: 0.08,
    });
  }, []);

  const walnutPanelMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#19100a'), // Slightly darker recessed panel tone
      roughness: 0.52,
      metalness: 0.05,
    });
  }, []);

  const brassMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#b89146'), // Antique brushed brass
      roughness: 0.32,
      metalness: 0.88,
    });
  }, []);

  const stoneFrameMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0c0a09'), // Dark basalt stone portal
      roughness: 0.88,
      metalness: 0.12,
    });
  }, []);

  // Door opening animation trigger
  useEffect(() => {
    if (tweenRef.current) tweenRef.current.kill();

    if (isOpen) {
      soundManager.playDoorOpen();

      if (prefersReducedMotion) {
        doorOpenProgress.current = 1;
        if (onComplete) {
          const timer = setTimeout(onComplete, 800);
          return () => clearTimeout(timer);
        }
      } else {
        // Animate door open over 3.2s
        tweenRef.current = gsap.to(doorOpenProgress, {
          current: 1,
          duration: 3.2,
          ease: 'power2.inOut',
          onComplete: () => {
            if (onComplete) onComplete();
          },
        });
      }
    } else {
      doorOpenProgress.current = 0;
    }

    return () => {
      if (tweenRef.current) tweenRef.current.kill();
    };
  }, [isOpen, prefersReducedMotion, onComplete]);

  // Frame loop for door rotation & dynamic light emission
  useFrame(() => {
    const p = doorOpenProgress.current;

    // Left door rotates outwards/inwards on its outer hinge at x = -1.5
    if (leftDoorHingeRef.current) {
      leftDoorHingeRef.current.rotation.y = -p * (Math.PI * 0.52);
    }

    // Right door rotates opposite on its outer hinge at x = 1.5
    if (rightDoorHingeRef.current) {
      rightDoorHingeRef.current.rotation.y = p * (Math.PI * 0.52);
    }

    // Warm back-light expands as doors open
    if (backLightRef.current) {
      backLightRef.current.intensity = THREE.MathUtils.lerp(1.2, 5.5, p);
    }

    // Seam light fades out as main light takes over
    if (seamLightRef.current) {
      seamLightRef.current.intensity = THREE.MathUtils.lerp(1.8, 0.2, p);
    }
  });

  // Single door panel geometry helper (door leaf width: 1.48, height: 3.8, depth: 0.09)
  const doorWidth = isMobile ? 1.25 : 1.45;
  const doorHeight = 3.8;

  return (
    <group position={[0, 0, 0]}>
      {/* --- Massive Dark Stone Archway / Portal Frame --- */}
      <group position={[0, doorHeight / 2 - 1.2, 0]}>
        {/* Left Stone Jamb */}
        <mesh position={[-doorWidth - 0.22, 0, 0]} material={stoneFrameMat} receiveShadow castShadow>
          <boxGeometry args={[0.44, doorHeight + 0.5, 0.45]} />
        </mesh>
        {/* Right Stone Jamb */}
        <mesh position={[doorWidth + 0.22, 0, 0]} material={stoneFrameMat} receiveShadow castShadow>
          <boxGeometry args={[0.44, doorHeight + 0.5, 0.45]} />
        </mesh>
        {/* Header / Arch Lintel */}
        <mesh position={[0, doorHeight / 2 + 0.22, 0]} material={stoneFrameMat} receiveShadow castShadow>
          <boxGeometry args={[doorWidth * 2 + 0.88, 0.44, 0.48]} />
        </mesh>
        {/* Stone Threshold Saddle */}
        <mesh position={[0, -doorHeight / 2 - 0.05, 0]} material={stoneFrameMat} receiveShadow>
          <boxGeometry args={[doorWidth * 2 + 0.88, 0.1, 0.7]} />
        </mesh>
      </group>

      {/* --- Left Door Assembly (Pivoting at Outer Left Edge) --- */}
      <group
        ref={leftDoorHingeRef}
        position={[-doorWidth, doorHeight / 2 - 1.2, 0]}
      >
        {/* Shift leaf so its outer edge sits precisely on the hinge axis */}
        <group position={[doorWidth / 2, 0, 0]}>
          {/* Main Walnut Door Slab */}
          <mesh material={walnutMaterial} castShadow receiveShadow>
            <boxGeometry args={[doorWidth, doorHeight, 0.09]} />
          </mesh>

          {/* Raised & Beveled Walnut Panels on Face */}
          {/* Top Panel */}
          <mesh position={[0, 1.05, 0.05]} material={walnutPanelMat}>
            <boxGeometry args={[doorWidth * 0.72, 1.15, 0.025]} />
          </mesh>
          {/* Middle Square Panel */}
          <mesh position={[0, 0.15, 0.05]} material={walnutPanelMat}>
            <boxGeometry args={[doorWidth * 0.72, 0.45, 0.025]} />
          </mesh>
          {/* Bottom Tall Panel */}
          <mesh position={[0, -0.95, 0.05]} material={walnutPanelMat}>
            <boxGeometry args={[doorWidth * 0.72, 1.45, 0.025]} />
          </mesh>

          {/* Left Antique Brass Handle & Backplate (near meeting stile) */}
          <group position={[doorWidth / 2 - 0.16, 0.05, 0.07]}>
            {/* Backplate */}
            <mesh material={brassMaterial}>
              <boxGeometry args={[0.07, 0.95, 0.015]} />
            </mesh>
            {/* Standoffs */}
            <mesh position={[0, 0.38, 0.04]} material={brassMaterial}>
              <cylinderGeometry args={[0.016, 0.016, 0.07, 16]} />
            </mesh>
            <mesh position={[0, -0.38, 0.04]} material={brassMaterial}>
              <cylinderGeometry args={[0.016, 0.016, 0.07, 16]} />
            </mesh>
            {/* Long Vertical Pull Bar */}
            <mesh position={[0, 0, 0.08]} material={brassMaterial}>
              <cylinderGeometry args={[0.022, 0.022, 0.88, 20]} />
            </mesh>
          </group>
        </group>
      </group>

      {/* --- Right Door Assembly (Pivoting at Outer Right Edge) --- */}
      <group
        ref={rightDoorHingeRef}
        position={[doorWidth, doorHeight / 2 - 1.2, 0]}
      >
        {/* Shift leaf so its outer edge sits on the hinge axis */}
        <group position={[-doorWidth / 2, 0, 0]}>
          {/* Main Walnut Door Slab */}
          <mesh material={walnutMaterial} castShadow receiveShadow>
            <boxGeometry args={[doorWidth, doorHeight, 0.09]} />
          </mesh>

          {/* Raised & Beveled Walnut Panels */}
          {/* Top Panel */}
          <mesh position={[0, 1.05, 0.05]} material={walnutPanelMat}>
            <boxGeometry args={[doorWidth * 0.72, 1.15, 0.025]} />
          </mesh>
          {/* Middle Square Panel */}
          <mesh position={[0, 0.15, 0.05]} material={walnutPanelMat}>
            <boxGeometry args={[doorWidth * 0.72, 0.45, 0.025]} />
          </mesh>
          {/* Bottom Tall Panel */}
          <mesh position={[0, -0.95, 0.05]} material={walnutPanelMat}>
            <boxGeometry args={[doorWidth * 0.72, 1.45, 0.025]} />
          </mesh>

          {/* Right Antique Brass Handle & Backplate (near meeting stile) */}
          <group position={[-doorWidth / 2 + 0.16, 0.05, 0.07]}>
            {/* Backplate */}
            <mesh material={brassMaterial}>
              <boxGeometry args={[0.07, 0.95, 0.015]} />
            </mesh>
            {/* Standoffs */}
            <mesh position={[0, 0.38, 0.04]} material={brassMaterial}>
              <cylinderGeometry args={[0.016, 0.016, 0.07, 16]} />
            </mesh>
            <mesh position={[0, -0.38, 0.04]} material={brassMaterial}>
              <cylinderGeometry args={[0.016, 0.016, 0.07, 16]} />
            </mesh>
            {/* Long Vertical Pull Bar */}
            <mesh position={[0, 0, 0.08]} material={brassMaterial}>
              <cylinderGeometry args={[0.022, 0.022, 0.88, 20]} />
            </mesh>
          </group>
        </group>
      </group>

      {/* --- Golden Interior Light Sources Behind Doors --- */}
      {/* Radiant point light in the threshold hall */}
      <pointLight
        ref={backLightRef}
        position={[0, 1.2, -1.8]}
        color="#ffad42"
        intensity={1.2}
        distance={16}
        decay={2}
        castShadow
        shadow-bias={-0.001}
      />

      {/* Linear slit light along the center door seam before opening */}
      <spotLight
        ref={seamLightRef}
        position={[0, 1.5, -0.8]}
        target-position={[0, 0, 0.5]}
        color="#ffc875"
        intensity={1.8}
        angle={Math.PI / 6}
        penumbra={0.9}
        distance={6}
      />

      {/* Subtle floor in front of doors */}
      <mesh position={[0, -1.25, 2.0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 10]} />
        <meshStandardMaterial color="#080706" roughness={0.9} metalness={0.1} />
      </mesh>
    </group>
  );
}
