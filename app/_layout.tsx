import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { router, Stack } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import {
  createNavigationContainerRef,
  NavigationContainer,
} from "@react-navigation/native";
import SignInScreen from "./signin";
import ProfileScreen from "@/screens/ProfileScreen";
import Signup from "./signup";
import FoodEntry from "./food-entry";
import FoodEntryScreen from "@/screens/FoodEntryScreen";
import FoodEntryTabs from "@/screens/FoodEntryTabs";
import Index from "./index";
import AgendaScreen from "./agenda";

export const navigationRef = createNavigationContainerRef();

export function navigate(name: string, params?: object) {
  if (navigationRef.isReady()) {
    // @ts-ignore
    navigationRef.navigate(name, params);
  } else {
    console.log("Navigation not ready");
  }
}
function CustomHeader({
  navigation,
  title,
  path,
  hideLeftButton,
  hideRightButton,
  color,
}: {
  navigation: any;
  title: string;
  path: string;
  hideLeftButton?: boolean;
  hideRightButton?: boolean;
  color?: string;
}) {
  return (
    <View style={[styles.header, { backgroundColor: color || "#16a2ffff" }]}>
      <StatusBar hidden={true} />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        {!hideLeftButton && <Text style={styles.backButton}>Back</Text>}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push(path as any)}>
        {!hideRightButton && <Text style={styles.title}>{title}</Text>}
      </TouchableOpacity>
    </View>
  );
}

export default function RootLayout() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name="index" options={{ headerShown: false }}>
          {() => <Index />}
        </Stack.Screen>
        <Stack.Screen name="profile">{() => <ProfileScreen />}</Stack.Screen>
        <Stack.Screen name="signin">{() => <SignInScreen />}</Stack.Screen>
        <Stack.Screen
          name="food-entry"
          options={{
            title: "Food Entry",
            headerShown: true,
            headerStyle: { backgroundColor: "#FF474A" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold", fontSize: 22 },
          }}
        >
          {() => <FoodEntryScreen />}
        </Stack.Screen>
        <Stack.Screen name="signup">{() => <Signup />}</Stack.Screen>
        <Stack.Screen name="agenda">{() => <AgendaScreen />}</Stack.Screen>
        {/* Register the landing screen here */}
        <Stack.Screen
          name="landing"
          component={require("./LandingScreen").default}
          options={{
            title: "Welcome",
            headerShown: true,
            headerStyle: { backgroundColor: "#00C2A8" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold", fontSize: 22 },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  header: {
    height: 80,
    // backgroundColor: color,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingRight: 40,
    paddingLeft: 20,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  backButton: {
    color: "#fff",
    fontSize: 18,
    paddingLeft: "5%",
  },
});
