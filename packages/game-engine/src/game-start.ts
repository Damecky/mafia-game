import { Phase } from "@mafia/shared";
import { GameState } from "./game-state";
import { assignRoles } from "./role-assignment";

export function startGame(state: GameState): GameState {
  const withRoles = assignRoles(state);

  return {
    ...withRoles,
    phase: Phase.INIT_SILENCE,
    round: 1,
    roundsSinceLastReport: 0,
    reportDisrupted: false
  };
}
