import {
  DoorOpen,
  Sparkles,
  UtensilsCrossed,
  BookOpen,
  ChefHat,
} from "lucide-react";

export function SceneNavigator({ currentScene, onSelectScene }) {
  const scenes = [
    {
      id: "lamp",
      label: "GENESIS LAMP",
      icon: Sparkles,
      shortLabel: "LAMP",
    },
    {
      id: "entrance",
      label: "GRAND ENTRANCE",
      icon: DoorOpen,
      shortLabel: "ENTRY",
    },
    {
      id: "dining",
      label: "DINING HALL",
      icon: UtensilsCrossed,
      shortLabel: "DINING",
    },
    {
      id: "chef",
      label: "CHEF'S THEATRE",
      icon: ChefHat,
      shortLabel: "CHEF",
    },
    {
      id: "menu",
      label: "SIGNATURE MENU",
      icon: BookOpen,
      shortLabel: "MENU",
    },
  ];

  return (
    <nav
      aria-label="Scene Navigator"
      className="
        fixed bottom-3 left-1/2 -translate-x-1/2 z-30
        flex items-center justify-center gap-0.5
        w-[calc(100%-16px)] max-w-fit
        sm:bottom-6 sm:gap-2 sm:w-auto
        p-1 sm:p-1.5
        rounded-2xl sm:rounded-full
        border border-white/10
        bg-black/85 backdrop-blur-xl
        shadow-2xl shadow-black/40
        pointer-events-auto select-none
      "
    >
      {scenes.map((scene) => {
        const isActive =
          currentScene === scene.id ||
          (scene.id === "menu" && currentScene === "checkout");

        const Icon = scene.icon;

        return (
          <button
            key={scene.id}
            type="button"
            onClick={() => onSelectScene(scene.id)}
            aria-current={isActive ? "page" : undefined}
            aria-label={scene.label}
            title={scene.label}
            className={`
              group relative flex flex-1 sm:flex-none
              min-w-0 items-center justify-center
              gap-1 sm:gap-2
              px-1.5 py-2 sm:px-4 sm:py-2
              rounded-xl sm:rounded-full
              font-sans font-medium uppercase
              tracking-normal sm:tracking-[0.16em]
              text-[9px] sm:text-[11px]
              whitespace-nowrap
              transition-all duration-300
              cursor-pointer
              ${
                isActive
                  ? "bg-gradient-to-r from-[#211a12] to-[#2d2215] text-[#fbf6ec] border border-[#d4af37]/60 shadow-[0_0_12px_rgba(212,175,55,0.16)]"
                  : "text-[#8c857b] hover:text-[#e8dfcf] hover:bg-white/5 border border-transparent"
              }
            `}
          >
            <Icon
              aria-hidden="true"
              className={`
                w-3.5 h-3.5 sm:w-3 sm:h-3 shrink-0
                transition-colors
                ${
                  isActive
                    ? "text-[#d4af37]"
                    : "text-[#6b645b] group-hover:text-[#d4af37]/70"
                }
              `}
            />

            <span className="sm:hidden">{scene.shortLabel}</span>

            <span className="hidden sm:inline">{scene.label}</span>

            {isActive && (
              <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-[#d4af37] shadow-[0_0_6px_#d4af37]" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
