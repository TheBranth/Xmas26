export type GameStatus = "LOBBY" | "ACTIVE";

export type StatKey = "muscoli" | "cervello" | "facciaTosta" | "prontezza";

export interface CharacterStats {
  muscoli: number;
  cervello: number;
  facciaTosta: number;
  prontezza: number;
}

export interface Character {
  id: string; // "secchione" | "palestrato" | "squinza" | "maranza"
  name: string;
  subtitle: string;
  silhouetteDesc: string;
  stats: CharacterStats;
  specialties: string[];
  negativeTraits: string[];
  iconicItem: string;
  colorScheme: {
    primary: string;
    border: string;
    badge: string;
  };
}

export interface GameScene {
  id: string; // Es. "1.1", "2.3"
  phase: number; // Raggruppamento per tab (1, 2, 3, 4, 99)
  phaseTitle: string; // Titolo della fase
  title: string; // Titolo visibile a tutti
  imagePath: string; // Percorso file asset
  silhouetteNote: string; // Prompt per le silhouette scure in controluce
}

export interface CustomSceneData {
  title: string;
  imageUrl: string;
  applyPastelFilter: boolean;
}

export interface CharacterLock {
  playerId: string;
  playerName: string;
  lockedAt: number;
}

export interface DiceRollResult {
  id: string;
  playerId: string;
  playerName: string;
  characterId: string;
  characterName: string;
  statKey: StatKey;
  statName: string;
  statValue: number;
  specialtyUsed?: string | null;
  negativeTraitUsed?: string | null;
  spentCookie: boolean;
  diceCount: number;
  rolls: number[];
  successCount: number;
  criticalCount: number; // 6s
  complicationCount: number; // 1s if negative trait used
  timestamp: number;
}

export interface BeltItem {
  id: string;
  item: string;
  dare: string;
}

export interface BeltDrawResult {
  id: string;
  item: string;
  dare: string;
  timestamp: number;
}

export interface KickOutEvent {
  characterId: string;
  characterName: string;
  kickedPlayerId: string;
  lockedByPlayerName: string;
  timestamp: number;
}

export interface RoomState {
  status: GameStatus;
  currentSceneId: string; // "1.1", "1.2", etc.
  customScene: CustomSceneData | null;
  characterLocks: Record<string, CharacterLock>; // characterId -> Lock
  disasterClock: number; // 0 to 6
  cookies: Record<string, number>; // characterId -> cookie count
  lastRoll: DiceRollResult | null;
  lastBeltDraw: BeltDrawResult | null;
  kickOutEvent: KickOutEvent | null;
}

// Client -> Server messages
export type ClientMessage =
  | { type: "LOCK_CHARACTER"; characterId: string; playerId: string; playerName: string }
  | { type: "UNLOCK_CHARACTER"; characterId: string; playerId: string }
  | { type: "RESET_LOCKS" }
  | { type: "SET_STATUS"; status: GameStatus }
  | { type: "SET_SCENE"; sceneId: string }
  | { type: "SET_CUSTOM_SCENE"; data: CustomSceneData }
  | { type: "SET_CLOCK"; clock: number }
  | { type: "MODIFY_COOKIE"; characterId: string; delta: number }
  | {
      type: "ROLL_DICE";
      playerId: string;
      playerName: string;
      characterId: string;
      characterName: string;
      statKey: StatKey;
      statName: string;
      statValue: number;
      specialtyUsed?: string | null;
      negativeTraitUsed?: string | null;
      spentCookie: boolean;
    }
  | { type: "DRAW_BELT" }
  | { type: "CLEAR_OVERLAYS" };

// Server -> Client messages
export type ServerMessage =
  | { type: "STATE_SYNC"; state: RoomState }
  | { type: "KICK_OUT"; event: KickOutEvent }
  | { type: "DICE_ROLLED"; roll: DiceRollResult }
  | { type: "BELT_DRAWN"; draw: BeltDrawResult };
