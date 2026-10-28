import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { AntiqueLamp } from "./AntiqueLamp";
import { TableSurface } from "./TableSurface";
import { DustParticles } from "./DustParticles";
import { GrandEntrance } from "./entrance/GrandEntrance";
import { DiningHall } from "./dining/DiningHall";
import { CameraController } from "./CameraController";

export function Scene({
  currentScene = "lamp",
  isAwakened = false,
  onAwaken,
  isEntranceOpen = false,
  onEntranceComplete,
  prefersReducedMotion = false,
  isMobile = false,
}) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto">
      <Canvas
        shadows
        dpr={[1, 1.75]} // Clamped for performance on ordinary laptops
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: false,
        }}
        camera={{
          fov: isMobile ? 50 : 42,
          position: [0, 0.4, 3.2],
          near: 0.1,
          far: 35,
        }}
      >
        {/* Deep black scene background */}
        <color attach="background" args={["#040404"]} />

        {/* Atmospheric fog */}
        <fogExp2
          attach="fog"
          args={["#040404", currentScene === "lamp" ? 0.16 : 0.08]}
        />

        <Suspense fallback={null}>
          {/* Scene 1: Phase 1 Antique Lamp */}
          {currentScene === "lamp" && (
            <group>
              <ambientLight
                intensity={isAwakened ? 0.35 : 0.12}
                color="#1f1812"
              />
              <directionalLight
                position={[2.5, 4.0, -2.0]}
                intensity={isAwakened ? 0.65 : 0.35}
                color="#cfbeaa"
              />
              <AntiqueLamp
                isAwakened={isAwakened}
                onAwaken={onAwaken}
                isMobile={isMobile}
              />
              <TableSurface isAwakened={isAwakened} />
              <DustParticles
                count={isMobile ? 100 : 180}
                isAwakened={isAwakened}
              />
            </group>
          )}

          {/* Scene 2: Grand Entrance Double Doors */}
          {currentScene === "entrance" && (
            <group>
              <ambientLight intensity={0.25} color="#1c1611" />
              <directionalLight
                position={[0, 4, 3]}
                intensity={0.4}
                color="#baa58c"
              />
              <GrandEntrance
                isOpen={isEntranceOpen}
                prefersReducedMotion={prefersReducedMotion}
                onComplete={onEntranceComplete}
                isMobile={isMobile}
              />
              <DustParticles count={isMobile ? 80 : 140} isAwakened={true} />
            </group>
          )}

          {/* Scene 3: Luxury Dining Hall (active in dining, menu, and checkout) */}
          {(currentScene === "dining" ||
            currentScene === "menu" ||
            currentScene === "checkout") && <DiningHall isMobile={isMobile} />}

          {/* Master Camera Controller across all scenes */}
          <CameraController
            currentScene={currentScene}
            isAwakened={isAwakened}
            isEntranceOpen={isEntranceOpen}
            prefersReducedMotion={prefersReducedMotion}
            isMobile={isMobile}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
