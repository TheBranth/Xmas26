"use client";

import React, { useState, useEffect } from "react";
import { useGame } from "@/context/GameContext";
import { CHARACTERS, STAT_LABELS } from "@/data/characters";
import { Character } from "@/types/game";
import { CharacterSilhouette } from "@/components/illustrations/CharacterSilhouette";
import { Lock, Check, User, Sparkles, AlertTriangle, ShieldCheck, Play, RotateCcw } from "lucide-react";

export function LobbyView() {
  const {
    state,
    playerId,
    playerName,
    setPlayerName,
    myCharacterId,
    lockCharacter,
    unlockCharacter,
    resetLocks,
    setStatus,
    isMaster,
    kickOutNotice,
    clearKickOutNotice,
  } = useGame();

  const [previewChar, setPreviewChar] = useState<Character | null>(null);

  // If currently inspecting a character and that character gets locked by someone else, kick out!
  useEffect(() => {
    if (previewChar) {
      const lock = state.characterLocks[previewChar.id];
      if (lock && lock.playerId !== playerId) {
        setPreviewChar(null);
      }
    }
  }, [state.characterLocks, previewChar, playerId]);

  // If kickout notice arrives, ensure preview is closed
  useEffect(() => {
    if (kickOutNotice) {
      setPreviewChar(null);
    }
  }, [kickOutNotice]);

  const myCharacter = CHARACTERS.find((c) => c.id === myCharacterId);

  return (
    <div className="relative min-h-screen bg-stone-950 text-stone-100 flex flex-col items-center p-4 max-w-4xl mx-auto">
      {/* Background festive nostalgic grain & tint */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/20 via-stone-950 to-stone-950 pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 w-full text-center mt-3 mb-6">
        <span className="text-[11px] font-bold tracking-widest uppercase text-amber-500/90 bg-amber-950/40 border border-amber-800/40 px-3 py-1 rounded-full">
          🎄 Companion One-Shot Natalizia 🎄
        </span>
        <h1 className="text-3xl sm:text-4xl font-black mt-2 tracking-tight text-amber-100">
          Operazione Notte Silenziosa
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 mt-1 max-w-md mx-auto">
          Lobby Pre-Partita • Reclama il tuo eroe prima che te lo soffi un compagno di merende.
        </p>

        {/* Player Name Input */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="flex items-center gap-2 bg-stone-900/90 border border-stone-700/80 rounded-xl px-3 py-1.5 shadow-sm max-w-xs">
            <User className="w-4 h-4 text-amber-400 shrink-0" />
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Il tuo nome / nickname"
              className="bg-transparent text-xs text-white focus:outline-none w-44"
              maxLength={20}
            />
          </div>
        </div>
      </header>

      {/* Waiting screen if player already claimed a character */}
      {myCharacter && (
        <div className="relative z-10 w-full max-w-md mb-6 animate-fadeIn">
          <div className="bg-gradient-to-r from-amber-900/40 via-amber-800/20 to-amber-900/40 border-2 border-amber-500/60 rounded-2xl p-4 text-center shadow-xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-amber-400" /> Scheda Bloccata con Successo
            </span>
            <p className="text-sm font-semibold text-stone-200">
              Hai selezionato <strong className="text-amber-400">{myCharacter.name}</strong>
            </p>
            <p className="text-xs text-stone-400 mt-1 italic">
              In attesa che il Master dia inizio al disastro...
            </p>
            <button
              onClick={() => unlockCharacter(myCharacter.id)}
              className="mt-3 text-xs px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-600 transition"
            >
              Cambia idea / Rilascia scheda
            </button>
          </div>
        </div>
      )}

      {/* Archetypes Grid */}
      <div className="relative z-10 w-full grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mb-8">
        {CHARACTERS.map((char) => {
          const lock = state.characterLocks[char.id];
          const isLockedByMe = lock?.playerId === playerId;
          const isLockedByOther = lock && !isLockedByMe;

          return (
            <div
              key={char.id}
              onClick={() => {
                clearKickOutNotice();
                setPreviewChar(char);
              }}
              className={`group relative overflow-hidden rounded-3xl border-2 transition-all cursor-pointer bg-stone-900/80 backdrop-blur-sm p-4 flex flex-col justify-between ${
                isLockedByMe
                  ? "border-amber-400 ring-2 ring-amber-400/40 shadow-xl shadow-amber-950/40"
                  : isLockedByOther
                  ? "border-stone-800 opacity-60 grayscale-[0.4]"
                  : "border-stone-700 hover:border-amber-500/70 hover:scale-[1.02] shadow-lg"
              }`}
            >
              {/* Silhouette Stage */}
              <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-stone-950/70 border border-stone-800/80 mb-3 flex items-center justify-center">
                <CharacterSilhouette characterId={char.id} className="w-full h-full p-2" />

                {/* Lock Status Badge */}
                {lock && (
                  <div
                    className={`absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 shadow ${
                      isLockedByMe
                        ? "bg-amber-500 text-stone-950 font-black"
                        : "bg-stone-800 text-stone-300 border border-stone-700"
                    }`}
                  >
                    <Lock className="w-3 h-3" />
                    <span>{isLockedByMe ? "Tua Scheda" : lock.playerName}</span>
                  </div>
                )}
              </div>

              {/* Character Details */}
              <div>
                <h3 className="text-lg font-bold text-stone-100 group-hover:text-amber-300 transition">
                  {char.name}
                </h3>
                <p className="text-xs text-stone-400 line-clamp-1">{char.subtitle}</p>

                {/* Quick Stats Pill */}
                <div className="grid grid-cols-4 gap-1 mt-3 pt-3 border-t border-stone-800/80 text-center">
                  {Object.entries(char.stats).map(([key, val]) => (
                    <div key={key} className="bg-stone-950/50 rounded-lg p-1 border border-stone-800/40">
                      <div className="text-[10px] text-stone-400 capitalize">
                        {STAT_LABELS[key]?.label.split(" ")[0]}
                      </div>
                      <div className="text-xs font-bold text-amber-200">{val}d6</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Prompt */}
              <div className="mt-3 text-center">
                <span className="text-[11px] font-semibold text-amber-400/90 group-hover:underline">
                  {isLockedByMe
                    ? "✓ Scheda attiva (Tocca per ispezionare)"
                    : isLockedByOther
                    ? "🔒 Occupata da " + lock.playerName
                    : "Tocca per ispezionare & reclamare →"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Master Controls Section in Lobby */}
      {isMaster && (
        <div className="relative z-10 w-full max-w-2xl bg-stone-900/90 border-2 border-amber-600/50 rounded-3xl p-5 mb-8 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-3 border-b border-stone-800 pb-2">
            <span className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Pannello Master • Gestione Lobby
            </span>
            <span className="text-xs text-stone-400">
              {Object.keys(state.characterLocks).length} / 4 Schede Reclamate
            </span>
          </div>

          {/* Locked Players Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 text-xs">
            {CHARACTERS.map((c) => {
              const lock = state.characterLocks[c.id];
              return (
                <div
                  key={c.id}
                  className={`p-2 rounded-xl border ${
                    lock
                      ? "bg-amber-950/30 border-amber-500/40 text-amber-200"
                      : "bg-stone-950/40 border-stone-800 text-stone-500"
                  }`}
                >
                  <div className="font-bold truncate">{c.name}</div>
                  <div className="text-[10px] truncate text-stone-400">
                    {lock ? `👤 ${lock.playerName}` : "— Libera —"}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2">
            <button
              onClick={resetLocks}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold border border-stone-700 flex items-center justify-center gap-2 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Selezioni
            </button>
            <button
              onClick={() => setStatus("ACTIVE")}
              className="w-full sm:flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-500 hover:to-green-600 text-white text-xs font-black uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition active:scale-95"
            >
              <Play className="w-4 h-4 fill-white" /> Avvia Avventura (Proietta Scena 1)
            </button>
          </div>
        </div>
      )}

      {/* Character Inspection & Claim Modal */}
      {previewChar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-stone-900 border-2 border-stone-700 rounded-3xl p-5 shadow-2xl text-stone-100 max-h-[90vh] overflow-y-auto">
            {/* Silhouette stage in modal */}
            <div className="relative w-full h-48 rounded-2xl bg-stone-950 border border-stone-800 mb-4 flex items-center justify-center overflow-hidden">
              <CharacterSilhouette characterId={previewChar.id} className="w-full h-full p-2" />
            </div>

            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-black text-amber-100">{previewChar.name}</h2>
                <p className="text-xs text-stone-400 mt-0.5">{previewChar.subtitle}</p>
              </div>
              <button
                onClick={() => setPreviewChar(null)}
                className="text-stone-400 hover:text-white p-1 rounded-lg text-sm"
              >
                Chiudi ✕
              </button>
            </div>

            {/* Silhouette description note */}
            <p className="text-xs text-stone-300 italic mt-2 bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80">
              &ldquo;{previewChar.silhouetteDesc}&rdquo;
            </p>

            {/* Stats */}
            <div className="mt-4">
              <h4 className="text-xs uppercase font-bold text-amber-400 mb-2">Statistiche</h4>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(previewChar.stats).map(([k, val]) => (
                  <div
                    key={k}
                    className="p-2.5 rounded-xl bg-stone-950/60 border border-stone-800 flex items-center justify-between"
                  >
                    <div>
                      <span className="text-xs font-bold text-stone-200">
                        {STAT_LABELS[k]?.icon} {STAT_LABELS[k]?.label}
                      </span>
                    </div>
                    <span className="text-sm font-black text-amber-300">{val} d6</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specialties (solo nome, zero muri di testo) */}
            <div className="mt-4">
              <h4 className="text-xs uppercase font-bold text-emerald-400 mb-2">
                Specialità (+1d6 se coerente con l&apos;azione)
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {previewChar.specialties.map((spec) => (
                  <span
                    key={spec}
                    className="text-xs px-3 py-1 rounded-full bg-emerald-950/70 text-emerald-200 border border-emerald-700/50 font-medium"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Negative traits */}
            <div className="mt-4">
              <h4 className="text-xs uppercase font-bold text-rose-400 mb-2">
                Tratti Negativi (-1d6, ma guadagni 1 Biscotto del Cringe!)
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {previewChar.negativeTraits.map((neg) => (
                  <span
                    key={neg}
                    className="text-xs px-3 py-1 rounded-full bg-rose-950/70 text-rose-200 border border-rose-700/50 font-medium"
                  >
                    {neg}
                  </span>
                ))}
              </div>
            </div>

            {/* Iconic Item */}
            <div className="mt-4 p-3 rounded-xl bg-stone-950/60 border border-stone-800">
              <h4 className="text-xs uppercase font-bold text-amber-400 mb-1">Oggetto Iconico</h4>
              <p className="text-xs text-stone-300 font-medium">{previewChar.iconicItem}</p>
            </div>

            {/* Claim / Release Action */}
            <div className="mt-6 pt-4 border-t border-stone-800 flex items-center gap-2">
              {state.characterLocks[previewChar.id]?.playerId === playerId ? (
                <button
                  onClick={() => {
                    unlockCharacter(previewChar.id);
                    setPreviewChar(null);
                  }}
                  className="w-full py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs border border-stone-600 transition"
                >
                  Rilascia questa scheda
                </button>
              ) : state.characterLocks[previewChar.id] ? (
                <div className="w-full py-3 rounded-xl bg-stone-800/80 text-stone-400 font-bold text-xs text-center border border-stone-700 flex items-center justify-center gap-2">
                  <Lock className="w-3.5 h-3.5" /> Reclamato da {state.characterLocks[previewChar.id].playerName}
                </div>
              ) : (
                <button
                  onClick={() => {
                    lockCharacter(previewChar.id);
                    setPreviewChar(null);
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 font-black text-stone-950 text-xs uppercase tracking-wider shadow-lg transition active:scale-95"
                >
                  Prendi questo Personaggio
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
