"use client";

import React from "react";
import { GameProvider, useGame } from "@/context/GameContext";
import { LobbyView } from "@/components/views/LobbyView";
import { PlayerGameView } from "@/components/views/PlayerGameView";
import { MasterDashboard } from "@/components/views/MasterDashboard";
import { DiceRollOverlay } from "@/components/overlays/DiceRollOverlay";
import { SantaBeltOverlay } from "@/components/overlays/SantaBeltOverlay";
import { KickOutToast } from "@/components/overlays/KickOutToast";

function MainApp() {
  const {
    state,
    isMaster,
    clearOverlays,
    kickOutNotice,
    clearKickOutNotice,
  } = useGame();

  return (
    <main className="relative min-h-screen bg-stone-950 text-stone-100 font-sans">
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
