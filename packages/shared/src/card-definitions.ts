import { CardId } from "./cards";
import { Phase } from "./phases";
import { Role } from "./roles";
import { CardDefinition, CardVisibility } from "./card-types";

export const CARD_DEFINITIONS: Record<CardId, CardDefinition> = {
  // SYSTEM
  [CardId.ANALYSIS]: {
    id: CardId.ANALYSIS,
    visibility: CardVisibility.SYSTEM,
    allowedRoles: [Role.CIVILIAN, Role.MAFIA],
    usableInPhases: [],
    forcedUse: true
  },

  [CardId.CITY_REPORT]: {
    id: CardId.CITY_REPORT,
    visibility: CardVisibility.SYSTEM,
    allowedRoles: [],
    usableInPhases: [],
    forcedUse: true
  },

  // TAJNE
  [CardId.CHECK]: {
    id: CardId.CHECK,
    visibility: CardVisibility.SECRET,
    allowedRoles: [Role.CIVILIAN, Role.MAFIA],
    usableInPhases: [Phase.NIGHT],
    forcedUse: false
  },

  [CardId.LINK]: {
    id: CardId.LINK,
    visibility: CardVisibility.SECRET,
    allowedRoles: [Role.CIVILIAN, Role.MAFIA],
    usableInPhases: [Phase.NIGHT],
    forcedUse: false
  },

  [CardId.FALSE_TRACE]: {
    id: CardId.FALSE_TRACE,
    visibility: CardVisibility.SECRET,
    allowedRoles: [Role.CIVILIAN, Role.MAFIA],
    usableInPhases: [Phase.NIGHT],
    forcedUse: true
  },

  // JAWNE
  [CardId.SHIELD]: {
    id: CardId.SHIELD,
    visibility: CardVisibility.PUBLIC,
    allowedRoles: [Role.CIVILIAN, Role.MAFIA],
    usableInPhases: [Phase.NIGHT],
    forcedUse: false
  },

  [CardId.DOUBLE_VOTE]: {
    id: CardId.DOUBLE_VOTE,
    visibility: CardVisibility.PUBLIC,
    allowedRoles: [Role.CIVILIAN, Role.MAFIA],
    usableInPhases: [Phase.DAY_VOTE],
    forcedUse: false
  },

  // TYLKO MAFIA
  [CardId.REPORT_DISRUPTION]: {
    id: CardId.REPORT_DISRUPTION,
    visibility: CardVisibility.PUBLIC,
    allowedRoles: [Role.MAFIA],
    usableInPhases: [],
    forcedUse: false
  }
};
