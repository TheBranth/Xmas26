"use client";

import React, { useEffect } from "react";
import { GameProvider, useGame } from "@/context/GameContext";
import { MasterDashboard } from "@/components/views/MasterDashboard";
import { DiceRollOverlay } from "@/components/overlays/DiceRollOverlay";
import { SantaBeltOverlay } from "@/components/overlays/SantaBeltOverlay";

function MasterContainer() {
  const { state, setIsMaster, clearOverlays } = useGame();

  useEffect(() => {
    setIsMaster(true);
  }, [setIsMaster]);

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
      <MasterContainer />
    </GameProvider>
  );
}
