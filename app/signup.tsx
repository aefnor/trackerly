import api from "@/axios/api";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import AnimatedFruitBackground from "./AnimatedFruitBackground";

interface SignupForm {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export default function Signup() {
  const navigation = useNavigation<any>();
  const [formData, setFormData] = useState<SignupForm>({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (name: keyof SignupForm, value: string) => {
    setFormData({ ...formData, [name]: value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.first_name ||
      !formData.last_name
    ) {
      setError("Fill out every field to create your account.");
      return;
    }

    try {
      await api.post("/signup/", formData);
      setSuccess("Account created. You can sign in now.");
      setFormData({
        username: "",
        email: "",
        password: "",
        first_name: "",
        last_name: "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create account.");
    }
  };

  return (
    <AnimatedFruitBackground>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.kicker}>Trackerly</Text>
          <Text style={styles.title}>Create account</Text>
          <Text style={styles.subtitle}>
            Set up a profile so your meals and scans stay connected.
          </Text>
        </View>

        <View style={styles.formPanel}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="username"
            placeholderTextColor="#8A9590"
            value={formData.username}
            onChangeText={(value) => handleChange("username", value)}
            autoCapitalize="none"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="you@example.com"
            placeholderTextColor="#8A9590"
            value={formData.email}
            onChangeText={(value) => handleChange("email", value)}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#8A9590"
            value={formData.password}
            onChangeText={(value) => handleChange("password", value)}
            secureTextEntry
          />

          <View style={styles.nameRow}>
            <View style={styles.nameField}>
              <Text style={styles.label}>First name</Text>
              <TextInput
                style={styles.input}
                placeholder="First name"
                placeholderTextColor="#8A9590"
                value={formData.first_name}
                onChangeText={(value) => handleChange("first_name", value)}
              />
            </View>
            <View style={styles.nameField}>
              <Text style={styles.label}>Last name</Text>
              <TextInput
                style={styles.input}
                placeholder="Last name"
                placeholderTextColor="#8A9590"
                value={formData.last_name}
                onChangeText={(value) => handleChange("last_name", value)}
              />
            </View>
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}
          {success ? <Text style={styles.success}>{success}</Text> : null}

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleSubmit}
            activeOpacity={0.86}
          >
            <Text style={styles.primaryButtonText}>Create account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate("signin")}
            activeOpacity={0.86}
          >
            <Text style={styles.secondaryButtonText}>Back to sign in</Text>
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
    shadowColor: "#0F2E24",
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
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
  nameRow: {
    flexDirection: "row",
    gap: 10,
  },
  nameField: {
    flex: 1,
  },
  error: {
    color: "#B42318",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  success: {
    color: "#168A68",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  primaryButton: {
    minHeight: 52,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#168A68",
    marginTop: 4,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0,
  },
  secondaryButton: {
    minHeight: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#168A68",
    borderWidth: 1,
    marginTop: 12,
    backgroundColor: "#FFFFFF",
  },
  secondaryButtonText: {
    color: "#168A68",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0,
  },
});
