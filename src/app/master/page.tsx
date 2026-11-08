"use client";

import React, { useState, useEffect } from "react";
import { GameProvider, useGame } from "@/context/GameContext";
import { MasterDashboard } from "@/components/views/MasterDashboard";
import { DiceRollOverlay } from "@/components/overlays/DiceRollOverlay";
import { SantaBeltOverlay } from "@/components/overlays/SantaBeltOverlay";
import { Lock, KeyRound, Sparkles, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

const VALID_PASSWORDS = ["imodium", "avernus", "natale26", "babbo"];

function MasterGate() {
  const { state, setIsMaster, clearOverlays } = useGame();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("ons_master_auth") === "true";
  });
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setIsMaster(true);
    }
  }, [isAuthenticated, setIsMaster]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = password.trim().toLowerCase();
    if (VALID_PASSWORDS.includes(clean)) {
      setIsAuthenticated(true);
      setIsMaster(true);
      setError(false);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("ons_master_auth", "true");
      }
    } else {
      setError(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-stone-950 text-stone-100 flex flex-col items-center justify-center p-4">
        {/* Background festive nostalgic grain & radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/40 via-stone-950 to-stone-950 pointer-events-none" />

        <div className="relative z-10 w-full max-w-sm bg-stone-900/90 border-2 border-amber-600/50 rounded-3xl p-6 shadow-2xl backdrop-blur-md text-center">
          <div className="inline-flex p-3 rounded-2xl bg-amber-500/20 text-amber-400 mb-3 border border-amber-500/30">
            <Lock className="w-7 h-7" />
          </div>

          <span className="text-[10px] font-bold tracking-widest uppercase text-amber-500/90 bg-amber-950/60 border border-amber-800/40 px-2.5 py-0.5 rounded-full inline-block mb-1">
            🎄 Area Riservata Regia 🎄
          </span>
          <h1 className="text-2xl font-black text-amber-100 mt-1">
            Console del Master
          </h1>
          <p className="text-xs text-stone-400 mt-1 mb-5">
            Inserisci la parola d&apos;ordine per accedere alla cabina di regia e non spoilerare le scene ai giocatori.
          </p>

          <form onSubmit={handleLogin} className="space-y-3">
            <div className="relative">
              <KeyRound className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Parola d'ordine segreta..."
                className="w-full bg-stone-950 border border-stone-700 focus:border-amber-400 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none transition shadow-inner"
                autoFocus
              />
            </div>

            {error && (
              <div className="flex items-center gap-1.5 text-[11px] text-rose-400 justify-center">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Parola d&apos;ordine errata! Riprova.</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black text-xs uppercase tracking-wider shadow-lg active:scale-95 transition flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Sblocca Cabina di Regia
            </button>
          </form>

          <div className="mt-5 pt-4 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
            <Link
              href="/"
              className="inline-flex items-center gap-1 hover:text-amber-300 transition"
            >
              <ArrowLeft className="w-3 h-3" /> Vista Giocatori
            </Link>
            <span className="italic text-stone-500">Hint: imodium</span>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-950 text-stone-100">
      <MasterDashboard />
      <DiceRollOverlay roll={state.lastRoll} onClose={clearOverlays} />
      <SantaBeltOverlay draw={state.lastBeltDraw} onClose={clearOverlays} />
    </main>
  );
}

export default function MasterPage() {
  return (
    <GameProvider>
      <MasterGate />
    </GameProvider>
  );
}
