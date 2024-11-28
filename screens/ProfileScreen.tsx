import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation<any>();
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#3b5998" />
      <ScrollView style={styles.container}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image
            source={require("C:/Dev/trackerly/data/Screenshot 2024-07-15 191210.png")}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userGoal}>Goal: Lose 10 lbs</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text
              style={styles.editButtonText}
              onPress={() => navigation.navigate("editprofile")}
            >
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>

        {/* Fitness Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>2000</Text>
            <Text style={styles.statLabel}>Calories</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Workouts</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Hours Sleep</Text>
          </View>
        </View>

        {/* Food & Fitness Tracking */}
        <View style={styles.trackingContainer}>
          <Text style={styles.sectionTitle}>Today's Tracking</Text>

          <View style={styles.trackingRow}>
            <Text style={styles.trackingLabel}>Breakfast</Text>
            <Text style={styles.trackingValue}>300 kcal</Text>
          </View>
          <View style={styles.trackingRow}>
            <Text style={styles.trackingLabel}>Lunch</Text>
            <Text style={styles.trackingValue}>500 kcal</Text>
          </View>
          <View style={styles.trackingRow}>
            <Text style={styles.trackingLabel}>Dinner</Text>
            <Text style={styles.trackingValue}>700 kcal</Text>
          </View>
          <View style={styles.trackingRow}>
            <Text style={styles.trackingLabel}>Water Intake</Text>
            <Text style={styles.trackingValue}>2L</Text>
          </View>
        </View>

        {/* Weekly Summary */}
        <View style={styles.summaryContainer}>
          <Text style={styles.sectionTitle}>Weekly Summary</Text>
          <Text style={styles.summaryText}>
            Total Calories Burned: 14000 kcal
          </Text>
          <Text style={styles.summaryText}>Total Steps: 50,000</Text>
          <Text style={styles.summaryText}>Average Sleep: 7 hours</Text>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  profileHeader: {
    alignItems: "center",
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
  },
  userGoal: {
    color: "#777",
    fontSize: 16,
  },
  editButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#4CAF50",
    borderRadius: 20,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  statBox: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statLabel: {
    color: "#777",
  },
  trackingContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  trackingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  trackingLabel: {
    fontSize: 16,
  },
  trackingValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  summaryContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  summaryText: {
    fontSize: 16,
    marginVertical: 2,
  },
});

export default ProfileScreen;
