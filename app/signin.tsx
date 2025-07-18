import React from "react";
import AnimatedFruitBackground from "./AnimatedFruitBackground";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Pressable,
  Keyboard,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import api from "@/axios/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useNavigation,
  createNavigationContainerRef,
} from "@react-navigation/native";

interface SignInFormData {
  email: string;
  password: string;
}

export default function SignInScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>();
  const navigation = useNavigation<any>();

  const onSignIn = async (data: SignInFormData) => {
    try {
      const res = await api.post("/signin/", data);
      console.log(res);
      // parse "data": {"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFlZm5vckB5YWhvby5jb20ifQ.T-UvZ1-ETji07of54sFT-iDIZ2PFHEuRmXkGQOLlsoU"}
      const token = res.data.token;
      // store token in AsyncStorage
      await AsyncStorage.setItem("token", token);
      // redirect to home screen
      navigation.navigate("food-entry"); // Replace 'Home' with the name of your home screen
    } catch (err) {
      console.log(err);
      Alert.alert("Sign In Failed", "Invalid email or password");
    }
  };

  return (
    <AnimatedFruitBackground>
      <View style={{ flex: 1 }}>
        <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
          <View style={styles.container}>
            <Text style={styles.title}>Trackerly</Text>

            <Controller
              control={control}
              rules={{
                required: "Email is required",
                pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
              }}
              render={({
                field: { onChange, onBlur, value },
              }: {
                field: {
                  onChange: (text: string) => void;
                  onBlur: () => void;
                  value: string;
                };
              }) => (
                <TextInput
                  style={[styles.input, errors.email && styles.inputError]}
                  placeholder="Email"
                  onBlur={onBlur}
                  placeholderTextColor="#000"
                  onChangeText={onChange}
                  value={value}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              )}
              name="email"
            />
            {errors.email && (
              <Text style={styles.error}>{errors.email.message}</Text>
            )}

            <Controller
              control={control}
              // rules={{ required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } }}
              render={({
                field: { onChange, onBlur, value },
              }: {
                field: {
                  onChange: (text: string) => void;
                  onBlur: () => void;
                  value: string;
                };
              }) => (
                <TextInput
                  style={[styles.input, errors.password && styles.inputError]}
                  placeholder="Password"
                  placeholderTextColor="#000"
                  onBlur={() => {
                    onBlur();
                    Keyboard.dismiss();
                  }}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                />
              )}
              name="password"
            />
            {errors.password && (
              <Text style={styles.error}>{errors.password.message}</Text>
            )}

            <AuthButtons
              isSubmitting={isSubmitting}
              onSignIn={onSignIn}
              handleSubmit={handleSubmit}
              navigation={navigation}
            />
          </View>
        </Pressable>
      </View>
    </AnimatedFruitBackground>
  );
}

function AuthButtons({
  isSubmitting,
  onSignIn,
  handleSubmit,
  navigation,
}: {
  isSubmitting: boolean;
  onSignIn: (data: SignInFormData) => Promise<void>;
  handleSubmit: (
    callback: (data: SignInFormData) => Promise<void>
  ) => () => void;
  navigation: any;
}) {
  return (
    <View style={styles.buttonContainer}>
      {isSubmitting ? (
        <ActivityIndicator size="large" color="#1E90FF" />
      ) : (
        <TouchableOpacity
          style={authButtonStyles.button}
          onPress={handleSubmit(onSignIn)}
          activeOpacity={0.8}
        >
          <Text style={authButtonStyles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={[authButtonStyles.button, authButtonStyles.secondaryButton]}
        onPress={() => navigation.navigate("signup")}
        activeOpacity={0.8}
      >
        <Text style={authButtonStyles.secondaryButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const authButtonStyles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    gap: 16,
    marginTop: 24,
  },
  button: {
    backgroundColor: "#1E2A38",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: "#1E90FF",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 1,
  },
  secondaryButton: {
    backgroundColor: "#101522",
    borderWidth: 1,
    borderColor: "#1E90FF",
  },
  secondaryButtonText: {
    color: "#1E90FF",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 1,
  },
});

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inputError: {
    borderColor: "red",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
