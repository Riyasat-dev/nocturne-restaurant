import { useMemo } from 'react';
import * as THREE from 'three';

/**
 * Dark Rustic Ebony Table / Slate Pedestal
 * Receives the lamp's golden pool of light and contact shadow
 */
export function TableSurface({ isAwakened }) {
  const tableMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0a0908'),
      roughness: 0.85,
      metalness: 0.12,
    });
  }, []);

  return (
    <group position={[0, -1.22, 0]}>
      {/* Table slab top */}
      <mesh receiveShadow material={tableMaterial}>
        <cylinderGeometry args={[4.2, 4.4, 0.25, 48]} />
      </mesh>

      {/* Subtle warm specular ring under the lamp base to simulate aged varnish sheen */}
      <mesh position={[0, 0.126, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.01, 2.8, 48]} />
        <meshStandardMaterial
          color="#302010"
          roughness={0.65}
          metalness={0.25}
          transparent
          opacity={isAwakened ? 0.45 : 0.15}
        />
      </mesh>
    </group>
  );
}
