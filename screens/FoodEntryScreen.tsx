import BarcodeScanner from "../components/BarcodeScanner";
import type { Product } from "../types/openfoodfacts";
import { Modal } from "react-native";
import React, { useState, useRef, useCallback, memo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// import { BlurView } from "expo-blur";
import api from "@/axios/api";

const { width } = Dimensions.get("window");

export default function FoodEntryScreen() {
  // All your existing state variables
  const [scannerVisible, setScannerVisible] = useState(false);
  const [foodName, setFoodName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [calories, setCalories] = useState("");
  const [carbohydrates, setCarbohydrates] = useState("");
  const [proteins, setProteins] = useState("");
  const [fats, setFats] = useState("");
  const [transFats, setTransFats] = useState("");
  const [fiber, setFiber] = useState("");
  const [sugar, setSugar] = useState("");
  const [cholesterol, setCholesterol] = useState("");
  const [sodium, setSodium] = useState("");
  const [saturatedFats, setSaturatedFats] = useState("");
  const [vitamins, setVitamins] = useState("");
  const [allergens, setAllergens] = useState("");
  const [dietaryTags, setDietaryTags] = useState("");
  const [customRecipes, setCustomRecipes] = useState("");
  const [favoriteFoods, setFavoriteFoods] = useState("");
  const [minerals, setMinerals] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(new Date());
  const [foodSentence, setFoodSentence] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Direct handlers for each input
  // ...existing code...

  const handleSubmit = () => {
    if (!foodName || !quantity) {
      Alert.alert("Error", "Please fill out all required fields.");
      return;
    }
    Alert.alert("Success", `Food recorded: ${foodName}`);
    // Reset form
    setFoodName("");
    setQuantity("");
    setCalories("");
    setNotes("");
  };

  const handleApiResponse = (response: any) => {
    console.log("Response from API:", response);
    setFoodName(response.food_name || "");
    setQuantity(
      `${response.portion_size?.amount || ""} ${
        response.portion_size?.unit || ""
      }`
    );
    setCalories(String(response.calories_per_portion) || "");
    setCarbohydrates(String(response.macronutrients?.carbohydrates) || "");
    setProteins(String(response.macronutrients?.proteins) || "");
    setFats(response.macronutrients?.fats || "");
    setSaturatedFats(response.fats?.saturated_fats || "");
    setTransFats(response.fats?.trans_fats || "");
    setFiber(response.fiber_content || "");
    setSugar(
      `${response.sugar?.added || ""} (added), ${
        response.sugar?.natural || ""
      } (natural)`
    );
    setCholesterol(response.cholesterol || "");
    setSodium(response.sodium || "");
    setVitamins(
      `Vitamin A: ${response.micronutrients?.vitamin_a || ""}, Vitamin C: ${
        response.micronutrients?.vitamin_c || ""
      }`
    );
    setAllergens(response.common_allergens?.join(", ") || "");
    setDietaryTags(response.dietary_tags?.join(", ") || "");
    setCustomRecipes(response.custom_recipes || "");
    setFavoriteFoods(response.favorite_foods?.join(", ") || "");
    setNotes(response.user_notes || "");
    setDate(
      response.time_and_date ? new Date(response.time_and_date) : new Date()
    );

    // Show success animation
    setShowSuccess(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => setShowSuccess(false));
    }, 3000);
  };

  const parseFoodSentence = async () => {
    if (!foodSentence.trim()) {
      Alert.alert("Error", "Please enter a food sentence first!");
      return;
    }

    setIsLoading(true);
    try {
      let res = await api.post("/analyze-food-sentence/", {
        sentence: foodSentence,
      });
      console.log(res.data.food_name_list_response);
      const data = res.data.food_name_list_response;
      handleApiResponse(data);
    } catch (error) {
      console.error("Error parsing food sentence:", error);
      Alert.alert("Error", "Failed to analyze food. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handler must be after all useState declarations
  function handleProductScanned(product: Product) {
    setFoodName(product.product_name || "");
    setQuantity(product.quantity || "");
    setCalories(product.nutriments?.energy ? String(product.nutriments.energy) : "");
    setCarbohydrates(product.nutriments?.carbohydrates ? String(product.nutriments.carbohydrates) : "");
    setProteins(product.nutriments?.proteins ? String(product.nutriments.proteins) : "");
    setFats(product.nutriments?.fat ? String(product.nutriments.fat) : "");
    setSaturatedFats(product.nutriments?.saturated_fat ? String(product.nutriments.saturated_fat) : "");
    setTransFats(""); // Not always available
    setFiber(product.nutriments?.fiber ? String(product.nutriments.fiber) : "");
    setSugar(product.nutriments?.sugars ? String(product.nutriments.sugars) : "");
    setCholesterol(product.nutriments?.cholesterol ? String(product.nutriments.cholesterol) : "");
    setSodium(product.nutriments?.sodium ? String(product.nutriments.sodium) : "");
    setVitamins(""); // Not always available
    setAllergens(product.allergens || "");
    setDietaryTags(product.labels || "");
    setCustomRecipes("");
    setFavoriteFoods("");
    setMinerals("");
    setNotes(product.ingredients_text || "");
    setDate(new Date());
    setScannerVisible(false);
  }

  return (
    <Pressable
      onPress={() => {
        if (Platform.OS !== "web") Keyboard.dismiss();
      }}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={[styles.scrollContent, { flexGrow: 1 }]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Barcode Scanner Button */}
            <TouchableOpacity
              style={[styles.submitButton, { marginBottom: 16 }]}
              onPress={() => setScannerVisible(true)}
            >
              <Text style={styles.submitButtonText}>Scan Barcode</Text>
            </TouchableOpacity>

            {/* Barcode Scanner Modal */}
            <Modal visible={scannerVisible} animationType="slide">
              <BarcodeScanner
                onProductScanned={handleProductScanned}
              />
              <TouchableOpacity
                style={{ alignSelf: "center", margin: 24, padding: 12, backgroundColor: "#FF474A", borderRadius: 8 }}
                onPress={() => setScannerVisible(false)}
              >
                <Text style={{ color: "white", fontSize: 18 }}>Close Scanner</Text>
              </TouchableOpacity>
            </Modal>

            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Food Tracker</Text>
              <Text style={styles.headerSubtitle}>
                Track your nutrition with AI-powered food analysis
              </Text>
            </View>

            {/* Success Message */}
            {showSuccess && (
              <Animated.View
                style={[styles.successMessage, { opacity: fadeAnim }]}
              >
                <Text style={styles.successText}>
                  Food information parsed successfully! ✨
                </Text>
              </Animated.View>
            )}

            {/* Basic Information */}
            <View style={styles.formSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>🍽️</Text>
                <Text style={styles.sectionTitle}>Basic Information</Text>
              </View>
              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>
                  Food Name <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Turkey Sandwich"
                  placeholderTextColor="#888"
                  value={foodName}
                  onChangeText={setFoodName}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onBlur={() => {
                    Keyboard.dismiss;
                  }}
                />
              </View>
              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>
                  Portions <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., 1 serving or 200g"
                  placeholderTextColor="#888"
                  value={quantity}
                  onChangeText={setQuantity}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onBlur={() => {
                    require("react-native").Keyboard.dismiss();
                  }}
                />
              </View>
            </View>

            {/* Nutrition Overview */}
            <View style={styles.formSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>📊</Text>
                <Text style={styles.sectionTitle}>Nutrition Overview</Text>
              </View>
              <View style={styles.formRow}>
                <View style={styles.formField}>
                  <Text style={styles.fieldLabel}>Calories per Portion</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., 350"
                    placeholderTextColor="#888"
                    value={calories}
                    onChangeText={setCalories}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onBlur={() => {
                      require("react-native").Keyboard.dismiss();
                    }}
                  />
                </View>
                <View style={styles.formField}>
                  <Text style={styles.fieldLabel}>Fiber (g)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., 5"
                    placeholderTextColor="#888"
                    value={fiber}
                    onChangeText={setFiber}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onBlur={() => {
                      require("react-native").Keyboard.dismiss();
                    }}
                  />
                </View>
              </View>
            </View>

            {/* Macronutrients */}
            <View style={styles.formSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>⚖️</Text>
                <Text style={styles.sectionTitle}>Macronutrients</Text>
              </View>
              <View style={styles.formRow}>
                <View style={styles.formField}>
                  <Text style={styles.fieldLabel}>Carbohydrates (g)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., 45"
                    placeholderTextColor="#888"
                    value={carbohydrates}
                    onChangeText={setCarbohydrates}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onBlur={() => {
                      require("react-native").Keyboard.dismiss();
                    }}
                  />
                </View>
                <View style={styles.formField}>
                  <Text style={styles.fieldLabel}>Proteins (g)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., 25"
                    placeholderTextColor="#888"
                    value={proteins}
                    onChangeText={setProteins}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onBlur={() => {
                      require("react-native").Keyboard.dismiss();
                    }}
                  />
                </View>
              </View>
              <View style={styles.formRow}>
                <View style={styles.formField}>
                  <Text style={styles.fieldLabel}>Saturated Fats (g)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., 3"
                    placeholderTextColor="#888"
                    value={saturatedFats}
                    onChangeText={setSaturatedFats}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onBlur={() => {
                      require("react-native").Keyboard.dismiss();
                    }}
                  />
                </View>
                <View style={styles.formField}>
                  <Text style={styles.fieldLabel}>Trans Fats (g)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., 0"
                    placeholderTextColor="#888"
                    value={transFats}
                    onChangeText={setTransFats}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onBlur={() => {
                      require("react-native").Keyboard.dismiss();
                    }}
                  />
                </View>
              </View>
              <View style={styles.formRow}>
                <View style={styles.formField}>
                  <Text style={styles.fieldLabel}>Sugar (g)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., 8"
                    placeholderTextColor="#888"
                    value={sugar}
                    onChangeText={setSugar}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onBlur={() => {
                      require("react-native").Keyboard.dismiss();
                    }}
                  />
                </View>
                <View style={styles.formField}>
                  <Text style={styles.fieldLabel}>Cholesterol (mg)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., 65"
                    placeholderTextColor="#888"
                    value={cholesterol}
                    onChangeText={setCholesterol}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onBlur={() => {
                      require("react-native").Keyboard.dismiss();
                    }}
                  />
                </View>
              </View>
            </View>

            {/* Micronutrients & Minerals */}
            <View style={styles.formSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>🧪</Text>
                <Text style={styles.sectionTitle}>
                  Micronutrients & Minerals
                </Text>
              </View>
              <View style={styles.formRow}>
                <View style={styles.formField}>
                  <Text style={styles.fieldLabel}>Sodium (mg)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., 650"
                    placeholderTextColor="#888"
                    value={sodium}
                    onChangeText={setSodium}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onBlur={() => {
                      require("react-native").Keyboard.dismiss();
                    }}
                  />
                </View>
                <View style={styles.formField}>
                  <Text style={styles.fieldLabel}>Vitamins</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., Vitamin A, C, D"
                    placeholderTextColor="#888"
                    value={vitamins}
                    onChangeText={setVitamins}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onBlur={() => {
                      require("react-native").Keyboard.dismiss();
                    }}
                  />
                </View>
              </View>
              <View style={styles.formRow}>
                <View style={styles.formField}>
                  <Text style={styles.fieldLabel}>Minerals</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., Iron, Calcium"
                    placeholderTextColor="#888"
                    value={minerals}
                    onChangeText={setMinerals}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onBlur={() => {
                      require("react-native").Keyboard.dismiss();
                    }}
                  />
                </View>
              </View>
            </View>

            {/* Dietary Information */}
            <View style={styles.formSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>🏷️</Text>
                <Text style={styles.sectionTitle}>Dietary Information</Text>
              </View>
              <View style={styles.formRow}>
                <View style={styles.formField}>
                  <Text style={styles.fieldLabel}>Allergens</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., Gluten, Dairy"
                    placeholderTextColor="#888"
                    value={allergens}
                    onChangeText={setAllergens}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onBlur={() => {
                      require("react-native").Keyboard.dismiss();
                    }}
                  />
                </View>
                <View style={styles.formField}>
                  <Text style={styles.fieldLabel}>Dietary Tags</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., Vegetarian, Low-carb"
                    placeholderTextColor="#888"
                    value={dietaryTags}
                    onChangeText={setDietaryTags}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onBlur={() => {
                      require("react-native").Keyboard.dismiss();
                    }}
                  />
                </View>
              </View>
              <View style={styles.formRow}>
                <View style={styles.formField}>
                  <Text style={styles.fieldLabel}>Custom Recipes</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Recipe name or details"
                    placeholderTextColor="#888"
                    value={customRecipes}
                    onChangeText={setCustomRecipes}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onBlur={() => {
                      require("react-native").Keyboard.dismiss();
                    }}
                  />
                </View>
                <View style={styles.formField}>
                  <Text style={styles.fieldLabel}>Favorite Foods</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Mark as favorite"
                    placeholderTextColor="#888"
                    value={favoriteFoods}
                    onChangeText={setFavoriteFoods}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onBlur={() => {
                      require("react-native").Keyboard.dismiss();
                    }}
                  />
                </View>
              </View>
            </View>

            {/* Additional Notes */}
            <View style={styles.formSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>📝</Text>
                <Text style={styles.sectionTitle}>Additional Notes</Text>
              </View>
              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Personal Notes</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Add any personal observations, meal time, or other notes..."
                  placeholderTextColor="#888"
                  value={notes}
                  onChangeText={setNotes}
                  multiline
                  autoCapitalize="none"
                  autoCorrect={false}
                  onBlur={() => {
                    require("react-native").Keyboard.dismiss();
                  }}
                />
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <LinearGradient
                colors={["#ff474aff", "#ff474aff"]}
                style={styles.submitButtonGradient}
              >
                <Text style={styles.submitButtonText}>Save Food Entry</Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 0,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 2,
    paddingVertical: 0,
    marginTop: 0,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
    opacity: 1,
  },
  aiSection: {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 16,
    padding: 25,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.25)",
  },
  aiHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  aiIcon: {
    fontSize: 24,
    marginRight: 10,
    color: "#FFB347",
  },
  aiTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  sentenceInput: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 15,
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 20,
    minHeight: 60,
    textAlignVertical: "top",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.4)",
  },
  parseButton: {
    borderRadius: 12,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#FFB347", // Matches gradient start
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  parseButtonGradient: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
  },
  parseButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  successMessage: {
    backgroundColor: "rgba(0, 194, 168, 0.15)",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(0, 194, 168, 0.5)",
  },
  successText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  formSection: {
    backgroundColor: "#FF474A", // Tropical red
    borderRadius: 18,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#FFB3B3",
    shadowColor: "#FF474A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 6,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionIcon: {
    fontSize: 20,
    marginRight: 10,
    color: "#00C2A8",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  formRow: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 15,
  },
  formField: {
    flex: 1,
  },
  fieldLabel: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
    opacity: 1,
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  required: {
    color: "#FF6B6B",
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  input: {
    backgroundColor: "#F3F4F6", // Light grey
    borderRadius: 8,
    padding: 12,
    color: "#222",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#FF474A",
    // No text shadow for better readability on light background
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  submitButton: {
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 20,
    elevation: 4,
    shadowColor: "#00C2A8", // Matches gradient end
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  submitButtonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
