import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

/**
 * Procedural Antique Brass Oil Lamp
 * Composed of:
 * 1. Turned brass base and oil font (reservoir)
 * 2. Burner collar with wick regulator thumbwheel
 * 3. Ornate Victorian scroll handle
 * 4. Blown glass chimney (hurricane shade) with high transmission
 * 5. Charred cotton wick
 * 6. Organic flickering inner and outer flame
 * 7. Dynamic golden point light
 */
export function AntiqueLamp({ isAwakened, onAwaken, isMobile }) {
  const lampGroupRef = useRef();
  const flameGroupRef = useRef();
  const innerFlameRef = useRef();
  const outerFlameRef = useRef();
  const lightRef = useRef();
  const dormantEmberRef = useRef();
  
  const [hovered, setHovered] = useState(false);

  // Transition progress ref (0 = dormant, 1 = awakened)
  const animProgress = useRef(isAwakened ? 1 : 0);

  // --- 1. Procedural Brass Body Lathe Geometry ---
  const brassGeometry = useMemo(() => {
    const points = [];
    // Base rim
    points.push(new THREE.Vector2(0.001, -1.05));
    points.push(new THREE.Vector2(0.55, -1.05));
    points.push(new THREE.Vector2(0.56, -0.98));
    points.push(new THREE.Vector2(0.48, -0.95));
    // Stepped foot
    points.push(new THREE.Vector2(0.44, -0.90));
    points.push(new THREE.Vector2(0.38, -0.82));
    points.push(new THREE.Vector2(0.24, -0.72));
    points.push(new THREE.Vector2(0.28, -0.68)); // lower ring
    points.push(new THREE.Vector2(0.25, -0.65));
    // Bulbous Oil Reservoir (Font)
    points.push(new THREE.Vector2(0.42, -0.52));
    points.push(new THREE.Vector2(0.58, -0.36)); // widest belly
    points.push(new THREE.Vector2(0.55, -0.22));
    points.push(new THREE.Vector2(0.44, -0.10));
    points.push(new THREE.Vector2(0.30, -0.02));
    points.push(new THREE.Vector2(0.24, 0.05));
    // Upper Collar & Burner Platform
    points.push(new THREE.Vector2(0.26, 0.10));
    points.push(new THREE.Vector2(0.23, 0.14));
    points.push(new THREE.Vector2(0.28, 0.19));
    points.push(new THREE.Vector2(0.20, 0.22));
    points.push(new THREE.Vector2(0.12, 0.24));
    points.push(new THREE.Vector2(0.001, 0.24));

    return new THREE.LatheGeometry(points, 48);
  }, []);

  // --- 2. Procedural Glass Chimney Lathe Geometry ---
  const glassGeometry = useMemo(() => {
    const points = [];
    // Chimney base fitted into burner gallery
    points.push(new THREE.Vector2(0.18, 0.24));
    points.push(new THREE.Vector2(0.20, 0.32));
    // Bulbous lower chimney around flame
    points.push(new THREE.Vector2(0.34, 0.52));
    points.push(new THREE.Vector2(0.35, 0.65));
    points.push(new THREE.Vector2(0.28, 0.88));
    // Slender neck
    points.push(new THREE.Vector2(0.17, 1.15));
    points.push(new THREE.Vector2(0.16, 1.35));
    // Flared crown lip
    points.push(new THREE.Vector2(0.21, 1.52));
    points.push(new THREE.Vector2(0.22, 1.55));
    points.push(new THREE.Vector2(0.19, 1.54));

    return new THREE.LatheGeometry(points, 40);
  }, []);

  // --- 3. Scroll Handle Curve ---
  const handleGeometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.25, 0.02, 0),
      new THREE.Vector3(-0.48, 0.08, 0),
      new THREE.Vector3(-0.70, -0.15, 0),
      new THREE.Vector3(-0.72, -0.42, 0),
      new THREE.Vector3(-0.55, -0.65, 0),
      new THREE.Vector3(-0.35, -0.72, 0),
    ]);
    return new THREE.TubeGeometry(curve, 32, 0.028, 16, false);
  }, []);

  // --- 4. Thumbwheel Wick Adjuster Spindle ---
  const spindleGeo = useMemo(() => new THREE.CylinderGeometry(0.015, 0.015, 0.24, 16), []);
  const thumbwheelGeo = useMemo(() => new THREE.CylinderGeometry(0.065, 0.065, 0.03, 24), []);

  // --- 5. Flame Geometry ---
  const flameGeometry = useMemo(() => {
    const points = [];
    points.push(new THREE.Vector2(0.001, 0.38));
    points.push(new THREE.Vector2(0.04, 0.39));
    points.push(new THREE.Vector2(0.09, 0.43));
    points.push(new THREE.Vector2(0.10, 0.49));
    points.push(new THREE.Vector2(0.07, 0.58));
    points.push(new THREE.Vector2(0.03, 0.68));
    points.push(new THREE.Vector2(0.001, 0.76));
    return new THREE.LatheGeometry(points, 24);
  }, []);

  // --- Materials ---
  const brassMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#b38a44'), // warm rich antique brass
      roughness: 0.32,
      metalness: 0.88,
      envMapIntensity: 0.8,
    });
  }, []);

  const burnerGalleryMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#7a5927'), // slightly darker oxidized brass
      roughness: 0.45,
      metalness: 0.82,
    });
  }, []);

  const glassMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#ffffff'),
      transmission: 0.94,
      opacity: 1,
      transparent: true,
      roughness: 0.05,
      ior: 1.52,
      thickness: 0.06,
      specularIntensity: 1.0,
      specularColor: new THREE.Color('#fff7e6'),
    });
  }, []);

  // Frame Loop for Organic Flame Physics & Awaken Transition
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Smoothly interpolate transition progress towards target
    const targetProgress = isAwakened ? 1 : 0;
    animProgress.current = THREE.MathUtils.damp(
      animProgress.current,
      targetProgress,
      isAwakened ? 2.2 : 3.0,
      delta
    );

    const p = animProgress.current;

    // Organic flame flicker math
    const f1 = Math.sin(time * 12.0) * 0.05;
    const f2 = Math.sin(time * 26.5 + 1.3) * 0.03;
    const f3 = Math.cos(time * 7.8) * 0.04;
    const noise = f1 + f2 + f3;

    // Subtle breathing slumber glow when dormant vs radiant warm flame when awakened
    const slumberScale = 0.28 + (hovered && !isAwakened ? 0.08 : 0);
    const awakeScale = 1.0;
    const currentScale = THREE.MathUtils.lerp(slumberScale, awakeScale, p);

    if (flameGroupRef.current) {
      flameGroupRef.current.scale.set(
        currentScale * (1 + noise * 0.6),
        currentScale * (1 + noise * 1.1),
        currentScale * (1 + noise * 0.6)
      );
      // Subtle organic sway
      flameGroupRef.current.rotation.z = Math.sin(time * 4.2) * 0.03 * p;
      flameGroupRef.current.rotation.x = Math.cos(time * 3.5) * 0.02 * p;
    }

    // Dynamic Light Intensity & Color Modulation
    if (lightRef.current) {
      // In dormant state: intensity ~0.2 (whisper of light, pulses slightly on hover)
      // In awakened state: intensity ~3.8 to 4.2 with organic flame flicker
      const baseIntensity = THREE.MathUtils.lerp(
        hovered && !isAwakened ? 0.45 : 0.22,
        3.9,
        p
      );
      lightRef.current.intensity = baseIntensity + (p > 0.1 ? noise * 0.35 : Math.sin(time * 2.0) * 0.05);
      
      // Light color shifts from dim amber-red ember to radiant golden-peach candle glow
      const dormantColor = new THREE.Color('#ff7b24');
      const awakeColor = new THREE.Color('#ffc16b');
      lightRef.current.color.lerpColors(dormantColor, awakeColor, p);
    }

    // Dormant Ember Pulse in center
    if (dormantEmberRef.current) {
      const emberPulse = (1 - p) * (0.8 + 0.3 * Math.sin(time * 3.5));
      dormantEmberRef.current.material.opacity = emberPulse;
    }

    // Subtle gentle idle floating of lamp body
    if (lampGroupRef.current) {
      lampGroupRef.current.position.y = Math.sin(time * 1.2) * 0.015;
    }
  });

  return (
    <group
      ref={lampGroupRef}
      position={[0, -0.15, 0]}
      scale={isMobile ? [0.82, 0.82, 0.82] : [1, 1, 1]}
      onClick={(e) => {
        e.stopPropagation();
        if (onAwaken) onAwaken();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* --- Turned Antique Brass Base & Body --- */}
      <mesh
        geometry={brassGeometry}
        material={brassMaterial}
        castShadow
        receiveShadow
      />

      {/* --- Burner Collar Gallery Details --- */}
      <mesh
        position={[0, 0.20, 0]}
        material={burnerGalleryMat}
        castShadow
      >
        <cylinderGeometry args={[0.22, 0.24, 0.08, 32]} />
      </mesh>

      {/* Decorative bead ring around upper reservoir */}
      <mesh position={[0, -0.01, 0]} material={burnerGalleryMat}>
        <torusGeometry args={[0.29, 0.016, 12, 36]} />
      </mesh>

      {/* Decorative bead ring around foot */}
      <mesh position={[0, -0.88, 0]} material={burnerGalleryMat}>
        <torusGeometry args={[0.42, 0.02, 12, 36]} />
      </mesh>

      {/* --- Wick Adjuster Spindle & Thumbwheel --- */}
      <group position={[0.20, 0.16, 0]} rotation={[0, 0, Math.PI / 2]}>
        <mesh geometry={spindleGeo} material={burnerGalleryMat} />
        <mesh position={[0, 0.13, 0]} geometry={thumbwheelGeo} material={brassMaterial} />
      </group>

      {/* --- Ornate Victorian Scroll Handle --- */}
      <mesh
        geometry={handleGeometry}
        material={brassMaterial}
        castShadow
      />

      {/* --- Translucent Blown Glass Chimney (Hurricane Shade) --- */}
      <mesh
        geometry={glassGeometry}
        material={glassMaterial}
      />

      {/* --- Dark Braided Wick --- */}
      <mesh position={[0, 0.32, 0]}>
        <cylinderGeometry args={[0.025, 0.03, 0.14, 16]} />
        <meshStandardMaterial color="#1a1510" roughness={0.9} />
      </mesh>

      {/* --- Procedural Multi-Layered Flame --- */}
      <group ref={flameGroupRef} position={[0, 0.05, 0]}>
        {/* Inner intense flame core */}
        <mesh ref={innerFlameRef} geometry={flameGeometry}>
          <meshBasicMaterial
            color="#fff8d6"
            transparent
            opacity={0.98}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Outer warm amber halo flame */}
        <mesh
          ref={outerFlameRef}
          geometry={flameGeometry}
          scale={[1.35, 1.15, 1.35]}
          position={[0, -0.02, 0]}
        >
          <meshBasicMaterial
            color="#ff7300"
            transparent
            opacity={0.65}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      {/* Dormant Ember Point for pre-awakened mystery */}
      <mesh ref={dormantEmberRef} position={[0, 0.40, 0]}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshBasicMaterial
          color="#ff5511"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* --- Primary Dynamic Point Light (casts golden warmth) --- */}
      <pointLight
        ref={lightRef}
        position={[0, 0.52, 0]}
        color="#ffa03a"
        intensity={0.25}
        distance={12}
        decay={2}
        castShadow
        shadow-bias={-0.001}
        shadow-mapSize={[1024, 1024]}
      />

      {/* Soft fill point light underneath for warm tabletop caustics */}
      <pointLight
        position={[0, -0.4, 0]}
        color="#c86915"
        intensity={isAwakened ? 0.9 : 0.08}
        distance={3.5}
        decay={2}
      />
    </group>
  );
}
