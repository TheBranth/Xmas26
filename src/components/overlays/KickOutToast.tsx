"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { KickOutEvent } from "@/types/game";
import { AlertCircle, X } from "lucide-react";

interface Props {
  notice: KickOutEvent | null;
  onDismiss: () => void;
}

export function KickOutToast({ notice, onDismiss }: Props) {
  if (!notice) return null;

  const getFunnyMessage = (characterId: string, lockedBy: string) => {
    switch (characterId) {
      case "palestrato":
        return `Troppo tardi! ${lockedBy} si è appena pompato i bicipiti al posto tuo!`;
      case "secchione":
        return `Troppo tardi! ${lockedBy} ha già calcolato la traiettoria balistica e ha preso il Secchione!`;
      case "squinza":
        return `Troppo tardi! ${lockedBy} ha sfoderato la lacca per capelli e ti ha soffiato la Squinza!`;
      case "maranza":
        return `Troppo tardi! ${lockedBy} ha fatto parkour da condominio e si è preso il Maranza!`;
      default:
        return `Troppo tardi! ${lockedBy} ha bloccato questa scheda prima di te!`;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-sm px-4">
        <motion.div
          initial={{ y: -40, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -40, opacity: 0, scale: 0.9 }}
          className="bg-rose-950 border-2 border-rose-500 rounded-2xl p-4 shadow-2xl flex items-start gap-3 text-rose-100"
        >
          <AlertCircle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5 animate-pulse" />
          <div className="flex-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-300">
              Personaggio Reclamato!
            </h4>
            <p className="text-xs mt-1 text-rose-100 leading-relaxed">
              {getFunnyMessage(notice.characterId, notice.lockedByPlayerName)}
            </p>
          </div>
          <button
            onClick={onDismiss}
            className="p-1 rounded-lg text-rose-400 hover:text-white hover:bg-rose-900 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
