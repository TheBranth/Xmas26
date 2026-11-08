"use client";

import React, { useState } from "react";
import { useGame } from "@/context/GameContext";
import { SCENES, PHASES } from "@/data/scenes";
import { CHARACTERS } from "@/data/characters";
import { GameScene } from "@/types/game";
import { SceneIllustration } from "@/components/illustrations/SceneIllustration";
import {
  Sparkles,
  Gift,
  RotateCcw,
  Plus,
  Minus,
  Cookie,
  Image as ImageIcon,
  Send,
  Radio,
  RadioTower,
  CheckCircle2,
} from "lucide-react";

export function MasterDashboard() {
  const {
    state,
    setScene,
    setCustomScene,
    modifyCookie,
    drawBelt,
    setStatus,
    resetLocks,
  } = useGame();

  // Find phase of the current scene to initialize selectedPhase tab
  const currentSceneObj = SCENES.find((s) => s.id === state.currentSceneId);
  const [selectedPhase, setSelectedPhase] = useState<number>(currentSceneObj?.phase || 1);

  // Custom scene form inputs
  const [customTitle, setCustomTitle] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const [applyFilter, setApplyFilter] = useState(true);
  const [masterBeltItem, setMasterBeltItem] = useState("");

  const handleProjectCustomScene = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrl.trim()) return;
    setCustomScene({
      title: customTitle.trim() || "Scena Improvvisata dal Master",
      imageUrl: customUrl.trim(),
      applyPastelFilter: applyFilter,
    });
  };

  const activeScene: GameScene =
    state.currentSceneId === "99" && state.customScene
      ? {
          id: "99",
          phase: 99,
          phaseTitle: "Jolly",
          title: state.customScene.title,
          imagePath: state.customScene.imageUrl,
          silhouetteNote: "Immagine personalizzata fornita al volo dal Master",
        }
      : currentSceneObj || SCENES[0];

  const subScenes = SCENES.filter((s) => s.phase === selectedPhase);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 p-4 sm:p-6 max-w-7xl mx-auto font-sans">
      {/* Header Bar */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400">
              Console di Regia • Game Master
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-amber-100 mt-1">
            Operazione Notte Silenziosa
          </h1>
        </div>

        {/* Status indicator & Fast actions */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-700 text-xs flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>
              Stato: <strong className="text-amber-300">{state.status}</strong>
            </span>
          </div>

          <button
            onClick={() => setStatus(state.status === "LOBBY" ? "ACTIVE" : "LOBBY")}
            className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-bold border border-stone-600 transition flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {state.status === "LOBBY" ? "Passa a Partita Attiva" : "Torna alla Lobby"}
          </button>
        </div>
      </header>

      {/* Main Grid: Left Side Controls & Right Side Scene Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* ========================================================= */}
        {/* LEFT COLUMN: Monitor ON AIR, Orologio, Cintura (5 cols)   */}
        {/* ========================================================= */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Active Broadcast Preview (Monitor ON AIR) */}
          <div className="bg-stone-900/90 border-2 border-amber-600/60 rounded-3xl p-4 shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <RadioTower className="w-4 h-4 text-red-500 animate-pulse" /> In Proiezione sui Telefoni
              </span>
              <span className="px-2 py-0.5 rounded-full bg-red-600 text-white font-black text-[10px] tracking-wider animate-pulse shadow">
                ON AIR
              </span>
            </div>

            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-stone-950 border border-stone-800 shadow-inner">
              <SceneIllustration
                key={`${state.currentSceneId}_${activeScene.imagePath}`}
                sceneId={state.currentSceneId}
                imagePath={activeScene.imagePath}
                customData={state.customScene}
                className="w-full h-full"
              />
              <div className="absolute bottom-2 left-2 right-2 text-center bg-stone-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-stone-700/60">
                <span className="text-[10px] text-amber-400 font-bold block">
                  SCENA {state.currentSceneId} • {activeScene.phaseTitle}
                </span>
                <span className="text-xs font-black text-white truncate block">
                  {activeScene.title}
                </span>
              </div>
            </div>
          </div>

          {/* Attiva Cintura di Babbo Natale Action */}
          <div className="bg-gradient-to-br from-amber-950/70 via-stone-900 to-amber-950/70 border-2 border-amber-500/70 rounded-3xl p-5 shadow-xl text-center">
            <div className="inline-flex p-3 rounded-2xl bg-amber-500/20 text-amber-300 mb-2">
              <Gift className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-black text-amber-200">
              Cintura di Babbo Natale
            </h3>
            <p className="text-xs text-stone-300 mt-1 mb-3">
              I giocatori scelgono l&apos;oggetto, la penitenza cringe dal vivo è estratta a sorte!
            </p>
            <div className="mb-3 text-left">
              <input
                type="text"
                value={masterBeltItem}
                onChange={(e) => setMasterBeltItem(e.target.value)}
                placeholder="Oggetto richiesto (es. Mentina distruttiva)..."
                className="w-full bg-stone-950/90 border border-amber-500/40 rounded-xl px-3 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-400"
              />
            </div>
            <button
              onClick={() => {
                drawBelt(masterBeltItem);
                setMasterBeltItem("");
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black text-sm uppercase tracking-wider shadow-lg active:scale-95 transition flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Pescata Cintura & Penitenza
            </button>
          </div>

          {/* Dispenser Biscotti del Cringe */}
          <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-5 shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <Cookie className="w-4 h-4 text-amber-400 fill-amber-400" />
              <h3 className="text-xs font-black uppercase tracking-wider text-amber-200">
                Dispenser Biscotti del Cringe
              </h3>
            </div>

            <div className="space-y-2">
              {CHARACTERS.map((c) => {
                const lock = state.characterLocks[c.id];
                const cookieCount = state.cookies[c.id] ?? 0;

                return (
                  <div
                    key={c.id}
                    className="flex items-center justify-between p-2.5 rounded-2xl bg-stone-950/60 border border-stone-800/80"
                  >
                    <div>
                      <div className="text-xs font-bold text-stone-200">{c.name}</div>
                      <div className="text-[10px] text-stone-400">
                        {lock ? `Giocatore: ${lock.playerName}` : "Nessun giocatore"}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => modifyCookie(c.id, -1)}
                        disabled={cookieCount <= 0}
                        className="w-7 h-7 flex items-center justify-center rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 disabled:opacity-30 border border-stone-700 active:scale-95"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-black text-amber-300 w-6 text-center">
                        {cookieCount}
                      </span>
                      <button
                        onClick={() => modifyCookie(c.id, 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-lg bg-amber-600 hover:bg-amber-500 text-white border border-amber-500 active:scale-95"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reset Emergenza */}
          <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-900/50 flex items-center justify-between">
            <div className="text-xs text-rose-300">
              <strong>Reset Schede:</strong> Sblocca forzatamente tutte le selezioni.
            </div>
            <button
              onClick={resetLocks}
              className="px-3 py-1.5 rounded-xl bg-rose-900/60 hover:bg-rose-800 text-rose-200 text-xs font-bold border border-rose-700/60 transition"
            >
              Reset Schede
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: Struttura Gerarchica per Fasi & Sottofasi    */}
        {/* ========================================================= */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* 1. Tab di Fase in Alto */}
          <div className="bg-stone-900/95 border border-stone-800 rounded-3xl p-3 shadow-xl">
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block mb-2 px-1">
              Seleziona Fase Narrativa:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
              {PHASES.map((phase) => {
                const isSelected = selectedPhase === phase.id;
                // Check if current on-air scene belongs to this phase
                const hasOnAir = currentSceneObj?.phase === phase.id;

                return (
                  <button
                    key={phase.id}
                    onClick={() => setSelectedPhase(phase.id)}
                    className={`relative py-2.5 px-2 rounded-2xl text-xs font-black transition-all flex flex-col items-center justify-center text-center border ${
                      isSelected
                        ? "bg-gradient-to-b from-amber-600 to-amber-700 text-stone-950 border-amber-400 shadow-lg ring-2 ring-amber-400/50 scale-[1.02]"
                        : "bg-stone-950/70 hover:bg-stone-800 text-stone-300 border-stone-800 hover:border-stone-700"
                    }`}
                  >
                    <span>{phase.shortLabel}</span>
                    {hasOnAir && (
                      <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Griglia Sottofasi a Pulsantoni Rapidi */}
          <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-5 shadow-xl flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-800">
                <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                  {PHASES.find((p) => p.id === selectedPhase)?.label} • Sottofasi
                </span>
                <span className="text-xs text-stone-400">
                  1 click proietta all&apos;istante
                </span>
              </div>

              {/* Grid of subphase cards (for phases 1, 2, 3, 4 and scene 98) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {subScenes
                  .filter((s) => s.id !== "99")
                  .map((scene) => {
                    const isOnAir = state.currentSceneId === scene.id;

                    return (
                      <button
                        key={scene.id}
                        onClick={() => setScene(scene.id)}
                        className={`relative text-left p-3 rounded-2xl border transition-all flex flex-col justify-between overflow-hidden group ${
                          isOnAir
                            ? "bg-amber-950/50 border-amber-400 ring-4 ring-amber-400/60 shadow-2xl shadow-amber-500/40 scale-[1.01]"
                            : "bg-stone-950/70 border-stone-800 hover:border-amber-500/60 hover:bg-stone-900"
                        }`}
                      >
                        {/* Thumbnail preview */}
                        <div className="relative w-full h-24 rounded-xl overflow-hidden bg-stone-900 mb-2 border border-stone-800">
                          <SceneIllustration
                            sceneId={scene.id}
                            imagePath={scene.imagePath}
                            className="w-full h-full"
                          />
                          {isOnAir && (
                            <div className="absolute top-1.5 right-1.5 px-2.5 py-0.5 rounded-full bg-red-600 text-white font-black text-[10px] tracking-wider animate-pulse shadow-md flex items-center gap-1">
                              <Radio className="w-3 h-3" /> ON AIR
                            </div>
                          )}
                        </div>

                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-amber-400 block font-mono">
                              SCENA {scene.id}
                            </span>
                            {isOnAir && (
                              <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" /> Attiva
                              </span>
                            )}
                          </div>
                          <h4 className="text-xs font-black text-stone-100 group-hover:text-amber-200 transition mt-0.5">
                            {scene.title}
                          </h4>
                          <p className="text-[10px] text-stone-400 mt-1 line-clamp-2 italic">
                            &ldquo;{scene.silhouetteNote}&rdquo;
                          </p>
                        </div>
                      </button>
                    );
                  })}
              </div>
            </div>

            {/* 3. Box Scena 99 (URL Remota) - nel tab Jolly */}
            {selectedPhase === 99 && (
              <div className="mt-5 pt-4 border-t-2 border-stone-800">
                <div className="flex items-center gap-2 mb-3">
                  <ImageIcon className="w-4 h-4 text-amber-400" />
                  <h4 className="text-xs font-black uppercase tracking-wider text-amber-200">
                    Scena 99: Input URL Remoto (Proiezione Estemporanea)
                  </h4>
                </div>

                <form onSubmit={handleProjectCustomScene} className="space-y-3">
                  <div>
                    <label className="text-[11px] font-bold text-stone-400 block mb-1">
                      Titolo Scena Improvvisata
                    </label>
                    <input
                      type="text"
                      value={customTitle}
                      onChange={(e) => setCustomTitle(e.target.value)}
                      placeholder="Es: 'La Cantina della Pro Loco con i Panettoni di Contrabbando'"
                      className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-stone-400 block mb-1">
                      URL Immagine (Google / Unsplash / Street View)
                    </label>
                    <input
                      type="url"
                      value={customUrl}
                      onChange={(e) => setCustomUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer bg-stone-950/60 p-2.5 rounded-xl border border-stone-800">
                    <input
                      type="checkbox"
                      checked={applyFilter}
                      onChange={(e) => setApplyFilter(e.target.checked)}
                      className="rounded text-amber-600 focus:ring-amber-500"
                    />
                    <span className="text-xs text-stone-300 font-medium">
                      Applica filtro Pastello/Fiaba Anni &apos;80 (CSS sepia/contrast/vignette)
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 active:scale-95 transition"
                  >
                    <Send className="w-3.5 h-3.5" /> Proietta al Volo (Scena 99)
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
