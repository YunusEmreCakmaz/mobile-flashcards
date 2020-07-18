export const RECEIVE_DECKS = "RECEIVE_DECKS";
export const ADD_DECK = "ADD_DECK";
export const ADD_CARD = "ADD_CARD";
export const DELETE_DECK = "DELETE_DECK";
export const RESET_STORE = 'RESET_STORE';

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  };
}

export function addDeck(deckTitle) {
  return {
    type: ADD_DECK,
    deckTitle,
  };
}

export function addCard(deckTitle, card) {
  return {
    type: ADD_CARD,
    deckTitle,
    card,
  };
}

export function deleteDeck(deckTitle){
  return{
    type:DELETE_DECK,
    deckTitle
  }
}

export function resetStore() {
  return {
    type: RESET_STORE
  };
}