import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { router } from "expo-router";
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
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
          component={() => <Index />}
          // options={({ navigation }: { navigation: any }) => ({
          //   header: () => (
          //     <CustomHeader
          //       navigation={navigation}
          //       title="Sign Up"
          //       path="/signup"
          //       hideLeftButton={true}
          //     />
          //   ),
          // })}
        />
        <Stack.Screen name="profile" component={() => <ProfileScreen />} />
        <Stack.Screen
          name="signin"
          component={() => <SignInScreen />}
          // options={({ navigation }: { navigation: any }) => ({
          //   header: () => (
          //     <CustomHeader
          //       navigation={navigation}
          //       title="Sign Up"
          //       path="/signup"
          //     />
          //   ),
          // })}
        />
        <Stack.Screen
          name="food-entry"
          options={{
            headerShown: false,
          }}
          component={() => <FoodEntryScreen />}
          // options={({ navigation }: { navigation: any }) => ({
          //   header: () => (
          //     <CustomHeader
          //       navigation={navigation}
          //       title="Food Entry"
          //       path="/food-entry"
          //     />
          //   ),
          // })}
        />
        <Stack.Screen
          name="signup"
          component={() => <Signup />}
          options={({ navigation }: { navigation: any }) => ({
            header: () => (
              <CustomHeader
                navigation={navigation}
                title="Sign Up"
                path="/signup"
                hideRightButton={true}
              />
            ),
          })}
        />
        <Stack.Screen
          name="agenda"
          component={() => <AgendaScreen />}
          options={({ navigation }: { navigation: any }) => ({
            header: () => (
              <CustomHeader
                navigation={navigation}
                title="Agenda"
                path="/agenda"
              />
            ),
          })}
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
