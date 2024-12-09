import { Text, View, Button, ScrollView } from "react-native";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignInScreen from "./signin";
import api from "@/axios/api";

export default function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      // check if user auth inside async storage
      // if user is auth, set isAuthenticated to true
      // else, set isAuthenticated to false
      let userToken = await AsyncStorage.getItem("token");
      if (userToken) {
        // make api call to check if token is valid "/check-user-token-valid/{token}"
        let res = await api.get(`/check-user-token-valid/${userToken}`);
        if (res.data.valid) setIsAuthenticated(true);
        else setIsAuthenticated(false);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <>
      {!isAuthenticated ? (
        <SignInScreen />
      ) : (
        <View>
          <Text>Welcome to Trackerly</Text>
          <Button title="Sign In" onPress={() => router.push("/signin")} />
          <Button title="Sign Up" onPress={() => router.push("/signup")} />
          <Button
            title="Food Entry"
            onPress={() => router.push("/food-entry")}
          />
          {/* clear token button */}
          <Button
            title="Clear Token"
            onPress={async () => {
              await AsyncStorage.removeItem("token");
            }}
          />
          <ScrollView>
            <Text>Recent Food Entries</Text>
          </ScrollView>
        </View>
      )}
    </>
  );
}
