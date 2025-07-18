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

  // ...existing code...

  return (
    <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
      <LinearGradient colors={["#1e3c72", "#2a5298"]} style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="always"
            keyboardDismissMode="none"
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
          >
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
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
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
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
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
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
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
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
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
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
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
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
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
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
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
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
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
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
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
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
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
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
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
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
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
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
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
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
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
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
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
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
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
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
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
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
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
                colors={["#4caf50", "#388e3c"]}
                style={styles.submitButtonGradient}
              >
                <Text style={styles.submitButtonText}>Save Food Entry</Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#bbdefb",
    textAlign: "center",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#b3d9ff",
    textAlign: "center",
    opacity: 0.9,
  },
  aiSection: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    padding: 25,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  aiHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  aiIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  aiTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#bbdefb",
  },
  sentenceInput: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 15,
    color: "#ffffff",
    fontSize: 16,
    marginBottom: 20,
    minHeight: 60,
    textAlignVertical: "top",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  parseButton: {
    borderRadius: 12,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#2196f3",
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
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  successMessage: {
    backgroundColor: "rgba(76, 175, 80, 0.2)",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(76, 175, 80, 0.5)",
  },
  successText: {
    color: "#c8e6c9",
    textAlign: "center",
    fontSize: 16,
  },
  formSection: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#bbdefb",
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
    color: "#e3f2fd",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
    opacity: 0.9,
  },
  required: {
    color: "#ff8a80",
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    padding: 12,
    color: "#ffffff",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
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
    shadowColor: "#4caf50",
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
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
});
