import {
  RECEIVE_DECKS,
  ADD_DECK,
  ADD_CARD,
  DELETE_DECK,
  RESET_STORE,
} from "../actions";
import { decks as INITIALSTATE } from "../utils/_DATA";

function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      };
    case ADD_DECK:
      return {
        ...state,
        [action.deckTitle]: {
          title: action.deckTitle,
          questions: [],
        },
      };
    case ADD_CARD:
      const { deckTitle, card } = action;
      return {
        ...state,
        [deckTitle]: {
          ...state[deckTitle],
          questions: [...state[deckTitle].questions].concat(card),
        },
      };
    case DELETE_DECK:
      const { [action.deckTitle]: value, ...remainingDecks } = state;
      return remainingDecks;
    case RESET_STORE:
      return null;
    default:
      return state;
  }
}

export default decks;
