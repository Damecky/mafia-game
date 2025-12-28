import { Phase, Role } from "@mafia/shared";
import { GameState } from "./game-state";

export function castNightVote(
  state: GameState,
  voterId: string,
  targetId: string
): GameState {
  if (state.phase !== Phase.NIGHT) {
    throw new Error("Not in NIGHT phase");
  }

  return {
    ...state,
    nightVotes: {
      ...(state.nightVotes ?? {}),
      [voterId]: targetId
    }
  };
}
export function resolveNightVote(state: GameState): GameState {
  if (state.phase !== Phase.NIGHT) {
    throw new Error("Not in NIGHT phase");
  }

  if (!state.nightVotes) {
    throw new Error("No night votes");
  }

  const mafiaPlayers = state.players.filter(
    p => p.alive && p.role === Role.MAFIA
  );

  if (mafiaPlayers.length === 0) {
    return state;
  }

  const mafiaVotes = mafiaPlayers.map(p => state.nightVotes![p.id]).filter(Boolean);

  // brak jednomyślności
  const uniqueTargets = new Set(mafiaVotes);
  if (uniqueTargets.size !== 1) {
    return {
      ...state,
      nightVotes: undefined
    };
  }

  const targetId = mafiaVotes[0];

  const players = state.players.map(p =>
    p.id === targetId ? { ...p, alive: false } : p
  );

  return {
    ...state,
    players,
    nightVotes: undefined
  };
}
