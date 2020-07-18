import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import { connect } from "react-redux";
import { gray } from "../utils/colors";
import { addDeck } from "../actions";
import { submitDeck, resetDecks } from "../utils/api";
import { CommonActions } from "@react-navigation/native";

class AddDeck extends Component {
  state = {
    deckTitle: "",
  };

  handleSubmit() {
    const { dispatch, navigation } = this.props;
    dispatch(addDeck(this.state.deckTitle));
    submitDeck({ title: this.state.deckTitle });

    navigation.navigate("DeckDetail", { title: this.state.deckTitle });

    this.setState({
      deckTitle: "",
    });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.label}>What is the title of your new deck?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.text}
            onChangeText={(deckTitle) => this.setState({ deckTitle })}
            value={this.state.deckTitle}
            placeholder="Title"
          />
        </View>
        <TouchableOpacity
          style={styles.submitButton}
          disabled={this.state.deckTitle.trim().length === 0}
          onPress={() => {
            this.handleSubmit();
          }}
        >
          <Text style={styles.submitButtonText}>Create Deck</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  label: {
    fontSize: 22,
    marginBottom: 10,
  },
  text: {
    flex: 0.8,
    height: 40,
    borderColor: gray,
    borderWidth: 1,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: "black",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    margin: 20,
    padding: 20,
  },
  submitButtonText: {
    color: "white",
  },
});

export default connect()(AddDeck);
