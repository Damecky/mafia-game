import { Phase } from "@mafia/shared";
import { GameState } from "./game-state";

export function castDayVote(
  state: GameState,
  voterId: string,
  targetId: string
): GameState {
  if (state.phase !== Phase.DAY_VOTE) {
    throw new Error("Not in DAY_VOTE phase");
  }

  return {
    ...state,
    dayVotes: {
      ...(state.dayVotes ?? {}),
      [voterId]: targetId
    }
  };
}

export function resolveDayVote(state: GameState): GameState {
  if (state.phase !== Phase.DAY_VOTE) {
    throw new Error("Not in DAY_VOTE phase");
  }

  if (!state.dayVotes) {
    throw new Error("No day votes");
  }

  const counts: Record<string, number> = {};
  for (const targetId of Object.values(state.dayVotes)) {
    counts[targetId] = (counts[targetId] ?? 0) + 1;
  }

  let topId: string | undefined;
  let topCount = -1;
  let isTie = false;

  for (const [id, count] of Object.entries(counts)) {
    if (count > topCount) {
      topCount = count;
      topId = id;
      isTie = false;
    } else if (count === topCount) {
      isTie = true;
    }
  }

  // remis -> nikt nie odpada
  if (isTie || !topId) {
    return {
      ...state,
      dayVotes: undefined
    };
  }

  const players = state.players.map(p =>
    p.id === topId ? { ...p, alive: false } : p
  );

  return {
    ...state,
    players,
    dayVotes: undefined
  };
}
