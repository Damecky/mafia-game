import { Role } from "@mafia/shared";
import { GameState } from "./game-state";

export type AnalysisTone = "POSITIVE" | "NEGATIVE" | "UNCERTAIN";

export interface AnalysisMessage {
  tone: AnalysisTone;
  text: string;
}

/**
 * Zasady:
 * - komunikat dotyczy TOP1
 * - nie mówi wprost o roli
 * - ~20% komunikatów jest „bliżej prawdy”
 * - reszta to szum / wątpliwość
 */
export function generateAnalysisMessage(state: GameState): AnalysisMessage {
  if (!state.pendingAnalysis) {
    throw new Error("No pending analysis");
  }

  const target = state.players.find(
    p => p.id === state.pendingAnalysis!.targetPlayerId
  );

  if (!target) {
    throw new Error("Target player not found");
  }

  const isMafia = target.role === Role.MAFIA;

  // losujemy, czy komunikat będzie bliżej prawdy (~20%)
  const truthful = Math.random() < 0.2;

  if (truthful) {
    if (isMafia) {
      return randomFrom(NEGATIVE_MESSAGES);
    } else {
      return randomFrom(POSITIVE_MESSAGES);
    }
  }

  // SZUM / NIEJEDNOZNACZNOŚĆ
  return randomFrom(UNCERTAIN_MESSAGES);
}

function randomFrom(list: AnalysisMessage[]): AnalysisMessage {
  return list[Math.floor(Math.random() * list.length)];
}

const POSITIVE_MESSAGES: AnalysisMessage[] = [
  { tone: "POSITIVE", text: "Nie wykryto jednoznacznych sygnałów zagrożenia." },
  { tone: "POSITIVE", text: "Zachowanie nie odbiega od normy w tej fazie gry." },
  { tone: "POSITIVE", text: "Brak wyraźnych przesłanek wskazujących na spisek." }
];

const NEGATIVE_MESSAGES: AnalysisMessage[] = [
  { tone: "NEGATIVE", text: "Zauważono niespójności w zachowaniu tego gracza." },
  { tone: "NEGATIVE", text: "Niektóre sygnały mogą wskazywać na ukryte intencje." },
  { tone: "NEGATIVE", text: "Analiza nie wyklucza udziału w strukturach mafijnych." }
];

const UNCERTAIN_MESSAGES: AnalysisMessage[] = [
  { tone: "UNCERTAIN", text: "Analiza jest niejednoznaczna." },
  { tone: "UNCERTAIN", text: "Dostępne dane nie pozwalają na jasną ocenę." },
  { tone: "UNCERTAIN", text: "Możliwe zarówno niewinność, jak i manipulacja." },
  { tone: "UNCERTAIN", text: "Nie można wykluczyć celowego wprowadzania w błąd." },
  { tone: "UNCERTAIN", text: "Wynik może być efektem losowych czynników." }
];
