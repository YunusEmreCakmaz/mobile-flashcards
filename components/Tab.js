import React, { Component } from "react";
import { View, Text } from "react-native";
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from "@react-navigation/bottom-tabs";
import Decks from "./Decks";
import AddDeck from "./AddDeck";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { setLocalNotification, clearLocalNotification } from '../utils/helpers';


export default class Tab extends Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    const Tab = createBottomTabNavigator();

    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let icon;
            if (route.name === "Decks") {
              icon = <FontAwesome name="list" size={size} color={color} />;
            } else if (route.name === "AddDeck") {
              icon = (
                <FontAwesome name="plus-square" size={size} color={color} />
              );
            }
            return icon;
          },
        })}
      >
        <Tab.Screen name="Decks" component={Decks} />
        <Tab.Screen name="AddDeck" component={AddDeck} />
      </Tab.Navigator>
    );
  }
}
