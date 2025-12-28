import { Phase, Role } from "@mafia/shared";
import { GameState, PlayerState } from "./game-state";

export function createGame(roomCode: string, hostId: string): GameState {
  return {
    roomCode,
    phase: Phase.LOBBY,
    round: 0,
    players: [],
    hostId,
    roundsSinceLastReport: 0,
    reportDisrupted: false
  };
}

export function addPlayer(
  state: GameState,
  playerId: string,
  name: string
): GameState {
  const player: PlayerState = {
    id: playerId,
    name,
    role: Role.CIVILIAN, // tymczasowo
    alive: true,
    cards: []
  };

  return {
    ...state,
    players: [...state.players, player]
  };
}
