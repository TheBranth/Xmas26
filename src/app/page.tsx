"use client";

import React from "react";
import { GameProvider, useGame } from "@/context/GameContext";
import { LobbyView } from "@/components/views/LobbyView";
import { PlayerGameView } from "@/components/views/PlayerGameView";
import { MasterDashboard } from "@/components/views/MasterDashboard";
import { DiceRollOverlay } from "@/components/overlays/DiceRollOverlay";
import { SantaBeltOverlay } from "@/components/overlays/SantaBeltOverlay";
import { KickOutToast } from "@/components/overlays/KickOutToast";
import { Crown, Smartphone } from "lucide-react";

function MainApp() {
  const {
    state,
    isMaster,
    setIsMaster,
    clearOverlays,
    kickOutNotice,
    clearKickOutNotice,
  } = useGame();

  // Role toggle for quick pair-testing
  return (
    <main className="relative min-h-screen bg-stone-950 text-stone-100 font-sans">
      {/* Top Floating Master / Player Mode Switcher */}
      <div className="fixed bottom-2 right-2 z-40">
        <button
          onClick={() => setIsMaster(!isMaster)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-black border shadow-2xl backdrop-blur-md transition-all active:scale-95 ${
            isMaster
              ? "bg-amber-500 text-stone-950 border-amber-300 ring-2 ring-amber-400/40"
              : "bg-stone-900/90 text-stone-300 border-stone-700 hover:text-white"
          }`}
          title="Cambia Ruolo Master / Giocatore"
        >
          {isMaster ? (
            <>
              <Crown className="w-3.5 h-3.5 fill-current" />
              <span>Modalità Master</span>
            </>
          ) : (
            <>
              <Smartphone className="w-3.5 h-3.5" />
              <span>Vista Giocatore (Tocca per Master)</span>
            </>
          )}
        </button>
      </div>

      {/* Main Content View */}
      {isMaster ? (
        <MasterDashboard />
      ) : state.status === "LOBBY" ? (
        <LobbyView />
      ) : (
        <PlayerGameView />
      )}

      {/* Global Overlays */}
      <DiceRollOverlay roll={state.lastRoll} onClose={clearOverlays} />
      <SantaBeltOverlay draw={state.lastBeltDraw} onClose={clearOverlays} />
      <KickOutToast notice={kickOutNotice} onDismiss={clearKickOutNotice} />
    </main>
  );
}

export default function Home() {
  return (
    <GameProvider>
      <MainApp />
    </GameProvider>
  );
}
