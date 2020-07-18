import * as React from 'react';
import { View, StyleSheet,StatusBar } from "react-native";
import MainPage from './components/MainPage';
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import FlashCardsStatusBar from "./components/FlashCardsStatusBar"
import { purple } from './utils/colors'

export default function App() {
  return (
    <Provider store={createStore(reducer)}>
      <View style={{flex: 1}}>
          <FlashCardsStatusBar backgroundColor={purple} barStyle="light-content" />
          <MainPage />
        </View>
    </Provider>
  );
}

