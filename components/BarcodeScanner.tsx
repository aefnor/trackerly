import React, { useState } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import * as Haptics from "expo-haptics";

import type { OpenFoodFactsResponse } from "../types/openfoodfacts";
import IngredientDisplay from "./IngredientDisplay";

export default function BarcodeScanner() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [product, setProduct] = useState<
    OpenFoodFactsResponse["product"] | null
  >(null);

  const handleBarcodeScanned = async ({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    try {
      const res = await fetch(
        `https://world.openfoodfacts.org/api/v0/product/${data}.json`
      );
      const json: OpenFoodFactsResponse = await res.json();
      console.log(json);
      setProduct(json.product ?? null);
      console.log("Product:", json.product?.product_name || "Not found");
    } catch (e) {
      setProduct(null);
      console.error("Error fetching product:", e);
    }
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing={facing}
        onBarcodeScanned={handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["ean13", "ean8", "upc_a", "upc_e"],
        }}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
      {scanned && (
        <TouchableOpacity
          style={[styles.button, { alignSelf: "center", marginTop: 24 }]}
          onPress={() => {
            setScanned(false);
            setProduct(null);
          }}
        >
          <Text style={styles.text}>Scan Again</Text>
        </TouchableOpacity>
      )}
      {product && (
        <View style={{ padding: 16 }}>
          <Text style={{ color: "white", fontSize: 18 }}>
            Product: {product.product_name || "Unknown"}
          </Text>
          <Text style={{ color: "white", fontSize: 16 }}>
            Brand: {product.brands || "N/A"}
          </Text>
          <IngredientDisplay product={product} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
