import React, { useRef, useEffect } from "react";
import {
  View,
  Animated,
  Text,
  StyleSheet,
  Dimensions,
  Easing,
} from "react-native";

const FRUIT_EMOJIS = ["🍌", "🍓", "🍉", "🍊", "🍎", "🍒", "🍍", "🥝", "🍑"];
const FRUIT_COUNT = 10; // Number of floating fruits
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Helper to get a random number between min/max
const rand = (min: number, max: number) => Math.random() * (max - min) + min;

function FloatingFruit({
  emoji,
  startX,
  delay,
  speed,
  size,
}: {
  emoji: string;
  startX: number;
  delay: number;
  speed: number;
  size: number;
}) {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  useEffect(() => {
    const animate = () => {
      translateY.setValue(SCREEN_HEIGHT);
      Animated.timing(translateY, {
        toValue: -size,
        duration: speed,
        delay,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start(() => animate()); // Loop forever
    };
    animate();
  }, [translateY, delay, speed, size]);

  return (
    <Animated.View
      style={[
        styles.fruit,
        {
          left: startX,
          top: 0,
          transform: [{ translateY }],
        },
      ]}
      pointerEvents="none"
    >
      <Text style={[styles.fruitText, { fontSize: size }]}>{emoji}</Text>
    </Animated.View>
  );
}

export default function AnimatedFruitBackground({
  children,
}: {
  children?: React.ReactNode;
}) {
  // Generate random fruit configs once
  const fruits = React.useMemo(() => {
    return Array.from({ length: FRUIT_COUNT }).map((_, i) => ({
      emoji: FRUIT_EMOJIS[Math.floor(Math.random() * FRUIT_EMOJIS.length)],
      startX: rand(10, SCREEN_WIDTH - 50),
      delay: rand(0, 4000),
      speed: rand(4000, 9000),
      size: rand(32, 54),
      id: i + "-" + Math.random(),
    }));
  }, []);

  return (
    <View style={styles.background}>
      {/* Fruits go behind all content */}
      {fruits.map((props, index) => (
        <FloatingFruit key={props.id} {...props} />
      ))}
      {/* Foreground content goes above fruits */}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
  },
  fruit: {
    position: "absolute",
    opacity: 0.35,
    zIndex: 0, // Behind content
  },
  fruitText: {
    // fontSize handled dynamically
    // Optional: Add a soft shadow to make them pop
    textShadowColor: "#aaa",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 2,
  },
  // content style removed
});
