"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BeltDrawResult } from "@/types/game";
import { Sparkles, Gift, Flame, X } from "lucide-react";

interface Props {
  draw: BeltDrawResult | null;
  onClose: () => void;
}

export function SantaBeltOverlay({ draw, onClose }: Props) {
  if (!draw) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotate: -2 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="relative w-full max-w-md bg-gradient-to-b from-stone-900 via-stone-900 to-amber-950 border-4 border-amber-500 rounded-3xl p-6 shadow-2xl text-stone-100 overflow-hidden"
        >
          {/* Top golden ribbon decoration */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-yellow-500 via-amber-300 to-yellow-500 shadow-md" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700 transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center mt-2 mb-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-300 mb-2">
              <Gift className="w-6 h-6 animate-bounce" />
            </div>
            <h2 className="text-xl font-black uppercase tracking-wider text-amber-300 flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" /> Cintura di Babbo Natale <Sparkles className="w-5 h-5" />
            </h2>
            <p className="text-xs text-stone-400">
              Il Master ha pescato dai meandri della fibbia d&apos;oro!
            </p>
          </div>

          {/* Drawn Item Card */}
          <div className="p-4 rounded-2xl bg-stone-800/90 border border-amber-500/40 shadow-inner mb-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 flex items-center gap-1 mb-1">
              <Gift className="w-3.5 h-3.5" /> Oggetto Estratto:
            </span>
            <p className="text-base font-extrabold text-amber-100 leading-snug">
              {draw.item}
            </p>
          </div>

          {/* Festive Cringe Dare */}
          <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-500/50 shadow-inner mb-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-rose-300 flex items-center gap-1 mb-1">
              <Flame className="w-3.5 h-3.5 text-rose-400 animate-pulse" /> Penitenza Cringe Festiva (Dal Vivo!):
            </span>
            <p className="text-sm font-semibold text-rose-100 italic leading-relaxed">
              &ldquo;{draw.dare}&rdquo;
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 font-extrabold text-stone-950 text-sm shadow-lg active:scale-95 transition"
          >
            Affronto la Penitenza!
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
