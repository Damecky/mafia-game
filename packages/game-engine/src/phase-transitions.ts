import { Phase } from "@mafia/shared";
import { GameState } from "./game-state";

export function goToInitVote(state: GameState): GameState {
  if (state.phase !== Phase.INIT_SILENCE) {
    throw new Error("Cannot go to INIT_VOTE from current phase");
  }

  return {
    ...state,
    phase: Phase.INIT_VOTE
  };
}
export function goToNight(state: GameState): GameState {
  return {
    ...state,
    phase: Phase.NIGHT,
    nightVotes: {}
  };
}
import { Phase } from "@mafia/shared";
import { GameState } from "./game-state";

export function goToDayDebate(state: GameState): GameState {
  if (state.phase !== Phase.NIGHT) {
    throw new Error("Cannot go to DAY_DEBATE from current phase");
  }

  return {
    ...state,
    phase: Phase.DAY_DEBATE
  };
}

export function goToDayVote(state: GameState): GameState {
  if (state.phase !== Phase.DAY_DEBATE) {
    throw new Error("Cannot go to DAY_VOTE from current phase");
  }

  return {
    ...state,
    phase: Phase.DAY_VOTE,
    dayVotes: {}
  };
}

export function goToNextNight(state: GameState): GameState {
  if (state.phase !== Phase.DAY_VOTE) {
    throw new Error("Cannot go to NIGHT from current phase");
  }

  return {
    ...state,
    phase: Phase.NIGHT,
    round: state.round + 1,
    roundsSinceLastReport: state.roundsSinceLastReport + 1,
    nightVotes: {}
  };
}
