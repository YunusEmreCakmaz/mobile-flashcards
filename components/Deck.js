import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";

class Deck extends Component {
  render() {
    const { deck } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.deckText}>{deck.title}</Text>
        <Text>
          {deck.questions !== "undefined" ? deck.questions.length : 0} cards
        </Text>
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { title } = ownProps;
  const deck = state[title];
  return {
    deck,
  };
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  deckText: {
    fontWeight: "bold",
    fontSize: 25,
  },
  box: {
    width: 50,
    height: 50,
    backgroundColor: "#e76e63",
    margin: 10,
  },
});

export default connect(mapStateToProps)(Deck);
