import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { deleteDeck } from "../actions";
import { removeDeck } from "../utils/api";
import { CommonActions } from "@react-navigation/native";

class DeckDetail extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.deck !== undefined;
  }

  handleDelete() {
    const { deck, dispatch, navigation } = this.props;

    dispatch(deleteDeck(deck.title));
    removeDeck(deck.title);

    navigation.dispatch(
      CommonActions.navigate({
        name: "Decks",
      })
    );
  }
  render() {
    const { deck, questionCount, navigation } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.deckContainer}>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.subtitle}>{questionCount} card(s)</Text>
        </View>
        <TouchableOpacity style={[styles.button, styles.addButton]}>
          <Text
            style={[styles.buttonText, styles.addText]}
            onPress={() =>
              navigation.navigate("AddCard", { title: deck.title })
            }
          >
            Add Card
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.startButton]}>
          <Text
            style={[styles.buttonText, styles.startText]}
            onPress={() => navigation.navigate("Quiz", { deck })}
          >
            Start Quiz
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button]}>
          <Text
            style={[styles.buttonText, styles.deleteText]}
            onPress={() => this.handleDelete()}
          >
            Delete Deck
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const title = ownProps.route.params.title;
  const deck = state[title];
  const questionCount =
    deck !== undefined
      ? deck.questions !== undefined
        ? deck.questions.length
        : 0
      : 0;
  return {
    deck,
    questionCount,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  deckContainer: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "stretch",
    alignItems: "center",
  },
  title: {
    fontSize: 45,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 25,
  },
  button: {
    borderRadius: 10,
    margin: 20,
    padding: 20,
  },
  addButton: {
    backgroundColor: "#fff",
    borderColor: "black",
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 20,
  },
  addText: {
    color: "black",
  },
  startButton: {
    backgroundColor: "black",
  },
  startText: {
    color: "white",
  },
  deleteText: {
    color: "red",
  },
});

export default connect(mapStateToProps)(DeckDetail);
