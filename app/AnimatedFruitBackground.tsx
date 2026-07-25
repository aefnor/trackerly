import React from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function AnimatedFruitBackground({
  children,
}: {
  children?: React.ReactNode;
}) {
  React.useEffect(() => {
    if (typeof document === "undefined") return;

    const htmlOverflowX = document.documentElement.style.overflowX;
    const bodyOverflowX = document.body.style.overflowX;
    const bodyMaxWidth = document.body.style.maxWidth;

    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";
    document.body.style.maxWidth = "100vw";

    return () => {
      document.documentElement.style.overflowX = htmlOverflowX;
      document.body.style.overflowX = bodyOverflowX;
      document.body.style.maxWidth = bodyMaxWidth;
    };
  }, []);

  return (
    <LinearGradient
      colors={["#F7FAF8", "#EAF7F1", "#FFF7E8"]}
      locations={[0, 0.58, 1]}
      style={styles.background}
    >
      <View style={[styles.accentBand, styles.topBand]} />
      <View style={[styles.accentBand, styles.bottomBand]} />
      <View style={styles.content}>{children}</View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    position: "relative",
    overflow: "hidden",
    width: "100%",
  },
  content: {
    flex: 1,
    width: "100%",
    zIndex: 1,
  },
  accentBand: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 170,
    opacity: 0.45,
    transform: [{ rotate: "-8deg" }, { scaleX: 1.18 }],
  },
  topBand: {
    top: -92,
    backgroundColor: "#BFEAD7",
  },
  bottomBand: {
    bottom: -104,
    backgroundColor: "#FFE1A8",
  },
});
