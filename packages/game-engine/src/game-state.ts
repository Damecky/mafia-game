import { Phase, Role, CardId } from "@mafia/shared";

export interface PlayerState {
  id: string;
  name: string;
  role: Role;
  alive: boolean;

  /** karty posiadane przez gracza */
  cards: CardId[];
}

export interface GameState {
  roomCode: string;

  phase: Phase;
  round: number;

  players: PlayerState[];

  /** id gracza, który jest hostem */
  hostId: string;

  /** do raportu miasta */
  roundsSinceLastReport: number;

  /** czy raport został zakłócony */
  reportDisrupted: boolean;
}
  /** głosy w aktualnym głosowaniu: voterId -> targetId */
  votes?: Record<string, string>;

  /** gracz z największą liczbą głosów w INIT_VOTE */
  topVotedPlayerId?: string;
  /** systemowa analiza po rundzie 0 */
  pendingAnalysis?: {
    targetPlayerId: string;
    receiverPlayerId: string;
  };

