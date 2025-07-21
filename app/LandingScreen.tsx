import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Alert } from "react-native";
import AnimatedFruitBackground from "./AnimatedFruitBackground";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function LandingScreen() {
  const navigation = useNavigation<any>();

  const handleSignOut = async () => {
    await AsyncStorage.removeItem("token");
    navigation.reset({ index: 0, routes: [{ name: "signin" }] });
  };

  const handleClearToken = async () => {
    await AsyncStorage.removeItem("token");
    Alert.alert("Token cleared for testing");
  };

  return (
    <AnimatedFruitBackground>
      <View style={styles.absoluteContent}>
        <View style={styles.container}>
          <Text style={styles.title}>Welcome to Trackerly!</Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.tropicalButton, styles.foodButton]}
              onPress={() => navigation.navigate("food-entry")}
              activeOpacity={0.85}
            >
              <Text style={styles.buttonText}>Food Entry</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tropicalButton, styles.activityButton]}
              onPress={() => navigation.navigate("activity-entry")}
              activeOpacity={0.85}
            >
              <Text style={styles.buttonText}>Activity Entry</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tropicalButton, styles.profileButton]}
              onPress={() => navigation.navigate("profile")}
              activeOpacity={0.85}
            >
              <Text style={styles.buttonText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tropicalButton, styles.signOutButton]}
              onPress={handleSignOut}
              activeOpacity={0.85}
            >
              <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tropicalButton, styles.testingButton]}
              onPress={handleClearToken}
              activeOpacity={0.85}
            >
              <Text style={styles.buttonText}>Clear Token (Testing)</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </AnimatedFruitBackground>
  );
}

const styles = StyleSheet.create({
  testingButton: {
    backgroundColor: "#B2FF59", // Lime green for testing
    borderWidth: 2,
    borderColor: "#B2FF59",
  },
  signOutButton: {
    backgroundColor: "#FFB300", // Mango orange
    borderWidth: 2,
    borderColor: "#FFB300",
  },
  absoluteContent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "rgba(255,255,255,0)",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#00C2A8",
    marginBottom: 32,
    fontFamily: "Montserrat, Avenir, Helvetica Neue, Arial, sans-serif",
    letterSpacing: 2,
    textShadowColor: "#FFE066",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
  },
  buttonGroup: {
    width: "100%",
    gap: 18,
  },
  tropicalButton: {
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  foodButton: {
    backgroundColor: "#FFE066", // Pineapple yellow
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  activityButton: {
    backgroundColor: "#00C2A8", // Tropical turquoise
    borderWidth: 2,
    borderColor: "#00BFAE",
  },
  profileButton: {
    backgroundColor: "#FF6F61", // Coral red
    borderWidth: 2,
    borderColor: "#FF8A65",
  },
  buttonText: {
    color: "#2E8B57",
    fontWeight: "bold",
    fontSize: 20,
    letterSpacing: 1.5,
    fontFamily: "Montserrat, Avenir, Helvetica Neue, Arial, sans-serif",
  },
});
