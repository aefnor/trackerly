import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function MainPageButton() {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate("landing")}
      activeOpacity={0.86}
    >
      <Ionicons name="chevron-back" size={18} color="#168A68" />
      <Text style={styles.text}>Back to Today</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    maxWidth: 430,
    minHeight: 42,
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#BBDACB",
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  text: {
    color: "#168A68",
    fontSize: 14,
    fontWeight: "800",
    lineHeight: 18,
    marginLeft: 4,
  },
});
