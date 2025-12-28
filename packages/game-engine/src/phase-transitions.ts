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
