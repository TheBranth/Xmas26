"use client";

import React, { useState } from "react";
import { useGame } from "@/context/GameContext";
import { CHARACTERS, STAT_LABELS } from "@/data/characters";
import { SCENES } from "@/data/scenes";
import { StatKey } from "@/types/game";
import { SceneIllustration } from "@/components/illustrations/SceneIllustration";
import { SnowEffect } from "@/components/effects/SnowEffect";
import { Cookie, Sparkles, Gift, X, AlertTriangle } from "lucide-react";

export function PlayerGameView() {
  const { state, myCharacterId, playerName, rollDice, drawBelt } = useGame();

  const [isBeltModalOpen, setIsBeltModalOpen] = useState(false);
  const [customBeltItem, setCustomBeltItem] = useState("");

  const character = CHARACTERS.find((c) => c.id === myCharacterId) || CHARACTERS[0];
  const currentScene =
    state.currentSceneId === "99" && state.customScene
      ? {
          id: "99",
          phase: 99,
          phaseTitle: "Jolly",
          title: state.customScene.title,
          imagePath: state.customScene.imageUrl,
          silhouetteNote: "",
        }
      : SCENES.find((s) => s.id === state.currentSceneId) || SCENES[0];

  const myCookies = state.cookies[character.id] ?? 1;

  // Selected dice roll configuration state
  const [selectedStat, setSelectedStat] = useState<StatKey>("muscoli");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [selectedNegativeTrait, setSelectedNegativeTrait] = useState<string | null>(null);
  const [spendCookie, setSpendCookie] = useState<boolean>(false);

  // Compute Dice Pool
  const baseStatValue = character.stats[selectedStat];
  let calculatedDice = baseStatValue;
  if (selectedSpecialty) calculatedDice += 1;
  if (selectedNegativeTrait) calculatedDice -= 1;
  if (spendCookie && myCookies > 0) calculatedDice += 1;
  const finalDiceCount = Math.max(1, calculatedDice);

  const handleRoll = () => {
    rollDice({
      characterId: character.id,
      characterName: character.name,
      statKey: selectedStat,
      statName: STAT_LABELS[selectedStat]?.label || selectedStat,
      statValue: baseStatValue,
      specialtyUsed: selectedSpecialty,
      negativeTraitUsed: selectedNegativeTrait,
      spentCookie: spendCookie && myCookies > 0,
    });

    // Reset temporary roll modifiers after throwing
    setSelectedSpecialty(null);
    setSelectedNegativeTrait(null);
    setSpendCookie(false);
  };

  return (
    <div className="relative flex flex-col h-[100dvh] w-full max-w-md mx-auto bg-stone-950 text-stone-100 overflow-hidden font-sans select-none border-x border-stone-800">
      {/* ------------------------------------------------------------- */}
      {/* 1. HEADER / STAGE VISIVO (Top 35-40%)                          */}
      {/* ------------------------------------------------------------- */}
      <section className="relative h-[38%] w-full flex-shrink-0 bg-stone-900 overflow-hidden shadow-lg border-b-2 border-amber-900/40">
        {/* Active Scene Illustration */}
        <SceneIllustration
          key={`${state.currentSceneId}_${currentScene.imagePath}`}
          sceneId={state.currentSceneId}
          imagePath={currentScene.imagePath}
          customData={state.customScene}
          className="w-full h-full"
        />

        {/* Gentle falling snow on top of the illustration */}
        <SnowEffect />

        {/* Top Vignette and HUD overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/80 via-transparent to-stone-950/90 pointer-events-none" />

        {/* Top Row: Character Name & Cringe Cookies Badge */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20">
          <div className="bg-stone-950/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-stone-700/60 flex items-center gap-2 shadow-md">
            {character.imagePath ? (
              <img
                src={character.imagePath}
                alt={character.name}
                className="w-5 h-5 rounded-full object-cover object-top ring-1 ring-amber-400/80"
              />
            ) : (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            )}
            <span className="text-[11px] font-bold text-stone-200">
              {character.name} <span className="text-stone-400 font-normal">({playerName})</span>
            </span>
          </div>

          {/* Biscotti del Cringe Counter */}
          <div className="bg-amber-950/90 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/50 flex items-center gap-1.5 shadow-md">
            <Cookie className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-xs font-black text-amber-200">{myCookies}</span>
            <span className="text-[10px] uppercase font-bold text-amber-400/90 tracking-wide">
              Biscotti
            </span>
          </div>
        </div>

        {/* Bottom of Stage: Scene Title (Zero Muri di Testo) */}
        <div className="absolute bottom-2 left-3 right-3 z-20 text-center">
          <div className="inline-block bg-stone-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-600/50 shadow-xl max-w-full">
            <span className="text-[10px] uppercase tracking-widest text-amber-400/90 font-bold block">
              {state.currentSceneId === "98"
                ? "Scena Jolly"
                : state.currentSceneId === "99"
                ? "Scena Master"
                : `Scena ${state.currentSceneId}`}
            </span>
            <h2 className="text-sm sm:text-base font-black text-white truncate">
              {currentScene.title}
            </h2>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. SCHEDA & SELETTORE TIRO (Middle 44-46%)                     */}
      {/* ------------------------------------------------------------- */}
      <section className="flex-1 flex flex-col justify-between px-3 py-2 bg-stone-950/95 overflow-y-auto">
        {/* 4 Stat Buttons */}
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block mb-1">
            Scegli Statistica per il Tiro:
          </span>
          <div className="grid grid-cols-4 gap-1.5">
            {(["muscoli", "cervello", "facciaTosta", "prontezza"] as StatKey[]).map((statKey) => {
              const val = character.stats[statKey];
              const isSelected = selectedStat === statKey;
              const meta = STAT_LABELS[statKey];

              return (
                <button
                  key={statKey}
                  type="button"
                  onClick={() => setSelectedStat(statKey)}
                  className={`p-2 rounded-2xl border flex flex-col items-center justify-center transition-all ${
                    isSelected
                      ? "bg-amber-600 text-stone-950 border-amber-400 shadow-md ring-2 ring-amber-400/50 scale-[1.02]"
                      : "bg-stone-900/80 hover:bg-stone-850 text-stone-300 border-stone-800"
                  }`}
                >
                  <span className="text-base leading-none mb-0.5">{meta.icon}</span>
                  <span className="text-[10px] font-bold truncate max-w-full leading-tight">
                    {meta.label}
                  </span>
                  <span
                    className={`text-xs font-black mt-0.5 ${
                      isSelected ? "text-stone-950" : "text-amber-400"
                    }`}
                  >
                    {val} d6
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Specialità Tag (+1d6) */}
        <div className="mt-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Specialità (+1d6):
            </span>
            {selectedSpecialty && (
              <span className="text-[10px] font-bold text-emerald-300">+1d6 applicato</span>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {character.specialties.map((spec) => {
              const isSelected = selectedSpecialty === spec;
              return (
                <button
                  key={spec}
                  type="button"
                  onClick={() => setSelectedSpecialty(isSelected ? null : spec)}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-all ${
                    isSelected
                      ? "bg-emerald-600 text-white border-emerald-300 shadow ring-1 ring-emerald-400 scale-[1.02]"
                      : "bg-stone-900 text-stone-300 border-stone-700/60 hover:border-emerald-500/50"
                  }`}
                >
                  {spec} {isSelected ? "✓" : "+1d6"}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tratti Negativi Tag (-1d6, Guadagna 1 Biscotto) */}
        <div className="mt-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-rose-400 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> Tratti Negativi (-1d6):
            </span>
            {selectedNegativeTrait && (
              <span className="text-[10px] font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-600/50 animate-pulse flex items-center gap-1">
                🍪 Guadagni 1 Biscotto!
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {character.negativeTraits.map((neg) => {
              const isSelected = selectedNegativeTrait === neg;
              return (
                <button
                  key={neg}
                  type="button"
                  onClick={() => setSelectedNegativeTrait(isSelected ? null : neg)}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-all ${
                    isSelected
                      ? "bg-rose-700 text-white border-rose-300 shadow ring-1 ring-rose-400 scale-[1.02]"
                      : "bg-stone-900 text-stone-300 border-stone-700/60 hover:border-rose-500/50"
                  }`}
                >
                  {neg} {isSelected ? "⚠️" : "-1d6"}
                </button>
              );
            })}
          </div>
        </div>

        {/* Oggetto Iconico (Promemoria narrativo) */}
        <div className="mt-2 p-2 rounded-xl bg-stone-900/60 border border-stone-800 text-[11px] text-stone-300 flex items-start gap-2">
          <span className="font-bold text-amber-400 shrink-0">🎒 Oggetto:</span>
          <span className="truncate">{character.iconicItem}</span>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. BARRA AZIONE & FEED DADI (Bottom 16-18%)                    */}
      {/* ------------------------------------------------------------- */}
      <section className="flex-shrink-0 bg-stone-900/90 border-t border-stone-800 p-3 flex flex-col gap-2">
        {/* Biscotto Toggle button */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            disabled={myCookies <= 0}
            onClick={() => setSpendCookie(!spendCookie)}
            className={`w-full py-1.5 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-2 transition ${
              spendCookie
                ? "bg-amber-600 text-stone-950 border-amber-400 shadow ring-1 ring-amber-400"
                : myCookies > 0
                ? "bg-stone-800 text-amber-300 border-amber-500/40 hover:bg-stone-750"
                : "bg-stone-850 text-stone-500 border-stone-800 opacity-60 cursor-not-allowed"
            }`}
          >
            <Cookie className="w-3.5 h-3.5 fill-current" />
            <span>
              {spendCookie
                ? "Biscotto Attivato! (+1d6 speso)"
                : myCookies > 0
                ? `Brucia 1 Biscotto (+1d6) • Ne hai ${myCookies}`
                : "Nessun Biscotto disponibile"}
            </span>
          </button>
        </div>

        {/* Big Action Button "TIRA X d6" */}
        <button
          type="button"
          onClick={handleRoll}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black text-base uppercase tracking-wider shadow-xl shadow-amber-950/50 flex items-center justify-center gap-3 active:scale-95 transition"
        >
          <span className="text-xl">🎲</span>
          <span>TIRA {finalDiceCount} d6</span>
          <span className="text-xs bg-stone-950/20 px-2 py-0.5 rounded-full font-bold">
            {STAT_LABELS[selectedStat]?.label}
          </span>
        </button>

        {/* Santa Belt Trigger Button */}
        <button
          type="button"
          onClick={() => setIsBeltModalOpen(true)}
          className="w-full py-2 rounded-xl bg-gradient-to-r from-red-950/90 via-amber-950/70 to-red-950/90 hover:from-red-900 hover:to-red-900 text-amber-200 border border-amber-500/40 text-xs font-bold shadow flex items-center justify-center gap-2 active:scale-95 transition"
        >
          <Gift className="w-4 h-4 text-amber-400" />
          <span>Cintura di Babbo Natale (Estrai Oggetto & Penitenza)</span>
        </button>
      </section>

      {/* Cintura di Babbo Natale Modal */}
      {isBeltModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-sm bg-gradient-to-b from-stone-900 via-stone-900 to-amber-950 border-2 border-amber-500 rounded-3xl p-5 shadow-2xl text-stone-100">
            <button
              onClick={() => setIsBeltModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-stone-800 text-stone-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center mb-3">
              <div className="inline-flex p-2.5 rounded-xl bg-amber-500/20 text-amber-400 mb-1">
                <Gift className="w-6 h-6 animate-bounce" />
              </div>
              <h3 className="text-lg font-black text-amber-200">
                Cintura di Babbo Natale
              </h3>
              <p className="text-[11px] text-stone-400 mt-0.5">
                Scegli che oggetto magico/assurdo estrarre. La penitenza cringe festiva sarà estratta a sorte!
              </p>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {[
                "🍬 Mentina distruttiva",
                "❄️ Spray scongelante al ribes",
                "🪝 Rampino di zucchero filato",
                "🔦 Torcia stroboscopica",
              ].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setCustomBeltItem(preset.replace(/^[^\s]+\s/, ""))}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-stone-800/80 hover:bg-amber-950/60 border border-stone-700/60 hover:border-amber-500/50 text-stone-200 transition"
                >
                  {preset}
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <div className="mb-4">
              <label className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                Oggetto desiderato:
              </label>
              <input
                type="text"
                value={customBeltItem}
                onChange={(e) => setCustomBeltItem(e.target.value)}
                placeholder="Es. Una mentina distruttiva, dinamite di marzapane..."
                className="w-full bg-stone-950/90 border border-amber-500/40 rounded-xl px-3 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-400"
                maxLength={60}
              />
            </div>

            <button
              type="button"
              onClick={() => {
                drawBelt(customBeltItem);
                setIsBeltModalOpen(false);
                setCustomBeltItem("");
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black text-xs uppercase tracking-wider shadow-lg active:scale-95 transition flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Estrai Oggetto & Penitenza! 🎁</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
