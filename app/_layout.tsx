import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createNavigationContainerRef,
  NavigationContainer,
} from "@react-navigation/native";
import SignInScreen from "./signin";
import ProfileScreen from "@/screens/ProfileScreen";
import Signup from "./signup";
import FoodEntryScreen from "@/screens/FoodEntryScreen";
import Index from "./index";
import AgendaScreen from "./agenda";
import EditProfile from "./editprofile";
import ScanScreen from "@/screens/ScanScreen";
import LandingScreen from "./LandingScreen";

export const navigationRef = createNavigationContainerRef();

export function navigate(name: string, params?: object) {
  if (navigationRef.isReady()) {
    // @ts-ignore
    navigationRef.navigate(name, params);
  } else {
    console.log("Navigation not ready");
  }
}

export default function RootLayout() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name="index" options={{ headerShown: false }}>
          {() => <Index />}
        </Stack.Screen>
        <Stack.Screen
          name="profile"
          options={{
            headerShown: false,
          }}
        >
          {() => <ProfileScreen />}
        </Stack.Screen>
        <Stack.Screen name="signin" options={{ headerShown: false }}>
          {() => <SignInScreen />}
        </Stack.Screen>
        <Stack.Screen
          name="food-entry"
          options={{
            headerShown: false,
          }}
        >
          {() => <FoodEntryScreen />}
        </Stack.Screen>
        <Stack.Screen name="signup" options={{ headerShown: false }}>
          {() => <Signup />}
        </Stack.Screen>
        <Stack.Screen
          name="editprofile"
          options={{
            headerShown: false,
          }}
        >
          {() => <EditProfile />}
        </Stack.Screen>
        <Stack.Screen
          name="agenda"
          options={{
            headerShown: false,
          }}
        >
          {() => <AgendaScreen />}
        </Stack.Screen>
        <Stack.Screen
          name="ScanScreen"
          options={{
            headerShown: false,
          }}
        >
          {() => <ScanScreen />}
        </Stack.Screen>
        {/* Register the landing screen here */}
        <Stack.Screen
          name="landing"
          component={LandingScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
