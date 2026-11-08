import React from "react";

interface Props {
  characterId: string;
  className?: string;
}

export function CharacterSilhouette({ characterId, className = "w-full h-full" }: Props) {
  switch (characterId) {
    case "secchione":
      return (
        <svg
          viewBox="0 0 300 400"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="secchioneGlow" cx="50%" cy="30%" r="50%">
              <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="150" cy="120" r="110" fill="url(#secchioneGlow)" />
          {/* Huge Backpack behind */}
          <path
            d="M75 140 C65 180 60 250 80 290 C95 315 130 320 135 290 L130 170 Z"
            fill="#09090b"
          />
          {/* Body curved with hoodie */}
          <path
            d="M110 380 L115 280 C110 240 120 170 145 150 C175 130 205 155 210 190 C215 230 210 280 215 380 Z"
            fill="#09090b"
          />
          {/* Head with hood */}
          <path
            d="M135 150 C130 115 145 95 175 95 C205 95 218 115 215 150 C205 175 180 180 155 175 Z"
            fill="#09090b"
          />
          {/* Thick glasses glowing */}
          <rect
            x="170"
            y="125"
            width="32"
            height="18"
            rx="5"
            fill="#e0f2fe"
            stroke="#09090b"
            strokeWidth="3"
            className="animate-pulse"
          />
          <line x1="162" y1="134" x2="170" y2="134" stroke="#e0f2fe" strokeWidth="3" />
          {/* Glasses glint */}
          <line x1="175" y1="130" x2="183" y2="138" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          <line x1="188" y1="130" x2="196" y2="138" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          {/* Arms holding straps & laser pointer */}
          <path
            d="M145 180 C155 220 170 240 190 235 L195 225 C175 220 160 200 155 180 Z"
            fill="#09090b"
          />
          {/* Red laser beam emitted subtly */}
          <circle cx="205" cy="235" r="3" fill="#ef4444" className="animate-ping" />
          <line x1="205" y1="235" x2="280" y2="220" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
        </svg>
      );

    case "palestrato":
      return (
        <svg
          viewBox="0 0 300 400"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="palestratoGlow" cx="50%" cy="30%" r="50%">
              <stop offset="0%" stopColor="#fca5a5" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#991b1b" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="150" cy="130" r="120" fill="url(#palestratoGlow)" />
          {/* Huge Trapezius and massive shoulders */}
          <path
            d="M150 95 C130 95 110 110 70 145 C45 165 40 205 60 235 C75 225 90 205 100 185 L95 380 L205 380 L200 185 C210 205 225 225 240 235 C260 205 255 165 230 145 C190 110 170 95 150 95 Z"
            fill="#09090b"
          />
          {/* Head & Jawline */}
          <path
            d="M135 90 C135 65 145 55 150 55 C155 55 165 65 165 90 C165 108 135 108 135 90 Z"
            fill="#09090b"
          />
          {/* Canottiera straps cutout effect */}
          <path
            d="M125 150 L115 220 L185 220 L175 150 C165 170 135 170 125 150 Z"
            fill="#18181b"
          />
          {/* Right Arm flexed holding Neon pre-workout shaker */}
          <path
            d="M230 155 C255 180 265 210 245 250 L230 240 C245 210 235 190 220 175 Z"
            fill="#09090b"
          />
          {/* Shaker Bottle with glowing green/yellow liquid */}
          <rect x="235" y="240" width="18" height="34" rx="4" fill="#a3e635" className="animate-pulse" />
          <rect x="232" y="235" width="24" height="6" rx="2" fill="#09090b" />
          <circle cx="244" cy="255" r="4" fill="#ffffff" opacity="0.6" />
        </svg>
      );

    case "squinza":
      return (
        <svg
          viewBox="0 0 300 400"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="squinzaGlow" cx="50%" cy="30%" r="50%">
              <stop offset="0%" stopColor="#f472b6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#831843" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="150" cy="140" r="120" fill="url(#squinzaGlow)" />
          {/* Voluminous 80s teased hair */}
          <path
            d="M150 50 C110 50 85 85 95 130 C105 160 125 165 135 160 C125 140 135 110 150 110 C165 110 175 140 165 160 C175 165 195 160 205 130 C215 85 190 50 150 50 Z"
            fill="#09090b"
          />
          {/* Face silhouette profile/front */}
          <circle cx="150" cy="115" r="22" fill="#09090b" />
          {/* Huge puffy synthetic fur coat */}
          <path
            d="M90 160 C70 190 65 240 85 270 C105 295 125 285 150 285 C175 285 195 295 215 270 C235 240 230 190 210 160 C190 145 110 145 90 160 Z"
            fill="#09090b"
          />
          {/* Legs with high-heeled stiletto boots */}
          <path d="M125 285 L120 375 L135 375 L138 310 L140 285 Z" fill="#09090b" />
          <path d="M165 285 L162 310 L165 375 L180 375 L175 285 Z" fill="#09090b" />
          {/* Heels tips */}
          <line x1="120" y1="365" x2="120" y2="385" stroke="#09090b" strokeWidth="4" />
          <line x1="180" y1="365" x2="180" y2="385" stroke="#09090b" strokeWidth="4" />
          {/* Arm raised high holding glowing smartphone searching for network */}
          <path
            d="M190 180 C210 150 220 120 225 80 L215 78 C210 115 200 140 180 175 Z"
            fill="#09090b"
          />
          {/* Glowing Smartphone */}
          <rect
            x="218"
            y="55"
            width="22"
            height="38"
            rx="4"
            fill="#fdf2f8"
            stroke="#09090b"
            strokeWidth="2"
            transform="rotate(15 218 55)"
            className="animate-pulse"
          />
          {/* No service signal icon rays */}
          <path
            d="M245 45 C252 50 255 58 252 66"
            stroke="#f43f5e"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );

    case "maranza":
      return (
        <svg
          viewBox="0 0 300 400"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="maranzaGlow" cx="50%" cy="30%" r="50%">
              <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#065f46" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="150" cy="130" r="120" fill="url(#maranzaGlow)" />
          {/* Head with pulled down hood */}
          <path
            d="M150 70 C125 70 120 90 122 135 C125 155 140 165 150 165 C160 165 175 155 178 135 C180 90 175 70 150 70 Z"
            fill="#09090b"
          />
          {/* Cap peak visible under hood */}
          <path d="M135 110 L185 105 L175 118 L135 118 Z" fill="#27272a" />
          {/* Shiny sleeveless puffer vest (piumino smanicato) */}
          <path
            d="M100 150 C90 180 90 240 105 285 L195 285 C210 240 210 180 200 150 C180 135 120 135 100 150 Z"
            fill="#09090b"
          />
          {/* Horizontal puffer ribs sheen */}
          <line x1="108" y1="180" x2="192" y2="180" stroke="#3f3f46" strokeWidth="3" />
          <line x1="105" y1="215" x2="195" y2="215" stroke="#3f3f46" strokeWidth="3" />
          <line x1="105" y1="250" x2="195" y2="250" stroke="#3f3f46" strokeWidth="3" />
          {/* Cross-body shoulder bag (borsello a tracolla) */}
          <line x1="115" y1="145" x2="185" y2="255" stroke="#eab308" strokeWidth="4" />
          <rect
            x="165"
            y="235"
            width="28"
            height="34"
            rx="4"
            fill="#18181b"
            stroke="#eab308"
            strokeWidth="2"
          />
          {/* Bag logo / detail */}
          <circle cx="179" cy="252" r="3" fill="#eab308" />
          {/* Trousers and tuned posture */}
          <path d="M115 285 L110 380 L140 380 L145 310 L155 310 L160 380 L190 380 L185 285 Z" fill="#09090b" />
          {/* Boombox at his feet blasting bass */}
          <rect x="50" y="335" width="45" height="35" rx="5" fill="#09090b" />
          <circle cx="63" cy="355" r="9" fill="#10b981" className="animate-ping" opacity="0.4" />
          <circle cx="63" cy="355" r="7" fill="#18181b" stroke="#10b981" strokeWidth="2" />
          <circle cx="82" cy="355" r="7" fill="#18181b" stroke="#10b981" strokeWidth="2" />
        </svg>
      );

    default:
      return (
        <div className="flex items-center justify-center w-full h-full text-zinc-500">
          Silhouette
        </div>
      );
  }
}
