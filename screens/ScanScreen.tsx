import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BarcodeScanner from "../components/BarcodeScanner";

const ScanScreen = () => {
  return (
    <View style={styles.container}>
      <BarcodeScanner />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScanScreen;
