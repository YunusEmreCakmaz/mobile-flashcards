import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DeckDetail from "./DeckDetail";
import Tab from "./Tab";
import AddCard from "./AddCard";
import Quiz from "./Quiz";

const Stack = createStackNavigator();

export default function MainPage() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Mobile Flashcards" component={Tab} />
        <Stack.Screen name="DeckDetail" component={DeckDetail} />
        <Stack.Screen
          name="AddCard"
          component={AddCard}
          options={({ route }) => ({ headerBackTitle: route.params.title })}
        />
        <Stack.Screen
          name="Quiz"
          component={Quiz}
          options={({ route }) => ({ headerBackTitle: route.params.title })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
