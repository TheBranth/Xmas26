"use client";

import React, { useState } from "react";
import { CustomSceneData } from "@/types/game";

interface Props {
  sceneId: string;
  imagePath?: string;
  customData?: CustomSceneData | null;
  className?: string;
}

export function SceneIllustration({
  sceneId,
  imagePath,
  customData,
  className = "w-full h-full",
}: Props) {
  const [imgError, setImgError] = useState(false);

  // If scene "99" and custom data provided
  if (sceneId === "99" && customData) {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-stone-900 ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={customData.imageUrl}
          alt={customData.title}
          className={`w-full h-full object-cover transition-all duration-700 ${
            customData.applyPastelFilter
              ? "sepia-[0.35] contrast-[0.9] saturate-[1.25] brightness-[1.05] hue-rotate-[-10deg]"
              : ""
          }`}
        />
        <div className="pointer-events-none absolute inset-0 bg-stone-900/10 mix-blend-multiply opacity-50" />
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.6)]" />
      </div>
    );
  }

  // If an imagePath is specified and has not failed loading
  if (imagePath && !imgError) {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-stone-900 ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imagePath}
          alt={`Scena ${sceneId}`}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover sepia-[0.15] contrast-[1.05]"
        />
        {/* Subtle vintage vignette & grain */}
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.5)]" />
        <div className="pointer-events-none absolute inset-0 border-[6px] border-amber-950/20" />
      </div>
    );
  }

  // Procedural 80s Pastel & Shadow Silhouettes SVG Rendering
  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 800 500"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="hallwayWall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="60%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>

          <radialGradient id="avernusGlow" cx="50%" cy="80%" r="60%">
            <stop offset="0%" stopColor="#86efac" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#22c55e" stopOpacity="0.7" />
            <stop offset="70%" stopColor="#15803d" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#052e16" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="twilightSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e1b4b" />
            <stop offset="50%" stopColor="#312e81" />
            <stop offset="85%" stopColor="#831843" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>

          <linearGradient id="auroraSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#090d16" />
            <stop offset="40%" stopColor="#042f2e" />
            <stop offset="70%" stopColor="#3b0764" />
            <stop offset="100%" stopColor="#022c22" />
          </linearGradient>

          <linearGradient id="dawnSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b0764" />
            <stop offset="40%" stopColor="#831843" />
            <stop offset="75%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#fef08a" />
          </linearGradient>

          <linearGradient id="snowGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f1f5f9" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
        </defs>

        {renderSceneGraphic(sceneId)}

        {/* Vintage Paper Vignette Border */}
        <rect
          x="0"
          y="0"
          width="800"
          height="500"
          fill="none"
          stroke="#78350f"
          strokeWidth="10"
          opacity="0.3"
        />
        <rect
          x="6"
          y="6"
          width="788"
          height="488"
          fill="none"
          stroke="#fef3c7"
          strokeWidth="2"
          opacity="0.4"
        />
      </svg>

      {/* Retro Paper Texture Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-amber-950/10 mix-blend-color-burn opacity-40" />
    </div>
  );
}

function renderSceneGraphic(sceneId: string) {
  switch (sceneId) {
    case "1.1":
      // SCENA 1.1 - "La Porta di Avernus"
      return (
        <g id="scene-1-1">
          <rect width="800" height="500" fill="url(#hallwayWall)" />
          <path d="M0 380 L800 380 L800 500 L0 500 Z" fill="#0f172a" />
          <line x1="0" y1="380" x2="800" y2="380" stroke="#64748b" strokeWidth="6" />

          {/* Warped door */}
          <path
            d="M330 80 C310 180 305 260 330 380 L470 380 C495 260 490 180 470 80 Z"
            fill="#1e1b4b"
            stroke="#09090b"
            strokeWidth="5"
          />
          <ellipse cx="400" cy="380" rx="220" ry="80" fill="url(#avernusGlow)" />
          {/* Radioactive green mist */}
          <path
            d="M360 380 C340 340 370 310 390 330 C410 350 430 310 410 290"
            stroke="#4ade80"
            strokeWidth="18"
            strokeLinecap="round"
            opacity="0.5"
            className="animate-pulse"
          />

          {/* Santa's Belt on floor */}
          <g transform="translate(350, 420)">
            <ellipse cx="50" cy="20" rx="60" ry="15" fill="#000000" opacity="0.4" />
            <path d="M-10 15 C20 30 70 30 110 15 C90 10 30 10 -10 15 Z" fill="#7f1d1d" />
            <rect x="30" y="5" width="40" height="28" rx="6" fill="#fbbf24" stroke="#d97706" strokeWidth="3" />
            <rect x="42" y="12" width="16" height="14" rx="2" fill="#78350f" />
          </g>

          {/* 4 silhouettes pinching noses in penombra */}
          <g fill="#09090b">
            <ellipse cx="140" cy="230" rx="18" ry="18" />
            <path d="M110 410 L125 240 C140 230 155 245 158 270 L155 410 Z" />
            <ellipse cx="230" cy="190" rx="22" ry="22" />
            <path d="M185 410 L220 200 C245 190 275 220 265 280 L260 410 Z" />
            <ellipse cx="580" cy="215" rx="18" ry="18" />
            <path d="M545 410 L580 230 C600 230 615 280 610 330 L605 410 Z" />
            <ellipse cx="685" cy="230" rx="18" ry="18" />
            <path d="M655 410 L685 240 C705 240 715 280 710 330 L705 410 Z" />
          </g>
        </g>
      );

    case "1.2":
      // SCENA 1.2 - "Le Renne sul Tetto"
      return (
        <g id="scene-1-2">
          <rect width="800" height="500" fill="url(#twilightSky)" />
          <circle cx="580" cy="150" r="95" fill="#fef9c3" opacity="0.9" />
          {/* Snowy roof ridge */}
          <polygon points="0,500 0,260 500,450 800,500" fill="#0f172a" />
          <polygon points="0,260 15,250 515,440 500,450" fill="url(#snowGrad)" />

          {/* Skylight with kids popping out */}
          <polygon points="80,300 240,240 290,390 120,470" fill="#1e293b" stroke="#f1f5f9" strokeWidth="6" />
          <polygon points="90,310 230,255 275,385 130,455" fill="#fef3c7" opacity="0.75" />

          {/* Rudolph majestic silhouette */}
          <g fill="#09090b" transform="translate(460, 140)">
            <ellipse cx="120" cy="140" rx="80" ry="55" />
            <circle cx="180" cy="80" r="28" />
            <path d="M180 70 L210 10 M180 70 L230 30 M180 70 L195 0" stroke="#09090b" strokeWidth="7" />
            <circle cx="205" cy="88" r="10" fill="#ef4444" className="animate-pulse" />
          </g>
        </g>
      );

    case "1.3":
      // SCENA 1.3 - "La Farmacia Sprangata"
      return (
        <g id="scene-1-3">
          <rect width="800" height="500" fill="#09090b" />
          <rect x="120" y="60" width="560" height="360" fill="#18181b" stroke="#27272a" strokeWidth="6" />
          {/* Corrugated shutter */}
          <rect x="150" y="120" width="500" height="290" fill="#3f3f46" />
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={i} x1="150" y1={145 + i * 26} x2="650" y2={145 + i * 26} stroke="#27272a" strokeWidth="4" />
          ))}
          {/* Pharmacy cross turned OFF */}
          <g transform="translate(200, 50)" opacity="0.4">
            <rect x="25" y="0" width="20" height="60" rx="4" fill="#065f46" stroke="#047857" strokeWidth="2" />
            <rect x="5" y="20" width="60" height="20" rx="4" fill="#065f46" stroke="#047857" strokeWidth="2" />
          </g>
          {/* Street lamp casting pale yellow pastel light */}
          <ellipse cx="620" cy="160" rx="40" ry="30" fill="#fef08a" opacity="0.6" />
          {/* Silhouettes tampering */}
          <g fill="#09090b" transform="translate(350, 310)">
            <ellipse cx="30" cy="60" rx="16" ry="16" />
            <path d="M10 140 L30 70 L50 140 Z" />
            <ellipse cx="80" cy="50" rx="18" ry="18" />
            <path d="M60 140 L80 60 L100 140 Z" />
          </g>
        </g>
      );

    case "1.4":
      // SCENA 1.4 - "Il Balcone di Giongiorgio"
      return (
        <g id="scene-1-4">
          <rect width="800" height="500" fill="#0f172a" />
          <rect x="0" y="0" width="800" height="420" fill="#1e293b" />
          {/* 1st floor illuminated window with shouting doctor */}
          <rect x="330" y="50" width="140" height="160" rx="5" fill="#fef08a" stroke="#ca8a04" strokeWidth="8" />
          <g fill="#09090b">
            <ellipse cx="400" cy="115" rx="26" ry="26" />
            <path d="M360 200 L370 145 C385 135 415 135 430 145 L440 200 Z" />
            {/* Shouting arm waving */}
            <path d="M370 150 L330 120" stroke="#09090b" strokeWidth="10" strokeLinecap="round" />
          </g>
          <rect x="0" y="420" width="800" height="80" fill="url(#snowGrad)" />
          {/* Silhouettes on sidewalk */}
          <g fill="#09090b" transform="translate(320, 340)">
            <circle cx="40" cy="40" r="16" />
            <path d="M25 100 L40 50 L55 100 Z" />
            <circle cx="90" cy="40" r="16" />
            <path d="M75 100 L90 50 L105 100 Z" />
          </g>
        </g>
      );

    case "1.5":
      // SCENA 1.5 - "Volo a Mach 3 Verso Est"
      return (
        <g id="scene-1-5">
          <rect width="800" height="500" fill="url(#twilightSky)" />
          {/* Pastel clouds */}
          <ellipse cx="200" cy="380" rx="160" ry="70" fill="#f472b6" opacity="0.3" />
          <ellipse cx="600" cy="360" rx="200" ry="80" fill="#ec4899" opacity="0.35" />
          {/* Sleigh darting at Mach 3 */}
          <g fill="#09090b" transform="translate(300, 170) rotate(-12 200 60)">
            <path d="M40 70 C90 110 200 110 240 70 L220 30 L40 30 Z" />
            <path d="M20 90 C80 130 220 130 260 80" stroke="#09090b" strokeWidth="7" fill="none" />
            {/* Speed trails */}
            <line x1="-80" y1="50" x2="20" y2="50" stroke="#fef08a" strokeWidth="4" strokeDasharray="15 8" />
            <line x1="-120" y1="75" x2="10" y2="75" stroke="#f472b6" strokeWidth="4" strokeDasharray="15 8" />
          </g>
        </g>
      );

    case "1.6":
      // SCENA 1.6 - "L'Assedio della Signora Marisa"
      return (
        <g id="scene-1-6">
          <rect width="800" height="500" fill="#1c1917" />
          {/* Door frame */}
          <rect x="220" y="40" width="360" height="460" fill="#292524" stroke="#44403c" strokeWidth="8" />
          {/* Door frosted window casting warm yellow light */}
          <rect x="260" y="80" width="280" height="260" fill="#fef08a" opacity="0.8" />
          {/* Ominous silhouette of building administrator with hair curlers & ledger */}
          <g fill="#09090b" opacity="0.95">
            <ellipse cx="400" cy="180" rx="42" ry="42" />
            {/* Hair rollers bumps */}
            <circle cx="365" cy="155" r="8" />
            <circle cx="400" cy="140" r="8" />
            <circle cx="435" cy="155" r="8" />
            {/* Body */}
            <path d="M330 380 L360 210 C380 190 420 190 440 210 L470 380 Z" />
            {/* Menacing ledger book in hand */}
            <rect x="440" y="220" width="35" height="55" rx="3" fill="#09090b" transform="rotate(-15 440 220)" />
          </g>
        </g>
      );

    case "2.1":
      // SCENA 2.1 - "Babbo Natale Sottozero"
      return (
        <g id="scene-2-1">
          <rect width="800" height="500" fill="#0f172a" />
          <ellipse cx="400" cy="250" rx="200" ry="100" fill="#38bdf8" opacity="0.25" />
          {/* Giant ice cube */}
          <polygon
            points="260,120 480,90 540,290 320,340"
            fill="#e0f2fe"
            stroke="#38bdf8"
            strokeWidth="6"
            opacity="0.85"
          />
          {/* Santa frozen inside */}
          <g fill="#09090b" opacity="0.75">
            <circle cx="400" cy="180" r="35" />
            <path d="M360 260 L380 205 L420 205 L440 260 Z" />
          </g>
          {/* 4 shocked silhouettes staring */}
          <g fill="#09090b" transform="translate(140, 270)">
            <circle cx="30" cy="70" r="16" />
            <path d="M15 150 L30 85 L45 150 Z" />
            <circle cx="80" cy="65" r="18" />
            <path d="M65 150 L80 80 L95 150 Z" />
          </g>
        </g>
      );

    case "2.2":
      // SCENA 2.2 - "Rotte Polari & Aurora Boreale"
      return (
        <g id="scene-2-2">
          <rect width="800" height="500" fill="url(#auroraSky)" />
          {/* Dynamic glowing aurora ribbons */}
          <path
            d="M0 80 C200 160 400 40 600 120 C700 160 800 90 800 90 L800 240 C650 180 500 260 300 180 C150 120 0 220 0 220 Z"
            fill="#10b981"
            opacity="0.45"
            className="animate-pulse"
          />
          <path
            d="M0 130 C250 80 450 200 650 140 C750 110 800 170 800 170 L800 270 C600 230 400 300 200 220 C100 180 0 250 0 250 Z"
            fill="#a855f7"
            opacity="0.35"
          />
          {/* Ice pack banchisa */}
          <polygon points="0,500 0,380 220,360 480,390 800,350 800,500" fill="#f8fafc" />
          {/* Tiny Sleigh flying through aurora */}
          <g fill="#09090b" transform="translate(420, 160) scale(0.65)">
            <path d="M40 70 C90 110 200 110 240 70 L220 30 L40 30 Z" />
            <ellipse cx="290" cy="50" rx="35" ry="18" />
          </g>
        </g>
      );

    case "2.3":
      // SCENA 2.3 - "Freddo Cane (-45°C)"
      return (
        <g id="scene-2-3">
          <rect width="800" height="500" fill="#0369a1" />
          <ellipse cx="400" cy="200" rx="450" ry="180" fill="#0c4a6e" />
          {/* Blizzard lines */}
          {Array.from({ length: 25 }).map((_, i) => (
            <line
              key={i}
              x1={(i * 35) % 800}
              y1={50 + (i * 18) % 400}
              x2={((i * 35) % 800) + 70}
              y2={50 + ((i * 18) % 400) + 20}
              stroke="#e0f2fe"
              strokeWidth="2"
              opacity="0.5"
            />
          ))}
          {/* 4 heroes bundled in Ikea duvets and thermal emergency foils */}
          <g transform="translate(240, 220)">
            {/* Shivering duvet mounds */}
            <ellipse cx="80" cy="150" rx="55" ry="70" fill="#09090b" />
            <ellipse cx="180" cy="140" rx="65" ry="75" fill="#09090b" />
            <ellipse cx="280" cy="150" rx="50" ry="65" fill="#09090b" />
            {/* Thermal foil reflections */}
            <line x1="60" y1="120" x2="100" y2="170" stroke="#fef08a" strokeWidth="4" />
            <line x1="160" y1="100" x2="200" y2="160" stroke="#fef08a" strokeWidth="4" />
          </g>
        </g>
      );

    case "2.4":
      // SCENA 2.4 - "Il Picchetto del Sindacato Elfico"
      return (
        <g id="scene-2-4">
          <rect width="800" height="500" fill="#18181b" />
          {/* Brutalist toy factory gates */}
          <rect x="0" y="60" width="800" height="360" fill="#27272a" />
          <line x1="0" y1="240" x2="800" y2="240" stroke="#09090b" strokeWidth="8" />
          {Array.from({ length: 16 }).map((_, i) => (
            <line key={i} x1={50 * i} y1="120" x2={50 * i} y2="420" stroke="#09090b" strokeWidth="6" />
          ))}
          {/* Elf picketers silhouettes holding strike signs */}
          <g fill="#09090b" transform="translate(180, 260)">
            {/* Elf 1 */}
            <circle cx="60" cy="100" r="14" />
            <polygon points="45,95 60,65 75,95" />
            <path d="M50 160 L60 110 L70 160 Z" />
            <line x1="75" y1="160" x2="75" y2="60" stroke="#09090b" strokeWidth="4" />
            <rect x="55" y="40" width="40" height="25" rx="3" fill="#ef4444" stroke="#09090b" strokeWidth="2" />
            {/* Elf 2 */}
            <circle cx="160" cy="105" r="14" />
            <polygon points="145,100 160,70 175,100" />
            <path d="M150 160 L160 115 L170 160 Z" />
            <line x1="175" y1="160" x2="175" y2="55" stroke="#09090b" strokeWidth="4" />
            <rect x="155" y="35" width="45" height="28" rx="3" fill="#fbbf24" stroke="#09090b" strokeWidth="2" />
          </g>
        </g>
      );

    case "3.1":
      // SCENA 3.1 - "Il Bunker dell'Oligarca"
      return (
        <g id="scene-3-1">
          <rect width="800" height="500" fill="#09090b" />
          {/* Ultramodern concrete bunker villa */}
          <polygon points="120,420 200,160 620,140 720,420" fill="#1e293b" stroke="#334155" strokeWidth="6" />
          {/* Laser targeting beams */}
          <line x1="300" y1="160" x2="160" y2="440" stroke="#ef4444" strokeWidth="3" strokeDasharray="6 4" className="animate-pulse" />
          <line x1="520" y1="150" x2="650" y2="440" stroke="#ef4444" strokeWidth="3" strokeDasharray="6 4" className="animate-pulse" />
          {/* Security cameras */}
          <rect x="290" y="150" width="20" height="12" rx="3" fill="#ef4444" />
          <rect x="510" y="140" width="20" height="12" rx="3" fill="#ef4444" />
          {/* Shadows crawling on snow lawn */}
          <g fill="#09090b" transform="translate(320, 420)">
            <ellipse cx="60" cy="30" rx="35" ry="12" />
            <ellipse cx="140" cy="35" rx="40" ry="14" />
          </g>
        </g>
      );

    case "3.2":
      // SCENA 3.2 - "Il Comignolo da Stufa a Pellet"
      return (
        <g id="scene-3-2">
          <rect width="800" height="500" fill="url(#twilightSky)" />
          {/* Modern sloped roof */}
          <polygon points="0,500 0,320 800,220 800,500" fill="#18181b" />
          <polygon points="0,320 0,310 800,210 800,220" fill="url(#snowGrad)" />
          {/* Tiny stainless steel pellet flue pipe */}
          <rect x="420" y="160" width="18" height="90" fill="#94a3b8" stroke="#475569" strokeWidth="3" />
          <polygon points="415,160 443,160 429,145" fill="#64748b" />
          {/* Kids frantically shoving giant tricycle */}
          <g fill="#09090b" transform="translate(340, 140)">
            {/* Tricycle wheels */}
            <circle cx="60" cy="50" r="28" stroke="#09090b" strokeWidth="6" fill="none" />
            <circle cx="120" cy="60" r="18" stroke="#09090b" strokeWidth="5" fill="none" />
            {/* Silhouettes pushing */}
            <ellipse cx="10" cy="70" rx="16" ry="16" />
            <path d="M-5 130 L10 80 L35 110 Z" />
          </g>
        </g>
      );

    case "3.3":
      // SCENA 3.3 - "L'Imboscata del Moccioso TikToker"
      return (
        <g id="scene-3-3">
          <rect width="800" height="500" fill="#09090b" />
          {/* Dark living room lit only by Christmas tree lights */}
          <polygon points="650,140 580,380 720,380" fill="#064e3b" />
          <circle cx="620" cy="220" r="6" fill="#ef4444" className="animate-ping" />
          <circle cx="660" cy="280" r="6" fill="#fbbf24" className="animate-ping" />
          <circle cx="630" cy="340" r="6" fill="#38bdf8" className="animate-ping" />
          {/* Kid with baseball bat & phone screen glow */}
          <g fill="#09090b" transform="translate(280, 200)">
            <ellipse cx="80" cy="60" rx="22" ry="22" />
            <path d="M60 180 L80 80 L100 180 Z" />
            {/* Baseball bat raised */}
            <line x1="60" y1="90" x2="30" y2="10" stroke="#09090b" strokeWidth="8" strokeLinecap="round" />
            {/* Glowing Smartphone screen lighting kid's menacing face */}
            <rect x="100" y="60" width="18" height="30" rx="3" fill="#ffffff" className="animate-pulse" />
          </g>
        </g>
      );

    case "4.1":
      // SCENA 4.1 - "Ritorno all'Alba"
      return (
        <g id="scene-4-1">
          <rect width="800" height="500" fill="url(#dawnSky)" />
          <rect x="120" y="240" width="560" height="260" fill="#1c1917" />
          {/* Melted puddles of water */}
          <ellipse cx="400" cy="380" rx="140" ry="25" fill="#38bdf8" opacity="0.4" />
          {/* 4 exhausted soot-covered heroes slumped on floor */}
          <g fill="#09090b" transform="translate(180, 310)">
            <ellipse cx="60" cy="70" rx="35" ry="20" />
            <circle cx="40" cy="45" r="14" />
            <ellipse cx="160" cy="65" rx="40" ry="22" />
            <circle cx="140" cy="40" r="16" />
            <ellipse cx="260" cy="70" rx="35" ry="20" />
            <circle cx="280" cy="45" r="14" />
          </g>
        </g>
      );

    case "4.2":
      // SCENA 4.2 - "La Controburla di Natale!"
      return (
        <g id="scene-4-2">
          <rect width="800" height="500" fill="#1e1b4b" />
          {/* Bathroom medicine cabinet open with Imodium inside */}
          <rect x="140" y="100" width="160" height="220" rx="6" fill="#f8fafc" stroke="#334155" strokeWidth="6" />
          <rect x="160" y="160" width="60" height="35" rx="4" fill="#22c55e" />
          <rect x="160" y="210" width="50" height="25" rx="3" fill="#3b82f6" />
          {/* Santa Claus laughing slyly with plate and post-it */}
          <g fill="#09090b" transform="translate(420, 140)">
            <ellipse cx="140" cy="180" rx="90" ry="80" />
            <circle cx="120" cy="80" r="40" />
            <path d="M80 80 C80 150 160 150 160 80 Z" />
            {/* Holding cookie plate with post-it */}
            <ellipse cx="40" cy="160" rx="35" ry="12" fill="#fef08a" />
            <rect x="30" y="145" width="20" height="20" fill="#facc15" stroke="#78350f" strokeWidth="2" />
          </g>
        </g>
      );

    case "4.3":
      // SCENA 4.3 - "Buon Natale, Pagliacci!"
      return (
        <g id="scene-4-3">
          <rect width="800" height="500" fill="url(#twilightSky)" />
          {/* Sleigh flying off into horizon */}
          <g fill="#09090b" transform="translate(520, 80) scale(0.7)">
            <path d="M40 70 C90 110 200 110 240 70 L220 30 L40 30 Z" />
            <ellipse cx="290" cy="50" rx="35" ry="18" />
          </g>
          {/* Apartment door blown open under sledgehammer hits */}
          <polygon points="120,440 180,180 340,160 280,480" fill="#78350f" stroke="#09090b" strokeWidth="5" />
          <line x1="220" y1="200" x2="260" y2="400" stroke="#09090b" strokeWidth="8" />
        </g>
      );

    case "98":
      // SCENA 98 - "Il Master Sta Improvvisando..."
      return (
        <g id="scene-98">
          <rect width="800" height="500" fill="#334155" />
          {/* Giant golden glowing question mark */}
          <text
            x="400"
            y="320"
            textAnchor="middle"
            fontSize="260"
            fontWeight="900"
            fill="#fef08a"
            opacity="0.35"
            className="animate-pulse"
          >
            ?
          </text>
          {/* Confused reindeer staring into cosmic void */}
          <g fill="#09090b" transform="translate(320, 220)">
            <ellipse cx="80" cy="120" rx="60" ry="35" />
            <circle cx="40" cy="90" r="22" />
            <path d="M40 80 L20 40 M40 80 L55 40" stroke="#09090b" strokeWidth="6" />
          </g>
        </g>
      );

    default:
      return <rect width="800" height="500" fill="#18181b" />;
  }
}
