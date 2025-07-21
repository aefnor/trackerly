import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
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
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Welcome to Trackerly!</Text>
          </View>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.tropicalButton, styles.scanButton]}
              onPress={() => navigation.navigate("ScanScreen")}
              activeOpacity={0.85}
            >
              <Text style={styles.buttonText}>Scan Food Barcode</Text>
            </TouchableOpacity>
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
  scanButton: {
    backgroundColor: "#FFD54D", // Gargoyle Gas
    borderWidth: 2,
    borderColor: "#FFD54D",
  },
  titleWrapper: {
    backgroundColor: "#F52549", // Crayola's Red
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 18,
    marginBottom: 32,
    shadowColor: "#FFD54D",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 6,
    alignItems: "center",
  },
  testingButton: {
    backgroundColor: "#99BE1B", // Dark Lemon Lime
    borderWidth: 2,
    borderColor: "#99BE1B",
  },
  signOutButton: {
    backgroundColor: "#FFD54D", // Gargoyle Gas
    borderWidth: 2,
    borderColor: "#FFD54D",
  },
  absoluteContent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    backgroundColor: "transparent",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "rgba(255,255,255,0.92)", // Semi-transparent white for readability
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "Montserrat, Avenir, Helvetica Neue, Arial, sans-serif",
    letterSpacing: 3,
    // textShadowColor: "#FFD54D", // Gargoyle Gas
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 8,
    textAlign: "center",
    textTransform: "uppercase",
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
    backgroundColor: "#FFD54D", // Gargoyle Gas
    borderWidth: 2,
    borderColor: "#FFD54D",
  },
  activityButton: {
    backgroundColor: "#99BE1B", // Dark Lemon Lime
    borderWidth: 2,
    borderColor: "#99BE1B",
  },
  profileButton: {
    backgroundColor: "#F96574", // Begonia
    borderWidth: 2,
    borderColor: "#F96574",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    letterSpacing: 1.5,
    fontFamily: "Montserrat, Avenir, Helvetica Neue, Arial, sans-serif",
  },
});
