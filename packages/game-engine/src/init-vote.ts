import { Phase } from "@mafia/shared";
import { GameState } from "./game-state";

export function castInitVote(
  state: GameState,
  voterId: string,
  targetId: string
): GameState {
  if (state.phase !== Phase.INIT_VOTE) {
    throw new Error("Not in INIT_VOTE phase");
  }

  return {
    ...state,
    votes: {
      ...(state.votes ?? {}),
      [voterId]: targetId
    }
  };
}

export function finishInitVote(state: GameState): GameState {
  if (state.phase !== Phase.INIT_VOTE) {
    throw new Error("Not in INIT_VOTE phase");
  }

  if (!state.votes) {
    throw new Error("No votes cast");
  }

  const counts: Record<string, number> = {};

  for (const targetId of Object.values(state.votes)) {
    counts[targetId] = (counts[targetId] ?? 0) + 1;
  }

  let topPlayerId: string | undefined;
  let maxVotes = -1;

  for (const [playerId, count] of Object.entries(counts)) {
    if (count > maxVotes) {
      maxVotes = count;
      topPlayerId = playerId;
    }
  }

  return {
    ...state,
    phase: Phase.INIT_TOP_SPEECH,
    topVotedPlayerId: topPlayerId,
    votes: undefined
  };
}
