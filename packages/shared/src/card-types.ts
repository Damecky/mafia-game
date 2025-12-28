import { CardId } from "./cards";
import { Phase } from "./phases";
import { Role } from "./roles";

export enum CardVisibility {
  SECRET = "SECRET",
  PUBLIC = "PUBLIC",
  SYSTEM = "SYSTEM"
}

export interface CardDefinition {
  id: CardId;
  visibility: CardVisibility;

  /** kto może otrzymać kartę */
  allowedRoles: Role[];

  /** w jakiej fazie karta może być użyta */
  usableInPhases: Phase[];

  /** czy karta MUSI być użyta natychmiast */
  forcedUse: boolean;
}
