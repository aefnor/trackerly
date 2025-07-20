import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FoodEntryScreen from "./FoodEntryScreen";
import { View, Text } from "react-native";
import { NavigationIndependentTree } from "@react-navigation/native";

function HistoryScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>History (Coming Soon)</Text>
    </View>
  );
}

function FavoritesScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Favorites (Coming Soon)</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function FoodEntryTabs() {
  return (
    <NavigationIndependentTree>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: "#00c2a8" },
          tabBarActiveTintColor: "#fff",
        }}
      >
        <Tab.Screen name="Entry" component={FoodEntryScreen} />
        <Tab.Screen name="History" component={HistoryScreen} />
        <Tab.Screen name="Favorites" component={FavoritesScreen} />
      </Tab.Navigator>
    </NavigationIndependentTree>
  );
}
