import { useEffect, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';

export function CameraController({
  currentScene = 'lamp',
  isAwakened = false,
  isEntranceOpen = false,
  prefersReducedMotion = false,
  isMobile = false,
}) {
  // Preset targets per scene & state
  const lampDormantPos = useMemo(
    () =>
      isMobile
        ? { x: 0, y: 0.35, z: 3.4, lookX: 0, lookY: 0.25, lookZ: 0 }
        : { x: 0, y: 0.4, z: 2.75, lookX: 0, lookY: 0.3, lookZ: 0 },
    [isMobile]
  );

  const lampAwakePos = useMemo(
    () =>
      isMobile
        ? { x: 0, y: 0.75, z: 4.8, lookX: 0, lookY: 0.15, lookZ: 0 }
        : { x: 0, y: 0.85, z: 3.85, lookX: 0, lookY: 0.2, lookZ: 0 },
    [isMobile]
  );

  const entranceStartPos = useMemo(
    () =>
      isMobile
        ? { x: 0, y: 0.65, z: 4.8, lookX: 0, lookY: 0.5, lookZ: 0 }
        : { x: 0, y: 0.6, z: 4.2, lookX: 0, lookY: 0.5, lookZ: 0 },
    [isMobile]
  );

  const entrancePassPos = useMemo(
    () => ({ x: 0, y: 0.35, z: -1.2, lookX: 0, lookY: 0.35, lookZ: -4.0 }),
    []
  );

  const diningBasePos = useMemo(
    () =>
      isMobile
        ? { x: 0, y: 0.7, z: 3.8, lookX: 0, lookY: -0.15, lookZ: -0.8 }
        : { x: 0, y: 0.65, z: 2.9, lookX: 0, lookY: -0.15, lookZ: -0.6 },
    [isMobile]
  );

  const menuBackgroundPos = useMemo(
    () =>
      isMobile
        ? { x: 0, y: 1.1, z: 4.5, lookX: 0, lookY: 0.1, lookZ: -1.5 }
        : { x: 0, y: 1.2, z: 3.8, lookX: 0, lookY: 0.1, lookZ: -1.5 },
    [isMobile]
  );

  const camState = useRef({ ...lampDormantPos });
  const tweenRef = useRef(null);

  // Scene transition orchestration
  useEffect(() => {
    if (tweenRef.current) tweenRef.current.kill();

    if (currentScene === 'lamp') {
      const target = isAwakened ? lampAwakePos : lampDormantPos;
      if (prefersReducedMotion) {
        camState.current = { ...target };
      } else {
        tweenRef.current = gsap.to(camState.current, {
          ...target,
          duration: isAwakened ? 2.8 : 1.2,
          ease: 'power3.out',
        });
      }
    } else if (currentScene === 'entrance') {
      if (!isEntranceOpen) {
        // Establish outside doors
        if (prefersReducedMotion) {
          camState.current = { ...entranceStartPos };
        } else {
          tweenRef.current = gsap.to(camState.current, {
            ...entranceStartPos,
            duration: 1.6,
            ease: 'power2.out',
          });
        }
      } else {
        // Fly through opening doors into doorway
        if (prefersReducedMotion) {
          camState.current = { ...entrancePassPos };
        } else {
          tweenRef.current = gsap.to(camState.current, {
            ...entrancePassPos,
            duration: 3.4,
            delay: 0.2,
            ease: 'power2.inOut',
          });
        }
      }
    } else if (currentScene === 'dining') {
      if (prefersReducedMotion) {
        camState.current = { ...diningBasePos };
      } else {
        tweenRef.current = gsap.to(camState.current, {
          ...diningBasePos,
          duration: 2.4,
          ease: 'power3.out',
        });
      }
    } else if (currentScene === 'menu' || currentScene === 'checkout') {
      if (prefersReducedMotion) {
        camState.current = { ...menuBackgroundPos };
      } else {
        tweenRef.current = gsap.to(camState.current, {
          ...menuBackgroundPos,
          duration: 2.2,
          ease: 'power2.out',
        });
      }
    }

    return () => {
      if (tweenRef.current) tweenRef.current.kill();
    };
  }, [
    currentScene,
    isAwakened,
    isEntranceOpen,
    prefersReducedMotion,
    lampAwakePos,
    lampDormantPos,
    entranceStartPos,
    entrancePassPos,
    diningBasePos,
    menuBackgroundPos,
  ]);

  useFrame((state) => {
    const cam = state.camera;
    const ptr = state.pointer;
    const time = state.clock.getElapsedTime();

    // Subtle interactive mouse tilt
    const parallaxX = ptr.x * 0.08;
    const parallaxY = ptr.y * 0.05;

    // Gentle slow cinematic drift when resting in Dining Hall or Menu
    let driftX = 0;
    let driftY = 0;
    if ((currentScene === 'dining' || currentScene === 'menu' || currentScene === 'checkout') && !prefersReducedMotion) {
      driftX = Math.sin(time * 0.35) * 0.12;
      driftY = Math.cos(time * 0.25) * 0.05;
    }

    cam.position.x = camState.current.x + parallaxX + driftX;
    cam.position.y = camState.current.y + parallaxY + driftY;
    cam.position.z = camState.current.z;

    cam.lookAt(
      camState.current.lookX + parallaxX * 0.25,
      camState.current.lookY + parallaxY * 0.25,
      camState.current.lookZ
    );
  });

  return null;
}
