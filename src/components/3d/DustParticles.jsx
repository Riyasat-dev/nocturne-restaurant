import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

// Pure deterministic pseudo-random number generator to satisfy React purity rules
function createSeededRandom(initialSeed = 1984) {
  let s = initialSeed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateParticles(count) {
  const rand = createSeededRandom(1024);
  const pos = new Float32Array(count * 3);
  const vel = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const radius = 0.3 + rand() * 2.8;
    const angle = rand() * Math.PI * 2;
    pos[i * 3] = Math.cos(angle) * radius;
    pos[i * 3 + 1] = -0.8 + rand() * 3.2;
    pos[i * 3 + 2] = Math.sin(angle) * radius;

    vel[i * 3] = (rand() - 0.5) * 0.003;
    vel[i * 3 + 1] = 0.0015 + rand() * 0.003; // Gentle upward drift
    vel[i * 3 + 2] = (rand() - 0.5) * 0.003;
  }

  return { positions: pos, velocities: vel };
}

/**
 * Atmospheric Floating Dust Motes
 * Subtle micro-particles that drift in the dark and catch the golden lamp light
 */
export function DustParticles({ count = 180, isAwakened }) {
  const pointsRef = useRef();

  // Create a procedural soft circular particle texture
  const particleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255, 240, 200, 1)');
      gradient.addColorStop(0.35, 'rgba(235, 175, 95, 0.55)');
      gradient.addColorStop(0.8, 'rgba(180, 110, 40, 0.15)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  // Generate particle positions deterministically
  const { positions, velocities } = useMemo(() => {
    return generateParticles(count);
  }, [count]);

  const targetOpacity = isAwakened ? 0.55 : 0.18;
  const currentOpacity = useRef(isAwakened ? 0.55 : 0.18);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    currentOpacity.current = THREE.MathUtils.damp(
      currentOpacity.current,
      targetOpacity,
      2.0,
      delta
    );

    if (pointsRef.current.material) {
      pointsRef.current.material.opacity = currentOpacity.current;
    }

    const posArray = pointsRef.current.geometry.attributes.position.array;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      // Gentle drift + sinusoidal draft
      posArray[idx] += velocities[idx] + Math.sin(time * 0.5 + i) * 0.0006;
      posArray[idx + 1] += velocities[idx + 1];
      posArray[idx + 2] += velocities[idx + 2] + Math.cos(time * 0.5 + i) * 0.0006;

      // Wrap around top boundary
      if (posArray[idx + 1] > 2.6) {
        posArray[idx + 1] = -0.8;
      }
      // Wrap horizontal boundary
      if (Math.abs(posArray[idx]) > 3.0) posArray[idx] *= -0.9;
      if (Math.abs(posArray[idx + 2]) > 3.0) posArray[idx + 2] *= -0.9;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        map={particleTexture}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color="#fcd89a"
      />
    </points>
  );
}
