import { CardId } from "@mafia/shared";
import { GameState } from "./game-state";

function randomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function assignAnalysis(state: GameState): GameState {
  if (!state.topVotedPlayerId) {
    throw new Error("No TOP1 player to analyze");
  }

  const alivePlayers = state.players.filter(p => p.alive);

  const receiver = randomItem(alivePlayers);

  return {
    ...state,
    pendingAnalysis: {
      targetPlayerId: state.topVotedPlayerId,
      receiverPlayerId: receiver.id
    }
  };
}
