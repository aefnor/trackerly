import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import AnimatedFruitBackground from "../app/AnimatedFruitBackground";
import MainPageButton from "../components/MainPageButton";

type EditProfileScreenNavigationProp = {
  goBack: () => void;
};

export default function EditProfileScreen({
  navigation,
}: {
  navigation: EditProfileScreenNavigationProp;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [goal, setGoal] = useState("");

  const handleSave = () => {
    Alert.alert("Profile Updated", "Your changes have been saved.");
    navigation.goBack();
  };

  return (
    <AnimatedFruitBackground>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <MainPageButton />

        <View style={styles.header}>
          <Text style={styles.kicker}>Profile</Text>
          <Text style={styles.title}>Edit details</Text>
          <Text style={styles.subtitle}>
            Keep your account and health goal current.
          </Text>
        </View>

        <View style={styles.formPanel}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            placeholderTextColor="#8A9590"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor="#8A9590"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Fitness goal</Text>
          <TextInput
            style={styles.input}
            value={goal}
            onChangeText={setGoal}
            placeholder="Enter your fitness goal"
            placeholderTextColor="#8A9590"
          />

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleSave}
            activeOpacity={0.86}
          >
            <Text style={styles.primaryButtonText}>Save changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </AnimatedFruitBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 28,
  },
  header: {
    width: "100%",
    maxWidth: 430,
    alignItems: "center",
    marginBottom: 20,
  },
  kicker: {
    color: "#168A68",
    fontSize: 14,
    fontWeight: "800",
    lineHeight: 18,
    marginBottom: 8,
    textAlign: "center",
  },
  title: {
    color: "#18352B",
    fontSize: 34,
    fontWeight: "800",
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: "center",
  },
  subtitle: {
    color: "#49645A",
    fontSize: 16,
    lineHeight: 23,
    marginTop: 8,
    maxWidth: 360,
    textAlign: "center",
  },
  formPanel: {
    width: "100%",
    maxWidth: 430,
    borderRadius: 8,
    borderColor: "#D9E8DF",
    borderWidth: 1,
    backgroundColor: "rgba(255, 255, 255, 0.94)",
    padding: 18,
  },
  label: {
    color: "#29483D",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 18,
    marginBottom: 7,
  },
  input: {
    height: 50,
    borderColor: "#C9DDD3",
    borderWidth: 1,
    borderRadius: 8,
    color: "#18352B",
    fontSize: 16,
    paddingHorizontal: 14,
    marginBottom: 12,
    backgroundColor: "#FFFFFF",
  },
  primaryButton: {
    minHeight: 52,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#168A68",
    marginTop: 8,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0,
  },
});
