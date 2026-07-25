import React from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import AnimatedFruitBackground from "../app/AnimatedFruitBackground";
import MainPageButton from "../components/MainPageButton";

function StatItem({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

export default function ProfileScreen() {
  const navigation = useNavigation<any>();

  return (
    <AnimatedFruitBackground>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.content}>
        <MainPageButton />

        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>U</Text>
          </View>
          <Text style={styles.kicker}>Profile</Text>
          <Text style={styles.title}>Your Profile</Text>
          <Text style={styles.subtitle}>Goal: Set your health goal</Text>
        </View>

        <View style={styles.statsRow}>
          <StatItem value="2000" label="Calories" />
          <StatItem value="5" label="Workouts" />
          <StatItem value="8h" label="Sleep" />
        </View>

        <View style={styles.panel}>
          <View style={styles.panelHeader}>
            <Ionicons name="today-outline" size={20} color="#168A68" />
            <Text style={styles.panelTitle}>Today</Text>
          </View>
          <DetailRow label="Breakfast" value="300 kcal" />
          <DetailRow label="Lunch" value="500 kcal" />
          <DetailRow label="Dinner" value="700 kcal" />
          <DetailRow label="Water" value="2L" />
        </View>

        <View style={styles.panel}>
          <View style={styles.panelHeader}>
            <Ionicons name="bar-chart-outline" size={20} color="#168A68" />
            <Text style={styles.panelTitle}>Weekly summary</Text>
          </View>
          <DetailRow label="Calories burned" value="14,000 kcal" />
          <DetailRow label="Steps" value="50,000" />
          <DetailRow label="Average sleep" value="7 hours" />
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate("editprofile")}
          activeOpacity={0.86}
        >
          <Ionicons name="create-outline" size={20} color="#FFFFFF" />
          <Text style={styles.primaryButtonText}>Edit profile</Text>
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
    paddingTop: 34,
    paddingBottom: 28,
  },
  header: {
    width: "100%",
    maxWidth: 430,
    alignItems: "center",
    marginBottom: 18,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#168A68",
    marginBottom: 14,
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: 0,
  },
  kicker: {
    color: "#168A68",
    fontSize: 14,
    fontWeight: "800",
    lineHeight: 18,
    marginBottom: 6,
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
    marginTop: 6,
    textAlign: "center",
  },
  statsRow: {
    width: "100%",
    maxWidth: 430,
    flexDirection: "row",
    gap: 10,
    marginBottom: 14,
  },
  statItem: {
    flex: 1,
    minHeight: 76,
    borderRadius: 8,
    borderColor: "#D9E8DF",
    borderWidth: 1,
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  statValue: {
    color: "#18352B",
    fontSize: 22,
    fontWeight: "800",
    lineHeight: 28,
  },
  statLabel: {
    color: "#647970",
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
    textAlign: "center",
  },
  panel: {
    width: "100%",
    maxWidth: 430,
    borderRadius: 8,
    borderColor: "#D9E8DF",
    borderWidth: 1,
    backgroundColor: "rgba(255, 255, 255, 0.94)",
    padding: 16,
    marginBottom: 14,
  },
  panelHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  panelTitle: {
    color: "#18352B",
    fontSize: 17,
    fontWeight: "800",
    lineHeight: 22,
  },
  detailRow: {
    minHeight: 38,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopColor: "#EAF2EE",
    borderTopWidth: 1,
  },
  detailLabel: {
    color: "#647970",
    fontSize: 14,
    lineHeight: 20,
  },
  detailValue: {
    color: "#18352B",
    fontSize: 14,
    fontWeight: "800",
    lineHeight: 20,
  },
  primaryButton: {
    width: "100%",
    maxWidth: 430,
    minHeight: 52,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#168A68",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0,
  },
});
