import React from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { isAxiosError } from "axios";
import { Controller, useForm } from "react-hook-form";

import api from "@/axios/api";
import AnimatedFruitBackground from "./AnimatedFruitBackground";

interface SignInFormData {
  email: string;
  password: string;
}

export default function SignInScreen() {
  const [signInError, setSignInError] = React.useState("");
  const navigation = useNavigation<any>();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSignIn = async (data: SignInFormData) => {
    setSignInError("");
    try {
      const res = await api.post("/signin/", data);
      await AsyncStorage.setItem("token", res.data.token);
      navigation.reset({ index: 0, routes: [{ name: "landing" }] });
    } catch (err) {
      let message = "Unable to sign in. Please try again.";
      const isApiError = isAxiosError(err);

      if (isApiError) {
        if (err.response?.status === 401) {
          message = "Invalid email or password.";
        } else if (err.code === "ECONNABORTED") {
          message = "The sign-in request timed out. Please try again.";
        } else if (!err.response) {
          message = "Unable to reach the server. Check your connection and try again.";
        } else if (typeof err.response.data?.detail === "string") {
          message = err.response.data.detail;
        }
      } else if (err instanceof Error) {
        message = err.message;
      }

      setSignInError(message);
      if (!isApiError || err.response?.status !== 401) {
        Alert.alert("Sign In Failed", message);
      }
    }
  };

  return (
    <AnimatedFruitBackground>
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Pressable
          onPress={() => {
            if (Platform.OS !== "web") Keyboard.dismiss();
          }}
          style={styles.screen}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.brandBlock}>
              <Text style={styles.brand}>Trackerly</Text>
              <Text style={styles.subtitle}>Log meals, scan foods, and keep your day on track.</Text>
            </View>

            <View style={styles.formPanel}>
              <Text style={styles.formTitle}>Sign in</Text>

              <Text style={styles.label}>Email</Text>
              <Controller
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, errors.email && styles.inputError]}
                    placeholder="you@example.com"
                    placeholderTextColor="#8A9590"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                )}
                name="email"
              />
              {errors.email ? (
                <Text style={styles.error}>{errors.email.message}</Text>
              ) : null}

              <Text style={styles.label}>Password</Text>
              <Controller
                control={control}
                rules={{ required: "Password is required" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, errors.password && styles.inputError]}
                    placeholder="Password"
                    placeholderTextColor="#8A9590"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry
                  />
                )}
                name="password"
              />
              {errors.password ? (
                <Text style={styles.error}>{errors.password.message}</Text>
              ) : null}
              {signInError ? <Text style={styles.error}>{signInError}</Text> : null}

              <TouchableOpacity
                style={[styles.primaryButton, isSubmitting && styles.disabledButton]}
                onPress={handleSubmit(onSignIn)}
                activeOpacity={0.86}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.primaryButtonText}>Sign in</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => navigation.navigate("signup")}
                activeOpacity={0.86}
              >
                <Text style={styles.secondaryButtonText}>Create an account</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Pressable>
      </KeyboardAvoidingView>
    </AnimatedFruitBackground>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 28,
  },
  brandBlock: {
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
    alignItems: "center",
    marginBottom: 22,
  },
  brand: {
    color: "#18352B",
    fontSize: 38,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 44,
    textAlign: "center",
  },
  subtitle: {
    color: "#49645A",
    fontSize: 16,
    lineHeight: 23,
    marginTop: 8,
    maxWidth: 330,
    textAlign: "center",
  },
  formPanel: {
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
    backgroundColor: "rgba(255, 255, 255, 0.94)",
    borderColor: "#D9E8DF",
    borderWidth: 1,
    borderRadius: 8,
    padding: 18,
    shadowColor: "#0F2E24",
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  formTitle: {
    color: "#18352B",
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 28,
    marginBottom: 18,
    textAlign: "center",
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
  inputError: {
    borderColor: "#D64545",
  },
  error: {
    color: "#B42318",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 10,
  },
  primaryButton: {
    minHeight: 52,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#168A68",
    marginTop: 8,
  },
  disabledButton: {
    opacity: 0.72,
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
