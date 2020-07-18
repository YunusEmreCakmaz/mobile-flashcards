import { AsyncStorage } from "react-native";
import { setDummyData, DECKS_STORAGE_KEY, decks } from "./_DATA";

export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((response) => JSON.parse(response))
    .then((response) => {
      return response !== null ? response : setDummyData;
    });
}

export function submitDeck({ title }) {
  return AsyncStorage.mergeItem(
    DECKS_STORAGE_KEY,
    JSON.stringify({
      [title]: {
        title,
        questions: [],
      },
    })
  );
}

export function removeDeck(title) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((results) => {
    const data = JSON.parse(results);
    data[title] = undefined;
    delete data[title];
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
  });
}

export function resetDecks() {
  return AsyncStorage.removeItem(DECKS_STORAGE_KEY);
}

export function submitAddCardToDeck(title, card) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((results) => {
    const data = JSON.parse(results);
    const deck = data[title];
    AsyncStorage.mergeItem(
      DECKS_STORAGE_KEY,
      JSON.stringify({
        [title]: {
          questions: [...deck.questions].concat(card),
        },
      })
    );
  });
}

/*export async function getDeck(id) {
  try {
    const storeResults = await AsyncStorage.getItem(DECKS_STORAGE_KEY);

    return JSON.parse(storeResults)[id];
  } catch (err) {
    console.log(err);
  }
}


export async function addCardToDeckAS(title, card) {
  try {
    const deck = await getDeck(title);

    await AsyncStorage.mergeItem(
      DECKS_STORAGE_KEY,
      JSON.stringify({
        [title]: {
          questions: [...deck.questions].concat(card)
        }
      })
    );
  } catch (err) {
    console.log(err);
  }
}

export async function resetDecks() {
  try {
    await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
  } catch (err) {
    console.log(err);
  }
}*/
