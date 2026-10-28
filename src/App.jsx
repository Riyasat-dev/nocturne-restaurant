import { useState, useEffect, useRef, useCallback } from "react";
import { CartProvider } from "./context/CartProvider";
import { Scene } from "./components/3d/Scene";
import { Header } from "./components/ui/Header";
import { IntroOverlay } from "./components/ui/IntroOverlay";
import { AwakenedUI } from "./components/ui/AwakenedUI";
import { EntranceUI } from "./components/ui/EntranceUI";
import { DiningUI } from "./components/ui/DiningUI";
import { SceneNavigator } from "./components/ui/SceneNavigator";
import { MenuSection } from "./components/menu/MenuSection";
import { CartDrawer } from "./components/cart/CartDrawer";
import { CheckoutView } from "./components/checkout/CheckoutView";
import { OrderConfirmation } from "./components/checkout/OrderConfirmation";
import { WebGLFallback } from "./components/ui/WebGLFallback";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { useWebGLSupport } from "./hooks/useWebGLSupport";
import { soundManager } from "./audio/SoundEffects";
import ChefTheatre from "./components/ChefTheatre";
import Footer from "./components/Footer";
function AppContent() {
  // Current active scene: 'lamp' | 'entrance' | 'dining' | 'menu' | 'checkout'
  const [currentScene, setCurrentScene] = useState("lamp");
  const [isAwakened, setIsAwakened] = useState(false);
  const [isEntranceOpen, setIsEntranceOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDishModalOpen, setIsDishModalOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  const isWebGLSupported = useWebGLSupport();
  const prefersReducedMotion = useReducedMotion();

  // Guard against repeated animation triggers
  const isAwakeningRef = useRef(false);
  const isNavigatingRef = useRef(false);

  // Responsive window resize listener
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // --- 1. Lamp Scene Handlers ---
  const handleAwaken = useCallback(() => {
    if (isAwakeningRef.current || isAwakened) return;
    isAwakeningRef.current = true;

    soundManager.playIgnition();
    setIsAwakened(true);

    setTimeout(() => {
      isAwakeningRef.current = false;
    }, 2500);
  }, [isAwakened]);

  const handleSkipLampIntro = useCallback(() => {
    if (isAwakened) return;
    soundManager.init();
    setIsAwakened(true);
  }, [isAwakened]);

  const handleResetLamp = useCallback(() => {
    setIsAwakened(false);
    isAwakeningRef.current = false;
  }, []);

  // --- 2. Entrance Scene Handlers ---
  const handleEnterSanctuary = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;

    setCurrentScene("entrance");
    setIsEntranceOpen(false);

    // Brief establishing pause before the walnut doors swing open
    setTimeout(() => {
      setIsEntranceOpen(true);
      isNavigatingRef.current = false;
    }, 600);
  }, []);

  const handleEntranceComplete = useCallback(() => {
    soundManager.playDiningArrival();
    setCurrentScene("dining");
  }, []);

  const handleSkipEntrance = useCallback(() => {
    soundManager.playDiningArrival();
    setCurrentScene("dining");
  }, []);

  // --- 3. Dining & Menu Handlers ---
  const handleExploreMenu = useCallback(() => {
    setCurrentScene("menu");
    setCompletedOrder(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleExploreChef = useCallback(() => {
    setCurrentScene("chef");
    setCompletedOrder(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleReturnToDining = useCallback(() => {
    setCurrentScene("dining");
    setCompletedOrder(null);
  }, []);

  // --- 4. Checkout Handlers ---
  const handleProceedToCheckout = useCallback(() => {
    setCurrentScene("checkout");
    setCompletedOrder(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleOrderSuccess = useCallback((orderPayload) => {
    setCompletedOrder(orderPayload);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // --- 5. Scene Navigator Selection ---
  const handleSelectScene = useCallback(
    (sceneId) => {
      if (sceneId === currentScene && !completedOrder) return;

      setCompletedOrder(null);

      if (sceneId === "lamp") {
        setCurrentScene("lamp");
      } else if (sceneId === "entrance") {
        setCurrentScene("entrance");
        setIsEntranceOpen(false);
        setTimeout(() => {
          setIsEntranceOpen(true);
        }, 500);
      } else if (sceneId === "dining") {
        soundManager.playDiningArrival();
        setCurrentScene("dining");
      } else if (sceneId === "chef") {
        setCurrentScene("chef");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (sceneId === "menu") {
        setCurrentScene("menu");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [currentScene, completedOrder],
  );

  // Global Header Skip router
  const handleHeaderSkip = useCallback(() => {
    if (currentScene === "lamp" && !isAwakened) {
      handleSkipLampIntro();
    } else if (currentScene === "entrance") {
      handleSkipEntrance();
    }
  }, [currentScene, isAwakened, handleSkipLampIntro, handleSkipEntrance]);

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space" || e.code === "Enter") {
        if (currentScene === "lamp" && !isAwakened) {
          e.preventDefault();
          handleAwaken();
        }
      } else if (e.code === "Escape") {
        if (currentScene === "lamp" && !isAwakened) {
          e.preventDefault();
          handleSkipLampIntro();
        } else if (currentScene === "entrance") {
          e.preventDefault();
          handleSkipEntrance();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    currentScene,
    isAwakened,
    handleAwaken,
    handleSkipLampIntro,
    handleSkipEntrance,
  ]);

  const isScrollableScene = ["menu", "checkout", "chef"].includes(currentScene);

  return (
    <main
      className={`relative w-full bg-[#040404] text-[#f5efe2] ${
        isScrollableScene ? "min-h-screen" : "h-screen overflow-hidden"
      }`}
      role="main"
      aria-label="Nocturne Cinematic Restaurant Experience"
    >
      {/* Fixed 3D Scene / Graceful Fallback Background */}
      <div
        className={`fixed inset-0 w-full h-full ${
          currentScene === "lamp"
            ? "pointer-events-auto"
            : "pointer-events-none"
        }`}
      >
        {isWebGLSupported ? (
          <Scene
            currentScene={currentScene}
            isAwakened={isAwakened}
            onAwaken={handleAwaken}
            isEntranceOpen={isEntranceOpen}
            onEntranceComplete={handleEntranceComplete}
            prefersReducedMotion={prefersReducedMotion}
            isMobile={isMobile}
          />
        ) : (
          <WebGLFallback
            currentScene={currentScene}
            isAwakened={isAwakened}
            onAwaken={handleAwaken}
          />
        )}
      </div>

      {/* Atmospheric Overlays */}
      <div className="fixed inset-0 cinematic-vignette pointer-events-none z-10" />
      <div className="fixed inset-0 film-grain pointer-events-none z-10" />

      {/* Persistent Luxury Header */}
      <Header
        currentScene={currentScene}
        isAwakened={isAwakened}
        onSkip={handleHeaderSkip}
        onNavigate={handleSelectScene}
      />

      {/* --- Active Scene Views --- */}
      {/* 1. Lamp Scene */}
      {currentScene === "lamp" && !isAwakened && (
        <IntroOverlay
          isAwakened={isAwakened}
          onAwaken={handleAwaken}
          prefersReducedMotion={prefersReducedMotion}
        />
      )}

      {currentScene === "lamp" && isAwakened && (
        <AwakenedUI
          isAwakened={isAwakened}
          onReset={handleResetLamp}
          onExplore={handleEnterSanctuary}
          prefersReducedMotion={prefersReducedMotion}
        />
      )}

      {/* 2. Grand Entrance Doors Scene */}
      {currentScene === "entrance" && (
        <EntranceUI onSkipEntrance={handleSkipEntrance} />
      )}

      {currentScene === "dining" && (
        <DiningUI
          onExploreMenu={handleExploreMenu}
          onExploreChef={handleExploreChef}
        />
      )}

      {/* 4. Signature Menu Scene */}
      {currentScene === "menu" && (
        <MenuSection
          onNavigateToDining={handleReturnToDining}
          onDishModalChange={setIsDishModalOpen}
        />
      )}

      {/* 5. Demo Checkout Scene */}
      {currentScene === "checkout" && !completedOrder && (
        <CheckoutView
          onBackToMenu={handleExploreMenu}
          onOrderSuccess={handleOrderSuccess}
        />
      )}

      {/* 5b. Demo Order Confirmation */}
      {currentScene === "checkout" && completedOrder && (
        <OrderConfirmation
          orderData={completedOrder}
          onReturnToMenu={handleExploreMenu}
          onReturnToDining={handleReturnToDining}
        />
      )}

      {/* Cart Drawer (accessible from any scene) */}
      <CartDrawer
        onProceedToCheckout={handleProceedToCheckout}
        onExploreMenu={handleExploreMenu}
      />

      {/* Scene Navigator: allows direct traversal between scenes */}

      {/* Scene Navigator: hide while dish details modal is open */}
      {!isDishModalOpen && (
        <SceneNavigator
          currentScene={currentScene}
          onSelectScene={handleSelectScene}
        />
      )}

      {currentScene === "chef" && (
        <ChefTheatre
          onBack={() => setCurrentScene("dining")}
          onExploreMenu={() => setCurrentScene("menu")}
        />
      )}
      {/* Restaurant Footer */}
      {isScrollableScene && <Footer onNavigate={handleSelectScene} />}
    </main>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
