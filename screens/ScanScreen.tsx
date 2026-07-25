import React from "react";
import { StyleSheet, View } from "react-native";
import BarcodeScanner from "../components/BarcodeScanner";
import AnimatedFruitBackground from "../app/AnimatedFruitBackground";
import MainPageButton from "../components/MainPageButton";

const ScanScreen = () => {
  return (
    <AnimatedFruitBackground>
      <View style={styles.container}>
        <MainPageButton />
        <View style={styles.scannerFrame}>
          <BarcodeScanner />
        </View>
      </View>
    </AnimatedFruitBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 18,
    paddingTop: 26,
    paddingBottom: 18,
  },
  scannerFrame: {
    flex: 1,
    width: "100%",
    maxWidth: 430,
  },
});

export default ScanScreen;
