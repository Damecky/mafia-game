import { Role } from "@mafia/shared";
import { GameState } from "./game-state";

/**
 * Zasada:
 * 4–5 graczy  -> 1 mafia
 * 6–8 graczy  -> 2 mafie
 * 9–10 graczy -> 3 mafie
 */
function calculateMafiaCount(playerCount: number): number {
  if (playerCount <= 5) return 1;
  if (playerCount <= 8) return 2;
  return 3;
}

function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function assignRoles(state: GameState): GameState {
  const mafiaCount = calculateMafiaCount(state.players.length);

  const roles: Role[] = [
    ...Array(mafiaCount).fill(Role.MAFIA),
    ...Array(state.players.length - mafiaCount).fill(Role.CIVILIAN)
  ];

  const shuffledRoles = shuffle(roles);

  const players = state.players.map((player, index) => ({
    ...player,
    role: shuffledRoles[index]
  }));

  return {
    ...state,
    players
  };
}
