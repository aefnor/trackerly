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
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// import { BlurView } from "expo-blur";
import api from "@/axios/api";
import AnimatedFruitBackground from "../app/AnimatedFruitBackground";
import MainPageButton from "../components/MainPageButton";

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
  const [novaGroup, setNovaGroup] = useState("");
  const [ecoscoreGrade, setEcoscoreGrade] = useState("");
  const [nutriscoreGrade, setNutriscoreGrade] = useState("");
  const [packaging, setPackaging] = useState("");
  const [traces, setTraces] = useState("");
  const [countriesTags, setCountriesTags] = useState("");
  const [productId, setProductId] = useState("");
  const [productNameEn, setProductNameEn] = useState("");
  const [brandsTags, setBrandsTags] = useState("");
  const [categories, setCategories] = useState("");
  const [categoriesTags, setCategoriesTags] = useState("");
  const [labelsField, setLabelsField] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageSmallUrl, setImageSmallUrl] = useState("");
  const [lang, setLang] = useState("");
  const [url, setUrl] = useState("");
  const [barcode, setBarcode] = useState("");
  // Nutriments
  const [energyKcal, setEnergyKcal] = useState("");
  const [energyKcal100g, setEnergyKcal100g] = useState("");
  const [fat100g, setFat100g] = useState("");
  const [saturatedFat100g, setSaturatedFat100g] = useState("");
  const [carbohydrates100g, setCarbohydrates100g] = useState("");
  const [sugars100g, setSugars100g] = useState("");
  const [fiber100g, setFiber100g] = useState("");
  const [proteins100g, setProteins100g] = useState("");
  const [salt, setSalt] = useState("");
  const [salt100g, setSalt100g] = useState("");
  const [sodium100g, setSodium100g] = useState("");

  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Direct handlers for each input
  // ...existing code...

  const parseNumber = (value: string) => {
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  };

  const splitList = (value: string) =>
    value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

  const handleSubmit = async () => {
    if (!foodName || !quantity) {
      Alert.alert("Error", "Please fill out all required fields.");
      return;
    }

    try {
      await api.post("/food-entry/", {
        food_name: foodName,
        category: category || undefined,
        date: date.toISOString(),
        portion_size: { amount: quantity },
        calories: parseNumber(calories),
        macronutrients: {
          carbohydrates: parseNumber(carbohydrates),
          proteins: parseNumber(proteins),
          fats: parseNumber(fats),
        },
        micronutrients: {
          vitamins: vitamins || undefined,
          minerals: minerals || undefined,
        },
        fiber_content: fiber || undefined,
        sugar: { total: sugar || undefined },
        cholesterol: cholesterol || undefined,
        sodium: sodium || undefined,
        fats: {
          total: parseNumber(fats),
          saturated_fats: parseNumber(saturatedFats),
          trans_fats: parseNumber(transFats),
        },
        common_allergens: splitList(allergens),
        dietary_tags: splitList(dietaryTags),
        custom_recipes: customRecipes ? { notes: customRecipes } : undefined,
        user_notes: notes || undefined,
        barcode_scanner: barcode || undefined,
        offline_mode: false,
      });

      Alert.alert("Success", `Food recorded: ${foodName}`);
      setFoodName("");
      setCategory("");
      setQuantity("");
      setCalories("");
      setCarbohydrates("");
      setProteins("");
      setFats("");
      setTransFats("");
      setFiber("");
      setSugar("");
      setCholesterol("");
      setSodium("");
      setSaturatedFats("");
      setVitamins("");
      setAllergens("");
      setDietaryTags("");
      setCustomRecipes("");
      setFavoriteFoods("");
      setMinerals("");
      setNotes("");
      setBarcode("");
    } catch (error) {
      console.error("Error creating food entry:", error);
      Alert.alert("Error", "Failed to record food.");
    }
  };

  const handleApiResponse = (response: any) => {
    console.log("Response from API:", response);
    setFoodName(response.food_name || "");
    setCategory(response.category || "");
    setQuantity(
      `${response.portion_size?.amount || ""} ${
        response.portion_size?.unit || ""
      }`
    );
    setCalories(
      response.calories_per_portion != null
        ? String(response.calories_per_portion)
        : ""
    );
    setCarbohydrates(
      response.macronutrients?.carbohydrates != null
        ? String(response.macronutrients.carbohydrates)
        : ""
    );
    setProteins(
      response.macronutrients?.proteins != null
        ? String(response.macronutrients.proteins)
        : ""
    );
    setFats(
      response.macronutrients?.fats != null
        ? String(response.macronutrients.fats)
        : ""
    );
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
    setCustomRecipes(
      Array.isArray(response.custom_recipes)
        ? response.custom_recipes
            .map((recipe: any) =>
              typeof recipe === "string" ? recipe : recipe?.name
            )
            .filter(Boolean)
            .join(", ")
        : response.custom_recipes || ""
    );
    setFavoriteFoods(response.favorite_foods?.join(", ") || "");
    setNotes(
      [response.user_notes, response.estimated ? "Nutrition is estimated." : ""]
        .filter(Boolean)
        .join(" ")
    );
    setDate(
      response.time_and_date ? new Date(response.time_and_date) : new Date()
    );
    setNovaGroup(response.nova_group ? String(response.nova_group) : "");
    setEcoscoreGrade(response.ecoscore_grade || "");
    setNutriscoreGrade(response.nutriscore_grade || "");
    setPackaging(response.packaging || "");
    setTraces(response.traces || "");
    setCountriesTags(
      response.countries_tags ? response.countries_tags.join(", ") : ""
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
    console.log("Scanned product:", JSON.stringify(product));
    setProductId(product.id || "");
    setProductNameEn(product.product_name_en || "");
    setBrandsTags(product.brands_tags ? product.brands_tags.join(", ") : "");
    setCategories(product.categories || "");
    setCategoriesTags(
      product.categories_tags ? product.categories_tags.join(", ") : ""
    );
    setLabelsField(product.labels || "");
    setImageUrl(product.image_url || "");
    setImageSmallUrl(product.image_small_url || "");
    setLang(product.lang || "");
    setUrl(product.url || "");
    setBarcode(product.code || "");
    setEnergyKcal(
      product.nutriments?.["energy-kcal"]
        ? String(product.nutriments["energy-kcal"])
        : ""
    );
    setEnergyKcal100g(
      product.nutriments?.["energy-kcal_100g"]
        ? String(product.nutriments["energy-kcal_100g"])
        : ""
    );
    setFat100g(
      product.nutriments?.["fat_100g"]
        ? String(product.nutriments["fat_100g"])
        : ""
    );
    setSaturatedFat100g(
      product.nutriments?.["saturated-fat_100g"]
        ? String(product.nutriments["saturated-fat_100g"])
        : ""
    );
    setCarbohydrates100g(
      product.nutriments?.["carbohydrates_100g"]
        ? String(product.nutriments["carbohydrates_100g"])
        : ""
    );
    setSugars100g(
      product.nutriments?.["sugars_100g"]
        ? String(product.nutriments["sugars_100g"])
        : ""
    );
    setFiber100g(
      product.nutriments?.["fiber_100g"]
        ? String(product.nutriments["fiber_100g"])
        : ""
    );
    setProteins100g(
      product.nutriments?.["proteins_100g"]
        ? String(product.nutriments["proteins_100g"])
        : ""
    );
    setSalt(product.nutriments?.salt ? String(product.nutriments.salt) : "");
    setSalt100g(
      product.nutriments?.["salt_100g"]
        ? String(product.nutriments["salt_100g"])
        : ""
    );
    setSodium100g(
      product.nutriments?.["sodium_100g"]
        ? String(product.nutriments["sodium_100g"])
        : ""
    );
    // ...existing mapping...
    setFoodName(product.product_name || "");
    setQuantity(product.quantity || "");
    setCalories(
      product.nutriments?.energy_value
        ? String(product.nutriments.energy_value)
        : ""
    );
    setCarbohydrates(
      product.nutriments?.carbohydrates
        ? String(product.nutriments.carbohydrates)
        : ""
    );
    setProteins(
      product.nutriments?.proteins ? String(product.nutriments.proteins) : ""
    );
    setFats(product.nutriments?.fat ? String(product.nutriments.fat) : "");
    setSaturatedFats(
      product.nutriments?.saturated_fat
        ? String(product.nutriments.saturated_fat)
        : ""
    );
    setTransFats(""); // Not always available
    setFiber(product.nutriments?.fiber ? String(product.nutriments.fiber) : "");
    setSugar(
      product.nutriments?.sugars ? String(product.nutriments.sugars) : ""
    );
    setCholesterol(
      product.nutriments?.cholesterol
        ? String(product.nutriments.cholesterol)
        : ""
    );
    setSodium(
      product.nutriments?.sodium ? String(product.nutriments.sodium) : ""
    );
    setVitamins(""); // Not always available
    setAllergens(product.allergens || "");
    setDietaryTags(product.labels || "");
    setCustomRecipes("");
    setFavoriteFoods("");
    setMinerals("");
    setNotes(product.ingredients_text || "");
    setDate(new Date());
    setNovaGroup(product.nova_group ? String(product.nova_group) : "");
    setEcoscoreGrade(product.ecoscore_grade || "");
    setNutriscoreGrade(product.nutriscore_grade || "");
    setPackaging(product.packaging || "");
    setTraces(product.traces || "");
    setCountriesTags(
      product.countries_tags ? product.countries_tags.join(", ") : ""
    );
    setScannerVisible(false);
  }

  return (
    <AnimatedFruitBackground>
      <Pressable
        onPress={() => {
          if (Platform.OS !== "web") Keyboard.dismiss();
        }}
        style={styles.pressable}
      >
        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardView}
          >
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
            <MainPageButton />

            <View style={styles.pageHeader}>
              <Text style={styles.kicker}>Trackerly</Text>
              <Text style={styles.pageTitle}>Food entry</Text>
              <Text style={styles.pageSubtitle}>
                Scan a barcode or enter nutrition details in one centered flow.
              </Text>
            </View>

            <View style={styles.aiSection}>
              <View style={styles.aiHeader}>
                <Text style={styles.aiIcon}>NL</Text>
                <Text style={styles.aiTitle}>Natural language entry</Text>
              </View>
              <TextInput
                style={styles.sentenceInput}
                placeholder="I had a large iced dirty chai from Cartel Coffee Co with whole milk"
                placeholderTextColor="#8A9590"
                value={foodSentence}
                onChangeText={setFoodSentence}
                multiline
                autoCapitalize="sentences"
              />
              <TouchableOpacity
                style={styles.parseButton}
                onPress={parseFoodSentence}
                activeOpacity={0.86}
                disabled={isLoading}
              >
                <LinearGradient
                  colors={["#168A68", "#0E6F55"]}
                  style={styles.parseButtonGradient}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text style={styles.parseButtonText}>
                      Fill form from sentence
                    </Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Barcode Scanner Button */}
            <TouchableOpacity
              style={[styles.secondaryActionButton, { marginBottom: 16 }]}
              onPress={() => setScannerVisible(true)}
            >
              <Text style={styles.secondaryActionText}>Scan Barcode</Text>
            </TouchableOpacity>

            {/* Barcode Scanner Modal */}
            <Modal visible={scannerVisible} animationType="slide">
              <BarcodeScanner onProductScanned={handleProductScanned} />
              <TouchableOpacity
                style={{
                  alignSelf: "center",
                  margin: 24,
                  padding: 12,
                  backgroundColor: "#168A68",
                  borderRadius: 8,
                }}
                onPress={() => setScannerVisible(false)}
              >
                <Text style={{ color: "white", fontSize: 18 }}>
                  Close Scanner
                </Text>
              </TouchableOpacity>
            </Modal>

            {/* Barcode & Product Info */}
            <View style={styles.formSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>🔎</Text>
                <Text style={styles.sectionTitle}>Barcode & Product Info</Text>
              </View>
              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Barcode</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., 1234567890123"
                  placeholderTextColor="#888"
                  value={barcode}
                  onChangeText={setBarcode}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Product Name (EN)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Product Name in English"
                  placeholderTextColor="#888"
                  value={productNameEn}
                  onChangeText={setProductNameEn}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Brands</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Brand1, Brand2"
                  placeholderTextColor="#888"
                  value={brandsTags}
                  onChangeText={setBrandsTags}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Categories</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Snacks, Biscuits"
                  placeholderTextColor="#888"
                  value={categories}
                  onChangeText={setCategories}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Categories Tags</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., en:snacks, en:biscuits"
                  placeholderTextColor="#888"
                  value={categoriesTags}
                  onChangeText={setCategoriesTags}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Labels</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Organic, Gluten-Free"
                  placeholderTextColor="#888"
                  value={labelsField}
                  onChangeText={setLabelsField}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Packaging</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Plastic, Box"
                  placeholderTextColor="#888"
                  value={packaging}
                  onChangeText={setPackaging}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Traces</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Nuts, Soy"
                  placeholderTextColor="#888"
                  value={traces}
                  onChangeText={setTraces}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Countries Tags</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., en:united-states, en:canada"
                  placeholderTextColor="#888"
                  value={countriesTags}
                  onChangeText={setCountriesTags}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Language</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., en"
                  placeholderTextColor="#888"
                  value={lang}
                  onChangeText={setLang}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Product URL</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., https://world.openfoodfacts.org/product/1234567890123"
                  placeholderTextColor="#888"
                  value={url}
                  onChangeText={setUrl}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            <View style={styles.formSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>🖼️</Text>
                <Text style={styles.sectionTitle}>Product Images</Text>
              </View>
              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Image URL</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., https://.../image.jpg"
                  placeholderTextColor="#888"
                  value={imageUrl}
                  onChangeText={setImageUrl}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                {imageUrl ? (
                  <View style={{ alignItems: "center", marginTop: 8 }}>
                    <Text style={{ color: "#526A60", marginBottom: 4 }}>
                      Preview:
                    </Text>
                    {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
                    <Image
                      source={{ uri: imageUrl }}
                      style={{
                        width: 120,
                        height: 120,
                        borderRadius: 8,
                        backgroundColor: "#eee",
                      }}
                    />
                  </View>
                ) : null}
              </View>
              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Image Small URL</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., https://.../image-small.jpg"
                  placeholderTextColor="#888"
                  value={imageSmallUrl}
                  onChangeText={setImageSmallUrl}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                {imageSmallUrl ? (
                  <View style={{ alignItems: "center", marginTop: 8 }}>
                    <Text style={{ color: "#526A60", marginBottom: 4 }}>
                      Preview:
                    </Text>
                    {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
                    <Image
                      source={{ uri: imageSmallUrl }}
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 8,
                        backgroundColor: "#eee",
                      }}
                    />
                  </View>
                ) : null}
              </View>
            </View>

            {/* Ingredient Section */}
            <View style={styles.formSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>🥗</Text>
                <Text style={styles.sectionTitle}>Ingredients</Text>
              </View>
              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Ingredients (Raw Text)</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="e.g., Water, Sugar, Wheat Flour, ..."
                  placeholderTextColor="#888"
                  value={notes}
                  onChangeText={setNotes}
                  multiline
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            <View style={styles.formSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>🧬</Text>
                <Text style={styles.sectionTitle}>
                  Advanced Nutrition (per 100g)
                </Text>
              </View>
              <View style={styles.formRow}>
                <View style={styles.formField}>
                  <Text style={styles.fieldLabel}>Energy (kcal)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., 350"
                    placeholderTextColor="#888"
                    value={energyKcal}
                    onChangeText={setEnergyKcal}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
                <View style={styles.formField}>
                  <Text style={styles.fieldLabel}>Energy (kcal/100g)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., 400"
                    placeholderTextColor="#888"
                    value={energyKcal100g}
                    onChangeText={setEnergyKcal100g}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </View>
              <View style={styles.formRow}>
                <View style={styles.formField}>
                  <Text style={styles.fieldLabel}>Fat (100g)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., 10"
                    placeholderTextColor="#888"
                    value={fat100g}
                    onChangeText={setFat100g}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
                <View style={styles.formField}>
                  <Text style={styles.fieldLabel}>Saturated Fat (100g)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., 3"
                    placeholderTextColor="#888"
                    value={saturatedFat100g}
                    onChangeText={setSaturatedFat100g}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </View>
              <View style={styles.formRow}>
                <View style={styles.formField}>
                  <Text style={styles.fieldLabel}>Carbohydrates (100g)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., 45"
                    placeholderTextColor="#888"
                    value={carbohydrates100g}
                    onChangeText={setCarbohydrates100g}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
                <View style={styles.formField}>
                  <Text style={styles.fieldLabel}>Sugars (100g)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., 8"
                    placeholderTextColor="#888"
                    value={sugars100g}
                    onChangeText={setSugars100g}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </View>
              <View style={styles.formRow}>
                <View style={styles.formField}>
                  <Text style={styles.fieldLabel}>Fiber (100g)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., 5"
                    placeholderTextColor="#888"
                    value={fiber100g}
                    onChangeText={setFiber100g}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
                <View style={styles.formField}>
                  <Text style={styles.fieldLabel}>Proteins (100g)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., 25"
                    placeholderTextColor="#888"
                    value={proteins100g}
                    onChangeText={setProteins100g}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </View>
              <View style={styles.formRow}>
                <View style={styles.formField}>
                  <Text style={styles.fieldLabel}>Salt</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., 1.2"
                    placeholderTextColor="#888"
                    value={salt}
                    onChangeText={setSalt}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
                <View style={styles.formField}>
                  <Text style={styles.fieldLabel}>Salt (100g)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., 1.5"
                    placeholderTextColor="#888"
                    value={salt100g}
                    onChangeText={setSalt100g}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </View>
              <View style={styles.formRow}>
                <View style={styles.formField}>
                  <Text style={styles.fieldLabel}>Sodium (100g)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., 650"
                    placeholderTextColor="#888"
                    value={sodium100g}
                    onChangeText={setSodium100g}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </View>
            </View>

            {/* Scores Section */}
            <View style={styles.formSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>🏆</Text>
                <Text style={styles.sectionTitle}>Scores & Groups</Text>
              </View>
              <View style={styles.formRow}>
                <View style={styles.formField}>
                  <Text style={styles.fieldLabel}>Nova Group</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., 4"
                    placeholderTextColor="#888"
                    value={novaGroup}
                    onChangeText={setNovaGroup}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
                <View style={styles.formField}>
                  <Text style={styles.fieldLabel}>Ecoscore Grade</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., B"
                    placeholderTextColor="#888"
                    value={ecoscoreGrade}
                    onChangeText={setEcoscoreGrade}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
                <View style={styles.formField}>
                  <Text style={styles.fieldLabel}>Nutriscore Grade</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., A"
                    placeholderTextColor="#888"
                    value={nutriscoreGrade}
                    onChangeText={setNutriscoreGrade}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </View>
            </View>

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
                colors={["#168A68", "#0E6F55"]}
                style={styles.submitButtonGradient}
              >
                <Text style={styles.submitButtonText}>Save Food Entry</Text>
              </LinearGradient>
            </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Pressable>
    </AnimatedFruitBackground>
  );
}

const styles = StyleSheet.create({
  pressable: {
    flex: 1,
    width: "100%",
  },
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  keyboardView: {
    flex: 1,
    width: "100%",
  },
  scrollContent: {
    flexGrow: 1,
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
    paddingHorizontal: 18,
    paddingTop: 26,
    paddingBottom: 40,
  },
  pageHeader: {
    alignItems: "center",
    marginBottom: 18,
    paddingHorizontal: 8,
  },
  kicker: {
    color: "#168A68",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  pageTitle: {
    color: "#18352B",
    fontSize: 31,
    fontWeight: "900",
    lineHeight: 36,
    letterSpacing: 0,
    textAlign: "center",
  },
  pageSubtitle: {
    color: "#526A60",
    fontSize: 15,
    lineHeight: 21,
    textAlign: "center",
    marginTop: 8,
  },
  header: {
    alignItems: "center",
    marginBottom: 18,
    paddingVertical: 4,
    marginTop: 2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#18352B",
    textAlign: "center",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#526A60",
    textAlign: "center",
    opacity: 1,
  },
  aiSection: {
    backgroundColor: "rgba(255, 255, 255, 0.94)",
    borderRadius: 8,
    padding: 18,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#D9E8DF",
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
    color: "#18352B",
  },
  sentenceInput: {
    backgroundColor: "#F7FAF8",
    borderRadius: 8,
    padding: 15,
    color: "#18352B",
    fontSize: 16,
    marginBottom: 20,
    minHeight: 60,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#C9DDD3",
  },
  parseButton: {
    borderRadius: 8,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#0F2E24",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
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
    fontWeight: "800",
  },
  successMessage: {
    backgroundColor: "#ECFDF3",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#B7E4C7",
  },
  successText: {
    color: "#14532D",
    textAlign: "center",
    fontSize: 16,
  },
  formSection: {
    backgroundColor: "rgba(255, 255, 255, 0.94)",
    borderRadius: 8,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#D9E8DF",
    shadowColor: "#0F2E24",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
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
    fontWeight: "800",
    color: "#18352B",
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
    color: "#29483D",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
    opacity: 1,
  },
  required: {
    color: "#B42318",
  },
  input: {
    backgroundColor: "#F7FAF8",
    borderRadius: 8,
    padding: 12,
    color: "#18352B",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#C9DDD3",
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  secondaryActionButton: {
    minHeight: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#BBDACB",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
    shadowColor: "#0F2E24",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  secondaryActionText: {
    color: "#168A68",
    fontSize: 16,
    fontWeight: "800",
  },
  submitButton: {
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 20,
    elevation: 4,
    shadowColor: "#0F2E24",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
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
    fontWeight: "800",
  },
});
