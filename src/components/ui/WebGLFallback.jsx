import { useState } from 'react';

export function WebGLFallback({ currentScene = 'lamp', isAwakened, onAwaken }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="absolute inset-0 w-full h-full bg-[#040404] flex items-center justify-center overflow-hidden">
      {/* Background warm radial aura */}
      <div
        className={`absolute w-[750px] h-[750px] rounded-full transition-all duration-1000 blur-3xl pointer-events-none ${
          isAwakened || currentScene !== 'lamp'
            ? 'bg-gradient-radial from-[#ff9900]/25 via-[#ff6a00]/10 to-transparent scale-125'
            : hovered
            ? 'bg-gradient-radial from-[#ff7700]/15 via-transparent to-transparent scale-100'
            : 'bg-gradient-radial from-[#ff6600]/8 via-transparent to-transparent scale-75'
        }`}
      />

      {/* Atmospheric Fog Layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_#040404_80%)] pointer-events-none" />

      {/* Scene 1 Fallback: Antique Lamp */}
      {currentScene === 'lamp' && (
        <div
          className="relative z-10 flex flex-col items-center cursor-pointer transition-transform duration-700 hover:scale-105"
          onClick={onAwaken}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Dynamic Flame / Ember Glow */}
          <div className="relative mb-[-10px] z-20 flex items-center justify-center">
            <div
              className={`transition-all duration-700 rounded-full blur-md ${
                isAwakened
                  ? 'w-16 h-28 bg-[#ffaa33] shadow-[0_0_60px_#ff9900]'
                  : hovered
                  ? 'w-6 h-10 bg-[#ff6600] shadow-[0_0_25px_#ff6600]'
                  : 'w-4 h-6 bg-[#ff4400] shadow-[0_0_12px_#ff4400]'
              }`}
            />
            <div
              className={`absolute transition-all duration-500 rounded-full bg-white ${
                isAwakened ? 'w-6 h-14' : 'w-2 h-3'
              }`}
            />
          </div>

          {/* Antique Brass Lamp Vector */}
          <svg
            width="180"
            height="280"
            viewBox="0 0 180 280"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
          >
            <path
              d="M75 90 C 75 50, 60 30, 72 10 L 108 10 C 120 30, 105 50, 105 90 C 125 110, 125 140, 105 160 L 75 160 C 55 140, 55 110, 75 90 Z"
              fill="rgba(255, 255, 255, 0.08)"
              stroke="rgba(255, 240, 200, 0.3)"
              strokeWidth="1.5"
            />
            <rect x="70" y="160" width="40" height="15" rx="3" fill="#8c6a2f" stroke="#c49b4c" strokeWidth="1" />
            <line x1="110" y1="168" x2="135" y2="168" stroke="#8c6a2f" strokeWidth="3" />
            <circle cx="136" cy="168" r="6" fill="#c49b4c" />
            <ellipse cx="90" cy="205" rx="38" ry="30" fill="url(#brassGrad)" stroke="#c49b4c" strokeWidth="1" />
            <path
              d="M 52 190 C 20 180, 15 225, 45 235"
              stroke="url(#brassGrad)"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
            <path d="M 65 235 L 50 260 L 130 260 L 115 235 Z" fill="url(#brassGrad)" />
            <rect x="42" y="260" width="96" height="10" rx="3" fill="#6d511f" stroke="#c49b4c" strokeWidth="1" />
            <defs>
              <linearGradient id="brassGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#d4af37" />
                <stop offset="50%" stopColor="#8c6a2f" />
                <stop offset="100%" stopColor="#453213" />
              </linearGradient>
            </defs>
          </svg>
          <div className="w-64 h-5 rounded-full bg-black/80 blur-sm mt-[-5px]" />
        </div>
      )}

      {/* Scene 2 Fallback: Grand Entrance Doors */}
      {currentScene === 'entrance' && (
        <div className="relative z-10 flex flex-col items-center">
          <svg
            width="320"
            height="380"
            viewBox="0 0 320 380"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
          >
            {/* Stone Portal */}
            <rect x="20" y="20" width="280" height="340" rx="4" fill="#0d0b09" stroke="#1f1a14" strokeWidth="8" />
            {/* Left Door */}
            <rect x="36" y="36" width="120" height="308" fill="#1e140d" stroke="#332418" strokeWidth="2" />
            <rect x="52" y="56" width="88" height="80" fill="#140d08" stroke="#3d2a1b" strokeWidth="2" />
            <rect x="52" y="152" width="88" height="172" fill="#140d08" stroke="#3d2a1b" strokeWidth="2" />
            <line x1="144" y1="140" x2="144" y2="240" stroke="#d4af37" strokeWidth="4" strokeLinecap="round" />

            {/* Right Door */}
            <rect x="164" y="36" width="120" height="308" fill="#1e140d" stroke="#332418" strokeWidth="2" />
            <rect x="180" y="56" width="88" height="80" fill="#140d08" stroke="#3d2a1b" strokeWidth="2" />
            <rect x="180" y="152" width="88" height="172" fill="#140d08" stroke="#3d2a1b" strokeWidth="2" />
            <line x1="176" y1="140" x2="176" y2="240" stroke="#d4af37" strokeWidth="4" strokeLinecap="round" />

            {/* Seam Glow */}
            <line x1="160" y1="36" x2="160" y2="344" stroke="#ffb84d" strokeWidth="3" opacity="0.8" />
          </svg>
        </div>
      )}

      {/* Scene 3 Fallback: Dining Hall */}
      {currentScene === 'dining' && (
        <div className="relative z-10 flex flex-col items-center">
          <svg
            width="360"
            height="320"
            viewBox="0 0 360 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
          >
            {/* Chandelier Ring */}
            <ellipse cx="180" cy="50" rx="90" ry="16" stroke="#d4af37" strokeWidth="3" fill="none" />
            <line x1="180" y1="10" x2="180" y2="40" stroke="#d4af37" strokeWidth="2" />
            {/* Candles on chandelier */}
            {[-70, -35, 0, 35, 70].map((cx, i) => (
              <circle key={i} cx={180 + cx} cy="48" r="4" fill="#ffb84d" className="animate-pulse" />
            ))}
            {/* Table Surface */}
            <ellipse cx="180" cy="230" rx="130" ry="42" fill="#1b120c" stroke="#332418" strokeWidth="2" />
            {/* Candlestick on table */}
            <line x1="180" y1="190" x2="180" y2="225" stroke="#d4af37" strokeWidth="4" />
            <circle cx="180" cy="182" r="6" fill="#ffc855" className="animate-ping" />
            {/* Chairs */}
            <rect x="20" y="180" width="30" height="60" rx="4" fill="#12100e" stroke="#2a221a" />
            <rect x="310" y="180" width="30" height="60" rx="4" fill="#12100e" stroke="#2a221a" />
          </svg>
        </div>
      )}
    </div>
  );
}
