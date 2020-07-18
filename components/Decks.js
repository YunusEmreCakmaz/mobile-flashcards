import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { getDecks, resetDecks } from "../utils/api";
import { connect } from "react-redux";
import { receiveDecks, resetStore } from "../actions";
import { gray, green } from "../utils/colors";
import Deck from "./Deck";

class Decks extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    /*resetDecks().then(() => {
      dispatch(resetStore());
    });*/
    getDecks().then((decks) => {
      dispatch(receiveDecks(decks));
    });
  }

  render() {
    const { decks, navigation } = this.props;

    return (
      <ScrollView style={styles.container}>
        {Object.values(decks).map((deck) => {
          return (
            <TouchableOpacity
              key={deck.title}
              onPress={() =>
                navigation.navigate("DeckDetail", { title: deck.title })
              }
            >
              <Deck key={deck.title} title={deck.title}></Deck>
            </TouchableOpacity>
          );
        })}
        <View style={{ marginBottom: 30 }} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
});

function mapStateToProps(decks) {
  return {
    decks,
  };
}

export default connect(mapStateToProps)(Decks);
