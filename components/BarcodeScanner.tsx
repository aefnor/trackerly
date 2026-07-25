import React, { useMemo, useState } from "react";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import * as Haptics from "expo-haptics";
import {
  ActivityIndicator,
  Alert,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import IngredientDisplay from "./IngredientDisplay";
import type { OpenFoodFactsResponse, Product } from "../types/openfoodfacts";

type BarcodeScannerProps = {
  onProductScanned?: (product: Product) => void;
};

export default function BarcodeScanner({
  onProductScanned,
}: BarcodeScannerProps) {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [manualBarcode, setManualBarcode] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);

  const webCameraUnavailable = useMemo(() => {
    if (Platform.OS !== "web") return false;
    const secureContext =
      typeof window === "undefined" ? true : window.isSecureContext;
    const hasCameraApi =
      typeof navigator !== "undefined" &&
      Boolean(navigator.mediaDevices?.getUserMedia);
    return !secureContext || !hasCameraApi;
  }, []);

  const lookupBarcode = async (barcode: string) => {
    const trimmedBarcode = barcode.trim();
    if (!trimmedBarcode) {
      setStatusMessage("Enter a barcode first.");
      return;
    }

    setScanned(true);
    setIsLookingUp(true);
    setStatusMessage("");

    if (Platform.OS !== "web") {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }

    try {
      const res = await fetch(
        `https://world.openfoodfacts.org/api/v0/product/${trimmedBarcode}.json`
      );
      const json: OpenFoodFactsResponse = await res.json();
      const nextProduct = json.product ?? null;

      setProduct(nextProduct);
      if (nextProduct && onProductScanned) {
        onProductScanned(nextProduct);
      }
      if (!nextProduct) {
        setStatusMessage("No product found for this barcode.");
      }
    } catch (e) {
      setProduct(null);
      setStatusMessage("Could not fetch this product. Check your connection.");
      console.error("Error fetching product:", e);
    } finally {
      setIsLookingUp(false);
    }
  };

  const handleBarcodeScanned = async ({ data }: { data: string }) => {
    if (scanned) return;
    await lookupBarcode(data);
  };

  const handleRequestPermission = async () => {
    setStatusMessage("");
    try {
      const result = await requestPermission();
      if (!result.granted) {
        setStatusMessage(
          result.canAskAgain
            ? "Camera permission was not granted."
            : "Camera permission is blocked for this browser."
        );
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to request camera permission.";
      setStatusMessage(message);
      Alert.alert("Camera unavailable", message);
    }
  };

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  function resetScanner() {
    setScanned(false);
    setProduct(null);
    setStatusMessage("");
    setManualBarcode("");
  }

  const renderManualLookup = () => (
    <View style={styles.manualPanel}>
      <Text style={styles.manualTitle}>Enter barcode manually</Text>
      <Text style={styles.manualDescription}>
        Mobile web camera access requires HTTPS. You can still type or paste the
        code printed under the barcode.
      </Text>
      <TextInput
        value={manualBarcode}
        onChangeText={setManualBarcode}
        placeholder="Example: 737628064502"
        placeholderTextColor="#8A9590"
        keyboardType="number-pad"
        autoCapitalize="none"
        style={styles.input}
      />
      <TouchableOpacity
        style={[styles.primaryButton, isLookingUp && styles.disabledButton]}
        onPress={() => lookupBarcode(manualBarcode)}
        activeOpacity={0.86}
        disabled={isLookingUp}
      >
        {isLookingUp ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.primaryButtonText}>Look up barcode</Text>
        )}
      </TouchableOpacity>
    </View>
  );

  if (!permission) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator color="#168A68" />
        <Text style={styles.helperText}>Checking camera access...</Text>
      </View>
    );
  }

  if (webCameraUnavailable) {
    return (
      <View style={styles.centeredContainer}>
        <View style={styles.noticePanel}>
          <Text style={styles.noticeTitle}>Camera unavailable on this web link</Text>
          <Text style={styles.noticeText}>
            Browsers block camera access from non-HTTPS pages like the current
            Tailscale Metro URL.
          </Text>
        </View>
        {renderManualLookup()}
        {statusMessage ? <Text style={styles.statusText}>{statusMessage}</Text> : null}
        {product ? <ProductDetails product={product} /> : null}
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.centeredContainer}>
        <View style={styles.noticePanel}>
          <Text style={styles.noticeTitle}>Camera permission needed</Text>
          <Text style={styles.noticeText}>
            Grant camera access to scan product barcodes.
          </Text>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleRequestPermission}
            activeOpacity={0.86}
          >
            <Text style={styles.primaryButtonText}>Grant permission</Text>
          </TouchableOpacity>
        </View>
        {renderManualLookup()}
        {statusMessage ? <Text style={styles.statusText}>{statusMessage}</Text> : null}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing={facing}
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["ean13", "ean8", "upc_a", "upc_e"],
        }}
      />

      <View pointerEvents="none" style={styles.scanFrame}>
        <View style={styles.scanBox} />
        <Text style={styles.scanHint}>Align the barcode inside the frame</Text>
      </View>

      <View style={styles.cameraControls}>
        <TouchableOpacity style={styles.secondaryButton} onPress={toggleCameraFacing}>
          <Text style={styles.secondaryButtonText}>Flip camera</Text>
        </TouchableOpacity>
        {scanned ? (
          <TouchableOpacity style={styles.primaryButton} onPress={resetScanner}>
            <Text style={styles.primaryButtonText}>Scan again</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.bottomSheet}>
        {renderManualLookup()}
        {statusMessage ? <Text style={styles.statusText}>{statusMessage}</Text> : null}
        {product ? <ProductDetails product={product} /> : null}
      </View>
    </View>
  );
}

function ProductDetails({ product }: { product: Product }) {
  return (
    <View style={styles.productPanel}>
      <Text style={styles.productTitle}>{product.product_name || "Unknown product"}</Text>
      <Text style={styles.productMeta}>{product.brands || "Brand unavailable"}</Text>
      <IngredientDisplay product={product} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071411",
  },
  centeredContainer: {
    flex: 1,
    backgroundColor: "#F7FAF8",
    padding: 18,
    justifyContent: "center",
  },
  helperText: {
    color: "#49645A",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 12,
    textAlign: "center",
  },
  noticePanel: {
    borderRadius: 8,
    borderColor: "#D9E8DF",
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
    marginBottom: 14,
  },
  noticeTitle: {
    color: "#18352B",
    fontSize: 20,
    fontWeight: "800",
    lineHeight: 26,
    marginBottom: 8,
  },
  noticeText: {
    color: "#49645A",
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 14,
  },
  manualPanel: {
    borderRadius: 8,
    borderColor: "#D9E8DF",
    borderWidth: 1,
    backgroundColor: "rgba(255, 255, 255, 0.96)",
    padding: 14,
  },
  manualTitle: {
    color: "#18352B",
    fontSize: 16,
    fontWeight: "800",
    lineHeight: 21,
    marginBottom: 4,
  },
  manualDescription: {
    color: "#647970",
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 12,
  },
  input: {
    height: 48,
    borderColor: "#C9DDD3",
    borderWidth: 1,
    borderRadius: 8,
    color: "#18352B",
    fontSize: 16,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: "#FFFFFF",
  },
  primaryButton: {
    minHeight: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#168A68",
    paddingHorizontal: 14,
  },
  disabledButton: {
    opacity: 0.72,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0,
  },
  secondaryButton: {
    minHeight: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    paddingHorizontal: 14,
  },
  secondaryButtonText: {
    color: "#18352B",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0,
  },
  statusText: {
    color: "#B42318",
    fontSize: 13,
    lineHeight: 18,
    marginTop: 10,
  },
  scanFrame: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
  },
  scanBox: {
    width: "100%",
    maxWidth: 340,
    aspectRatio: 1.6,
    borderColor: "#FFFFFF",
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
  },
  scanHint: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20,
    marginTop: 12,
    textAlign: "center",
  },
  cameraControls: {
    position: "absolute",
    top: 18,
    left: 18,
    right: 18,
    flexDirection: "row",
    gap: 10,
  },
  bottomSheet: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 12,
  },
  productPanel: {
    borderRadius: 8,
    borderColor: "#D9E8DF",
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    padding: 14,
    marginTop: 10,
  },
  productTitle: {
    color: "#18352B",
    fontSize: 18,
    fontWeight: "800",
    lineHeight: 24,
  },
  productMeta: {
    color: "#647970",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 2,
  },
});
