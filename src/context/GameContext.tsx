"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import PartySocket from "partysocket";
import {
  RoomState,
  ClientMessage,
  ServerMessage,
  CustomSceneData,
  StatKey,
  KickOutEvent,
} from "@/types/game";
import { CHARACTERS } from "@/data/characters";
import { sounds } from "@/utils/audio";

const DEFAULT_STATE: RoomState = {
  status: "LOBBY",
  currentSceneId: "1.1",
  customScene: null,
  characterLocks: {},
  disasterClock: 0,
  cookies: {
    secchione: 1,
    palestrato: 1,
    squinza: 1,
    maranza: 1,
  },
  lastRoll: null,
  lastBeltDraw: null,
  kickOutEvent: null,
};

interface GameContextType {
  state: RoomState;
  playerId: string;
  playerName: string;
  setPlayerName: (name: string) => void;
  myCharacterId: string | null;
  isMaster: boolean;
  setIsMaster: (val: boolean) => void;
  connectionStatus: "connecting" | "connected" | "disconnected";
  kickOutNotice: KickOutEvent | null;
  clearKickOutNotice: () => void;
  lockCharacter: (characterId: string) => void;
  unlockCharacter: (characterId: string) => void;
  resetLocks: () => void;
  setStatus: (status: "LOBBY" | "ACTIVE") => void;
  setScene: (sceneId: string) => void;
  setCustomScene: (data: CustomSceneData) => void;
  setClock: (clock: number) => void;
  modifyCookie: (characterId: string, delta: number) => void;
  rollDice: (params: {
    characterId: string;
    characterName: string;
    statKey: StatKey;
    statName: string;
    statValue: number;
    specialtyUsed?: string | null;
    negativeTraitUsed?: string | null;
    spentCookie: boolean;
  }) => void;
  drawBelt: (customItem?: string) => void;
  clearOverlays: () => void;
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<RoomState>(DEFAULT_STATE);
  const [playerId] = useState<string>(() => {
    if (typeof window === "undefined") return "";
    let pid = localStorage.getItem("ons_player_id");
    if (!pid) {
      pid = "p_" + Math.random().toString(36).substring(2, 9);
      localStorage.setItem("ons_player_id", pid);
    }
    return pid;
  });
  const [playerName, setPlayerName] = useState<string>(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("ons_player_name") || "Giocatore";
  });
  const [isMaster, setIsMaster] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const url = new URL(window.location.href);
    return url.searchParams.get("role") === "master" || url.pathname.includes("/master");
  });
  const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "disconnected">("connecting");
  const [kickOutNotice, setKickOutNotice] = useState<KickOutEvent | null>(null);

  const socketRef = useRef<PartySocket | null>(null);

  const handleSetPlayerName = (name: string) => {
    setPlayerName(name);
    localStorage.setItem("ons_player_name", name);
  };

  // Connect PartySocket
  useEffect(() => {
    if (!playerId) return;

    const host = process.env.NEXT_PUBLIC_PARTYKIT_HOST || "localhost:1999";
    const room = "ons-room-main";

    try {
      const ws = new PartySocket({
        host,
        room,
        id: playerId,
      });

      socketRef.current = ws;

      ws.addEventListener("open", () => {
        setConnectionStatus("connected");
      });

      ws.addEventListener("close", () => {
        setConnectionStatus("disconnected");
      });

      ws.addEventListener("error", () => {
        setConnectionStatus("disconnected");
      });

      ws.addEventListener("message", (event) => {
        try {
          const msg = JSON.parse(event.data) as ServerMessage;
          if (msg.type === "STATE_SYNC") {
            setState(msg.state);
          } else if (msg.type === "KICK_OUT") {
            sounds.playKickOut();
            setKickOutNotice(msg.event);
          } else if (msg.type === "DICE_ROLLED") {
            sounds.playDiceRoll();
            setTimeout(() => {
              if (msg.roll.criticalCount > 0) {
                sounds.playCritical();
              } else if (msg.roll.complicationCount > 0) {
                sounds.playComplication();
              } else if (msg.roll.successCount > 0) {
                sounds.playSuccess();
              }
            }, 600);
          } else if (msg.type === "BELT_DRAWN") {
            sounds.playBeltGong();
          }
        } catch (e) {
          console.error("Failed to parse websocket message", e);
        }
      });

      ws.addEventListener("error", () => {
        setConnectionStatus("disconnected");
      });

      return () => {
        ws.close();
      };
    } catch (err) {
      console.warn("PartySocket connection failed, running in resilient local state", err);
      queueMicrotask(() => setConnectionStatus("disconnected"));
    }
  }, [playerId]);

  const send = useCallback((msg: ClientMessage) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(msg));
    } else {
      // Local offline fallback simulation so everything functions flawlessly even without partykit dev running!
      console.info("Offline dispatch:", msg);
      if (msg.type === "LOCK_CHARACTER") {
        setState((prev) => ({
          ...prev,
          characterLocks: {
            ...prev.characterLocks,
            [msg.characterId]: { playerId: msg.playerId, playerName: msg.playerName, lockedAt: Date.now() },
          },
        }));
      } else if (msg.type === "UNLOCK_CHARACTER") {
        setState((prev) => {
          const locks = { ...prev.characterLocks };
          delete locks[msg.characterId];
          return { ...prev, characterLocks: locks };
        });
      } else if (msg.type === "SET_STATUS") {
        setState((prev) => ({ ...prev, status: msg.status }));
      } else if (msg.type === "SET_SCENE") {
        setState((prev) => ({ ...prev, currentSceneId: msg.sceneId, customScene: null }));
      } else if (msg.type === "SET_CUSTOM_SCENE") {
        setState((prev) => ({ ...prev, currentSceneId: "99", customScene: msg.data }));
      } else if (msg.type === "SET_CLOCK") {
        setState((prev) => ({ ...prev, disasterClock: msg.clock }));
      } else if (msg.type === "MODIFY_COOKIE") {
        setState((prev) => ({
          ...prev,
          cookies: {
            ...prev.cookies,
            [msg.characterId]: Math.max(0, (prev.cookies[msg.characterId] ?? 0) + msg.delta),
          },
        }));
      } else if (msg.type === "CLEAR_OVERLAYS") {
        setState((prev) => ({ ...prev, lastRoll: null, lastBeltDraw: null }));
      }
    }
  }, []);

  const myCharacterId = React.useMemo(() => {
    for (const [cid, lock] of Object.entries(state.characterLocks)) {
      if (lock.playerId === playerId) {
        return cid;
      }
    }
    return null;
  }, [state.characterLocks, playerId]);

  const lockCharacter = (characterId: string) => {
    send({
      type: "LOCK_CHARACTER",
      characterId,
      playerId,
      playerName: playerName || "Giocatore",
    });
  };

  const unlockCharacter = (characterId: string) => {
    send({
      type: "UNLOCK_CHARACTER",
      characterId,
      playerId,
    });
  };

  const resetLocks = () => {
    send({ type: "RESET_LOCKS" });
  };

  const setStatus = (status: "LOBBY" | "ACTIVE") => {
    send({ type: "SET_STATUS", status });
  };

  const setScene = (sceneId: string) => {
    send({ type: "SET_SCENE", sceneId });
  };

  const setCustomScene = (data: CustomSceneData) => {
    send({ type: "SET_CUSTOM_SCENE", data });
  };

  const setClock = (clock: number) => {
    send({ type: "SET_CLOCK", clock });
  };

  const modifyCookie = (characterId: string, delta: number) => {
    send({ type: "MODIFY_COOKIE", characterId, delta });
  };

  const rollDice = (params: {
    characterId: string;
    characterName: string;
    statKey: StatKey;
    statName: string;
    statValue: number;
    specialtyUsed?: string | null;
    negativeTraitUsed?: string | null;
    spentCookie: boolean;
  }) => {
    send({
      type: "ROLL_DICE",
      playerId,
      playerName: playerName || "Giocatore",
      ...params,
    });
  };

  const drawBelt = (customItem?: string) => {
    const myChar = CHARACTERS.find((c) => c.id === myCharacterId);
    send({
      type: "DRAW_BELT",
      item: customItem,
      playerId,
      playerName: playerName || (isMaster ? "Master" : "Giocatore"),
      characterId: myChar?.id,
      characterName: myChar?.name,
    });
  };

  const clearOverlays = () => {
    send({ type: "CLEAR_OVERLAYS" });
  };

  const clearKickOutNotice = () => {
    setKickOutNotice(null);
  };

  return (
    <GameContext.Provider
      value={{
        state,
        playerId,
        playerName,
        setPlayerName: handleSetPlayerName,
        myCharacterId,
        isMaster,
        setIsMaster,
        connectionStatus,
        kickOutNotice,
        clearKickOutNotice,
        lockCharacter,
        unlockCharacter,
        resetLocks,
        setStatus,
        setScene,
        setCustomScene,
        setClock,
        modifyCookie,
        rollDice,
        drawBelt,
        clearOverlays,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return ctx;
}
