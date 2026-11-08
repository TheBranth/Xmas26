"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DiceRollResult } from "@/types/game";
import { Sparkles, AlertOctagon, CheckCircle2, X } from "lucide-react";

interface Props {
  roll: DiceRollResult | null;
  onClose: () => void;
}

export function DiceRollOverlay({ roll, onClose }: Props) {
  if (!roll) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          className="relative w-full max-w-md bg-stone-900 border-2 border-amber-600/60 rounded-3xl p-6 shadow-2xl text-stone-100 overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700 transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-4">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
              🎲 Tiro di Dadi Ufficiale
            </span>
            <h2 className="text-xl font-bold mt-1 text-white">
              {roll.playerName} <span className="text-stone-400 font-normal">({roll.characterName})</span>
            </h2>
            <div className="inline-block mt-1 px-3 py-1 rounded-full bg-stone-800 border border-stone-700 text-xs font-semibold text-amber-200">
              {roll.statName} ({roll.statValue})
            </div>
          </div>

          {/* Modifiers Used */}
          <div className="flex flex-wrap gap-1.5 justify-center mb-5">
            {roll.specialtyUsed && (
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700/50">
                ✨ Specialità: {roll.specialtyUsed} (+1d6)
              </span>
            )}
            {roll.negativeTraitUsed && (
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-700/50">
                ⚠️ Malus: {roll.negativeTraitUsed} (-1d6, +1 Biscotto!)
              </span>
            )}
            {roll.spentCookie && (
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-700/50">
                🍪 Biscotto del Cringe (+1d6)
              </span>
            )}
          </div>

          {/* Dice Results */}
          <div className="flex flex-wrap items-center justify-center gap-3 my-6">
            {roll.rolls.map((dieVal, idx) => {
              const isCrit = dieVal === 6;
              const isSuccess = dieVal >= 4 && dieVal < 6;
              const isComplication = dieVal === 1 && roll.negativeTraitUsed;

              return (
                <motion.div
                  key={idx}
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: idx * 0.08, type: "spring", stiffness: 300, damping: 20 }}
                  className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-extrabold text-2xl shadow-lg border-2 relative transition-all ${
                    isCrit
                      ? "bg-gradient-to-br from-amber-300 via-amber-400 to-yellow-500 text-stone-950 border-amber-200 shadow-amber-500/50 ring-4 ring-amber-400/30 animate-pulse"
                      : isSuccess
                      ? "bg-gradient-to-br from-emerald-500 to-green-700 text-white border-emerald-300 shadow-emerald-500/30"
                      : isComplication
                      ? "bg-gradient-to-br from-rose-600 to-red-800 text-white border-red-300 shadow-red-500/50 ring-4 ring-rose-500/40"
                      : "bg-stone-800 text-stone-300 border-stone-700"
                  }`}
                >
                  {dieVal}
                  {isCrit && (
                    <Sparkles className="w-3.5 h-3.5 absolute -top-1.5 -right-1.5 text-yellow-200 fill-yellow-200" />
                  )}
                  {isComplication && (
                    <AlertOctagon className="w-3.5 h-3.5 absolute -top-1.5 -right-1.5 text-rose-300 fill-rose-300" />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Outcome Banner */}
          <div className="mt-4 pt-4 border-t border-stone-800 text-center">
            <div className="flex items-center justify-center gap-2">
              {roll.successCount > 0 ? (
                <>
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  <span className="text-xl font-black text-emerald-400">
                    {roll.successCount} {roll.successCount === 1 ? "SUCCESSO" : "SUCCESSI"}!
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold text-rose-400">
                  FALLIMENTO (0 Successi)
                </span>
              )}
            </div>

            {/* Special highlights */}
            {roll.criticalCount > 0 && (
              <p className="text-xs text-amber-300 font-bold mt-1">
                🌟 SUCCESSO CRITICO CON STILE ({roll.criticalCount} sei!)
              </p>
            )}
            {roll.complicationCount > 0 && (
              <p className="text-xs text-rose-400 font-bold mt-1 animate-bounce">
                🚨 DISASTRO COMICO / COMPLICAZIONE IMBARAZZANTE!
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-full mt-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 font-bold text-stone-950 text-sm shadow-md active:scale-95 transition"
          >
            Ricevuto!
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
