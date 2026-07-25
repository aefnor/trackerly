import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import AnimatedFruitBackground from "./AnimatedFruitBackground";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

interface ActionItemProps {
  icon: IconName;
  title: string;
  description: string;
  color: string;
  onPress: () => void;
}

function ActionItem({
  icon,
  title,
  description,
  color,
  onPress,
}: ActionItemProps) {
  return (
    <TouchableOpacity
      style={styles.actionItem}
      onPress={onPress}
      activeOpacity={0.86}
    >
      <View style={[styles.actionIcon, { backgroundColor: color }]}>
        <Ionicons name={icon} size={22} color="#FFFFFF" />
      </View>
      <View style={styles.actionText}>
        <Text style={styles.actionTitle}>{title}</Text>
        <Text style={styles.actionDescription}>{description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#7C9188" />
    </TouchableOpacity>
  );
}

export default function LandingScreen() {
  const navigation = useNavigation<any>();

  const handleSignOut = async () => {
    await AsyncStorage.removeItem("token");
    navigation.reset({ index: 0, routes: [{ name: "signin" }] });
  };

  return (
    <AnimatedFruitBackground>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.kicker}>Trackerly</Text>
          <Text style={styles.title}>Today</Text>
          <Text style={styles.subtitle}>
            Keep meals, scans, and profile details close at hand.
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>0</Text>
            <Text style={styles.summaryLabel}>Meals</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>0</Text>
            <Text style={styles.summaryLabel}>Scans</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>--</Text>
            <Text style={styles.summaryLabel}>Calories</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <ActionItem
            icon="barcode-outline"
            title="Scan barcode"
            description="Look up packaged foods fast."
            color="#168A68"
            onPress={() => navigation.navigate("ScanScreen")}
          />
          <ActionItem
            icon="restaurant-outline"
            title="Food entry"
            description="Add a meal or describe what you ate."
            color="#E06D2F"
            onPress={() => navigation.navigate("food-entry")}
          />
          <ActionItem
            icon="calendar-outline"
            title="Agenda"
            description="Review entries by day."
            color="#3D74B6"
            onPress={() => navigation.navigate("agenda")}
          />
          <ActionItem
            icon="person-outline"
            title="Profile"
            description="Manage your account details."
            color="#C64D6D"
            onPress={() => navigation.navigate("profile")}
          />
        </View>

        <TouchableOpacity
          style={styles.signOutButton}
          onPress={handleSignOut}
          activeOpacity={0.86}
        >
          <Ionicons name="log-out-outline" size={20} color="#7A271A" />
          <Text style={styles.signOutText}>Sign out</Text>
        </TouchableOpacity>
      </ScrollView>
    </AnimatedFruitBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 18,
    paddingTop: 42,
    paddingBottom: 28,
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
    fontSize: 38,
    fontWeight: "800",
    lineHeight: 44,
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
  summaryRow: {
    width: "100%",
    maxWidth: 430,
    flexDirection: "row",
    gap: 10,
    marginBottom: 18,
  },
  summaryItem: {
    flex: 1,
    minHeight: 78,
    borderRadius: 8,
    borderColor: "#D9E8DF",
    borderWidth: 1,
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    paddingHorizontal: 12,
    paddingVertical: 12,
    justifyContent: "center",
  },
  summaryValue: {
    color: "#18352B",
    fontSize: 23,
    fontWeight: "800",
    lineHeight: 28,
  },
  summaryLabel: {
    color: "#647970",
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
    marginTop: 2,
  },
  actions: {
    width: "100%",
    maxWidth: 430,
    gap: 12,
  },
  actionItem: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    borderColor: "#D9E8DF",
    borderWidth: 1,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    paddingHorizontal: 14,
    paddingVertical: 12,
    shadowColor: "#0F2E24",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  actionIcon: {
    width: 42,
    height: 42,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  actionText: {
    flex: 1,
    paddingRight: 8,
  },
  actionTitle: {
    color: "#18352B",
    fontSize: 16,
    fontWeight: "800",
    lineHeight: 21,
  },
  actionDescription: {
    color: "#647970",
    fontSize: 13,
    lineHeight: 18,
    marginTop: 2,
  },
  signOutButton: {
    width: "100%",
    maxWidth: 430,
    minHeight: 50,
    borderRadius: 8,
    borderColor: "#F4B5A6",
    borderWidth: 1,
    backgroundColor: "#FFF6F3",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    marginTop: 18,
  },
  signOutText: {
    color: "#7A271A",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0,
  },
});
