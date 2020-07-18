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
import { addCard } from "../actions";
import {submitAddCardToDeck} from "../utils/api";

class AddCard extends Component {
  state = {
    question: "",
    answer: "",
  };

  handleSubmit() {
    const { deck, dispatch, navigation } = this.props;
    dispatch(
      addCard(deck.title, {
        ...this.state,
      })
    );

    submitAddCardToDeck(deck.title, {
      ...this.state,
    });

    navigation.goBack();

    this.setState({
      question: "",
      answer: "",
    });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.text}
            onChangeText={(question) => this.setState({ question })}
            value={this.state.question}
            placeholder="Question"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.text}
            onChangeText={(answer) => this.setState({ answer })}
            value={this.state.answer}
            placeholder="Answer"
          />
        </View>
        <TouchableOpacity
          style={styles.submitButton}
          disabled={
            this.state.question.trim().length === 0 ||
            this.state.answer.trim().length === 0
          }
          onPress={() => {
            this.handleSubmit();
          }}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { title } = ownProps.route.params;
  const deck = state[title];
  return {
    deck,
  };
};

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

export default connect(mapStateToProps)(AddCard);
