import type * as Party from "partykit/server";
import {
  RoomState,
  ClientMessage,
  ServerMessage,
  DiceRollResult,
  BeltDrawResult,
  KickOutEvent,
} from "../src/types/game";
import { BELT_ITEMS } from "../src/data/belt";

export default class GameRoom implements Party.Server {
  room: Party.Room;
  state: RoomState;

  constructor(room: Party.Room) {
    this.room = room;
    this.state = {
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
  }

  async onStart() {
    const saved = await this.room.storage.get<RoomState>("gameState");
    if (saved) {
      this.state = saved;
    }
  }

  async saveState() {
    await this.room.storage.put("gameState", this.state);
  }

  onRequest(req: Party.Request) {
    return new Response(JSON.stringify({ ok: true, status: this.state.status }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  onConnect(conn: Party.Connection) {
    const msg: ServerMessage = {
      type: "STATE_SYNC",
      state: this.state,
    };
    conn.send(JSON.stringify(msg));
  }

  broadcastState() {
    const msg: ServerMessage = {
      type: "STATE_SYNC",
      state: this.state,
    };
    this.room.broadcast(JSON.stringify(msg));
    this.saveState();
  }

  async onMessage(message: string, sender: Party.Connection) {
    try {
      const data = JSON.parse(message) as ClientMessage;

      switch (data.type) {
        case "LOCK_CHARACTER": {
          const { characterId, playerId, playerName } = data;
          const currentLock = this.state.characterLocks[characterId];

          if (currentLock && currentLock.playerId !== playerId) {
            // Already locked by someone else! Send kickout specifically to this sender
            const kickEvent: KickOutEvent = {
              characterId,
              characterName: characterId,
              kickedPlayerId: playerId,
              lockedByPlayerName: currentLock.playerName,
              timestamp: Date.now(),
            };
            const kickMsg: ServerMessage = {
              type: "KICK_OUT",
              event: kickEvent,
            };
            sender.send(JSON.stringify(kickMsg));
            return;
          }

          // Lock acquired
          // Also release any previous lock owned by this playerId
          for (const [cid, lock] of Object.entries(this.state.characterLocks)) {
            if (lock.playerId === playerId && cid !== characterId) {
              delete this.state.characterLocks[cid];
            }
          }

          this.state.characterLocks[characterId] = {
            playerId,
            playerName: playerName || "Giocatore",
            lockedAt: Date.now(),
          };

          // Broadcast to everyone
          this.broadcastState();
          break;
        }

        case "UNLOCK_CHARACTER": {
          const { characterId, playerId } = data;
          const currentLock = this.state.characterLocks[characterId];
          if (currentLock && currentLock.playerId === playerId) {
            delete this.state.characterLocks[characterId];
            this.broadcastState();
          }
          break;
        }

        case "RESET_LOCKS": {
          this.state.characterLocks = {};
          this.broadcastState();
          break;
        }

        case "SET_STATUS": {
          this.state.status = data.status;
          this.broadcastState();
          break;
        }

        case "SET_SCENE": {
          this.state.currentSceneId = data.sceneId;
          this.state.customScene = null;
          this.broadcastState();
          break;
        }

        case "SET_CUSTOM_SCENE": {
          this.state.currentSceneId = "99";
          this.state.customScene = data.data;
          this.broadcastState();
          break;
        }

        case "SET_CLOCK": {
          this.state.disasterClock = Math.max(0, Math.min(6, data.clock));
          this.broadcastState();
          break;
        }

        case "MODIFY_COOKIE": {
          const current = this.state.cookies[data.characterId] ?? 0;
          this.state.cookies[data.characterId] = Math.max(0, current + data.delta);
          this.broadcastState();
          break;
        }

        case "ROLL_DICE": {
          // Calculate dice count:
          // Formula: Stat + 1 (specialty) - 1 (negativeTrait) + 1 (cookie), min 1d6
          let count = data.statValue;
          if (data.specialtyUsed) count += 1;
          if (data.negativeTraitUsed) count -= 1;
          if (data.spentCookie) count += 1;
          count = Math.max(1, count);

          // If cookie spent, deduct it
          if (data.spentCookie && this.state.cookies[data.characterId] > 0) {
            this.state.cookies[data.characterId] -= 1;
          }

          // If negative trait used, award +1 cookie!
          if (data.negativeTraitUsed) {
            this.state.cookies[data.characterId] = (this.state.cookies[data.characterId] || 0) + 1;
          }

          // Roll d6 dice
          const rolls: number[] = [];
          let successCount = 0;
          let criticalCount = 0;
          let complicationCount = 0;

          for (let i = 0; i < count; i++) {
            const val = Math.floor(Math.random() * 6) + 1;
            rolls.push(val);
            if (val >= 4) {
              successCount++;
            }
            if (val === 6) {
              criticalCount++;
            }
            if (val === 1 && data.negativeTraitUsed) {
              complicationCount++;
            }
          }

          const rollResult: DiceRollResult = {
            id: `roll_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
            playerId: data.playerId,
            playerName: data.playerName,
            characterId: data.characterId,
            characterName: data.characterName,
            statKey: data.statKey,
            statName: data.statName,
            statValue: data.statValue,
            specialtyUsed: data.specialtyUsed,
            negativeTraitUsed: data.negativeTraitUsed,
            spentCookie: data.spentCookie,
            diceCount: count,
            rolls,
            successCount,
            criticalCount,
            complicationCount,
            timestamp: Date.now(),
          };

          this.state.lastRoll = rollResult;

          // Broadcast dice roll event and state
          const rollMsg: ServerMessage = {
            type: "DICE_ROLLED",
            roll: rollResult,
          };
          this.room.broadcast(JSON.stringify(rollMsg));
          this.broadcastState();
          break;
        }

        case "DRAW_BELT": {
          const randomIndex = Math.floor(Math.random() * BELT_ITEMS.length);
          const randomBeltItem = BELT_ITEMS[randomIndex];
          const dare = randomBeltItem.dare;
          const chosenItem =
            data.item && data.item.trim().length > 0
              ? data.item.trim()
              : randomBeltItem.item;

          const drawResult: BeltDrawResult = {
            id: `belt_${Date.now()}`,
            item: chosenItem,
            dare: dare,
            playerId: data.playerId,
            playerName: data.playerName,
            characterId: data.characterId,
            characterName: data.characterName,
            timestamp: Date.now(),
          };

          this.state.lastBeltDraw = drawResult;

          const beltMsg: ServerMessage = {
            type: "BELT_DRAWN",
            draw: drawResult,
          };
          this.room.broadcast(JSON.stringify(beltMsg));
          this.broadcastState();
          break;
        }

        case "CLEAR_OVERLAYS": {
          this.state.lastRoll = null;
          this.state.lastBeltDraw = null;
          this.broadcastState();
          break;
        }
      }
    } catch (err) {
      console.error("Error processing message:", err);
    }
  }
}
