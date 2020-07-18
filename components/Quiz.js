import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Button, Card, Title } from "react-native-paper";
import { setLocalNotification, clearLocalNotification } from "../utils/helpers";

class Quiz extends Component {
  state = {
    questionIndex: 0,
    correctCount: 0,
    quizCompleted: false,
    showAnswer: false,
  };

  markAnswer(isCorrect) {
    if (!this.state.quizCompleted) {
      const updatedIndex = this.state.questionIndex + 1;
      const isCompleted = this.props.deck.questions.length === updatedIndex;

      this.setState({
        questionIndex: updatedIndex,
        quizCompleted: isCompleted,
        correctCount: isCorrect
          ? ++this.state.correctCount
          : this.state.correctCount,
        showAnswer: false,
      });
    } else {
      clearLocalNotification().then(setLocalNotification);
    }
  }

  showAnswer() {
    this.setState({
      showAnswer: true,
    });
  }

  handleRetakeQuiz() {
    const { deck, navigation } = this.props;

    this.setState({
      questionIndex: 0,
      correctCount: 0,
      quizCompleted: false,
      showAnswer: false,
    });
  }

  render() {
    const { deck, navigation } = this.props;
    const {
      questionIndex,
      quizCompleted,
      showAnswer,
      correctCount,
    } = this.state;

    if (deck.questions.length == 0) {
      return (
        <View style={styles.container}>
          <View style={styles.deckContainer}>
            <Text style={styles.subtitle}>
              Sorry, you can't take a quiz because there are no cards in the
              deck
            </Text>
          </View>
        </View>
      );
    }
    return quizCompleted ? (
      <View style={styles.container}>
        <View style={styles.deckContainer}>
          <Text style={styles.subtitle}>
            {correctCount} question answered correctly of
            {deck.questions.length} question
          </Text>
          <TouchableOpacity style={[styles.button, styles.addButton]}>
            <Text
              style={[styles.buttonText, styles.addText]}
              onPress={() => this.handleRetakeQuiz()}
            >
              Retake Quiz
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.addButton]}>
            <Text
              style={[styles.buttonText, styles.addText]}
              onPress={() => navigation.goBack()}
            >
              Go To Deck Detail
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    ) : (
      <Card style={styles.container}>
        <Card.Content style={styles.deckContainer}>
          <View>
            <Text style={styles.title}>
              {deck.questions[questionIndex].question}
            </Text>
            <Text style={styles.subtitle}>
              {deck.questions.length - questionIndex} question(s) remaining
            </Text>
            {showAnswer && (
              <Text style={styles.answerText}>
                {deck.questions[questionIndex].answer}
              </Text>
            )}
          </View>
        </Card.Content>
        <Card.Actions>
          <Button onPress={(e) => this.showAnswer()}>Show Answer</Button>
          <Button onPress={(e) => this.markAnswer(1)}>Correct</Button>
          <Button onPress={(e) => this.markAnswer(0)}>Incorrect</Button>
        </Card.Actions>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  answerText: {
    fontSize: 25,
    color: "green",
  },
});

const mapStateToProps = (state, ownProps) => {
  const deck = ownProps.route.params.deck;
  return {
    deck,
  };
};

export default connect(mapStateToProps)(Quiz);
