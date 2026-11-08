import React from "react";
import { AlertTriangle, Plus, Minus } from "lucide-react";

interface Props {
  clock: number; // 0 to 6
  onChangeClock?: (newVal: number) => void;
  interactive?: boolean;
}

// Static 6-slice SVG paths precalculated with fixed precision to prevent any SSR hydration mismatch
const SLICE_PATHS = [
  "M 50 50 L 92.000 50.000 A 42 42 0 0 1 71.000 86.373 Z",
  "M 50 50 L 71.000 86.373 A 42 42 0 0 1 29.000 86.373 Z",
  "M 50 50 L 29.000 86.373 A 42 42 0 0 1 8.000 50.000 Z",
  "M 50 50 L 8.000 50.000 A 42 42 0 0 1 29.000 13.627 Z",
  "M 50 50 L 29.000 13.627 A 42 42 0 0 1 71.000 13.627 Z",
  "M 50 50 L 71.000 13.627 A 42 42 0 0 1 92.000 50.000 Z",
];

export function DisasterClock({ clock, onChangeClock, interactive = true }: Props) {
  const slices = [0, 1, 2, 3, 4, 5];

  const handleIncrement = () => {
    if (onChangeClock && clock < 6) onChangeClock(clock + 1);
  };

  const handleDecrement = () => {
    if (onChangeClock && clock > 0) onChangeClock(clock - 1);
  };

  return (
    <div className="flex flex-col items-center bg-stone-900/80 p-3 rounded-2xl border border-stone-700/60 shadow-xl backdrop-blur-md">
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle className={`w-4 h-4 ${clock >= 5 ? "text-red-500 animate-ping" : "text-amber-500"}`} />
        <span className="text-xs font-bold uppercase tracking-wider text-amber-200">
          Orologio del Disastro ({clock}/6)
        </span>
      </div>

      {/* 6-slice pie wheel SVG */}
      <div className="relative w-28 h-28 my-1">
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
          {slices.map((idx) => {
            const isFilled = idx < clock;
            const isDanger = clock >= 5;

            return (
              <path
                key={idx}
                d={SLICE_PATHS[idx]}
                className={`transition-colors duration-300 stroke-stone-900 stroke-2 ${
                  isFilled
                    ? isDanger
                      ? "fill-red-600 animate-pulse"
                      : "fill-amber-500"
                    : "fill-stone-800/80"
                }`}
              />
            );
          })}
          {/* Inner brass hub */}
          <circle cx="50" cy="50" r="14" fill="#1c1917" stroke="#d97706" strokeWidth="2" />
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-sm font-extrabold text-amber-100">{clock}</span>
        </div>
      </div>

      <p className="text-[11px] text-stone-400 text-center mt-1 px-1">
        {clock === 0 && "Babbo Natale resiste sul water..."}
        {clock > 0 && clock < 3 && "I primi rumori sospetti risuonano..."}
        {clock >= 3 && clock < 5 && "L'asse del WC inizia a cedere!"}
        {clock === 5 && "ALLARME CRITICO: La digestione sta collassando!"}
        {clock === 6 && "CATASTROFE NUCLEARE NATALIZIA!"}
      </p>

      {interactive && (
        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={handleDecrement}
            disabled={clock <= 0}
            className="w-7 h-7 flex items-center justify-center rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 disabled:opacity-30 border border-stone-600/50 active:scale-95 transition"
            title="Riduci Disastro"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="text-xs font-mono font-bold text-stone-300">{clock} / 6</span>
          <button
            onClick={handleIncrement}
            disabled={clock >= 6}
            className="w-7 h-7 flex items-center justify-center rounded-lg bg-amber-600 hover:bg-amber-500 text-white disabled:opacity-30 active:scale-95 transition shadow"
            title="Aumenta Disastro"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
