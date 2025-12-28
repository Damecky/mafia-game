import { Role, Phase } from "@mafia/shared";
import { GameState } from "./game-state";

export type GameWinner = "MAFIA" | "CITY";

export interface GameOverResult {
  winner: GameWinner;
}

export function checkGameOver(state: GameState): GameOverResult | null {
  const alivePlayers = state.players.filter(p => p.alive);

  const aliveCivilians = alivePlayers.filter(
    p => p.role === Role.CIVILIAN
  );

  const aliveMafia = alivePlayers.filter(
    p => p.role === Role.MAFIA
  );

  // ❗ Twoja zasada: ginie ostatni cywil = mafia wygrywa
  if (aliveCivilians.length === 0 && aliveMafia.length > 0) {
    return { winner: "MAFIA" };
  }

  // ❗ brak mafii = miasto wygrywa
  if (aliveMafia.length === 0 && aliveCivilians.length > 0) {
    return { winner: "CITY" };
  }

  return null;
}

export function endGame(
  state: GameState,
  result: GameOverResult
): GameState {
  return {
    ...state,
    phase: Phase.GAME_OVER
  };
}
