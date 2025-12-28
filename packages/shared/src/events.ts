import { Phase } from "./phases";
import { CardId } from "./cards";

export enum GameEventType {
  ROOM_CREATED = "ROOM_CREATED",
  PLAYER_JOINED = "PLAYER_JOINED",
  GAME_STARTED = "GAME_STARTED",

  PHASE_CHANGED = "PHASE_CHANGED",

  PRIVATE_CARD = "PRIVATE_CARD",
  CARD_EXPIRED = "CARD_EXPIRED",

  VOTE_STARTED = "VOTE_STARTED",
  VOTE_CAST = "VOTE_CAST",
  VOTE_RESULT = "VOTE_RESULT",

  PLAYER_ELIMINATED = "PLAYER_ELIMINATED",

  CITY_REPORT = "CITY_REPORT",

  GAME_OVER = "GAME_OVER"
}

export interface PhaseChangedEvent {
  type: GameEventType.PHASE_CHANGED;
  phase: Phase;
  durationMs: number;
}

export interface PrivateCardEvent {
  type: GameEventType.PRIVATE_CARD;
  cardId: CardId;
}

export interface CardExpiredEvent {
  type: GameEventType.CARD_EXPIRED;
  cardId: CardId;
}

export interface VoteStartedEvent {
  type: GameEventType.VOTE_STARTED;
  phase: Phase;
  durationMs: number;
}

export interface VoteResultEvent {
  type: GameEventType.VOTE_RESULT;
  eliminatedPlayerId?: string;
}

export interface PlayerEliminatedEvent {
  type: GameEventType.PLAYER_ELIMINATED;
  playerId: string;
}

export interface CityReportEvent {
  type: GameEventType.CITY_REPORT;
  status: "RED" | "ORANGE" | "GREEN";
}

export interface GameOverEvent {
  type: GameEventType.GAME_OVER;
  winner: "MAFIA" | "CITY";
}

export type GameEvent =
  | PhaseChangedEvent
  | PrivateCardEvent
  | CardExpiredEvent
  | VoteStartedEvent
  | VoteResultEvent
  | PlayerEliminatedEvent
  | CityReportEvent
  | GameOverEvent;
