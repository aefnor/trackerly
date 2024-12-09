import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ScrollView,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import api from "@/axios/api";
/**
 * Food Name
    Portion Size (grams, ounces, servings, custom units)
    Calories per portion
    Macronutrients (carbohydrates, proteins, fats)
    Micronutrients (vitamins and minerals)
    Fiber content
    Sugar (added and natural)
    Cholesterol
    Sodium
    Saturated fats and trans fats
    Common allergens (gluten, nuts, dairy, etc.)
    Dietary tags (vegan, vegetarian, keto, paleo, etc.)
    Custom recipes with aggregated nutrition
    Favorite foods list
    User notes (e.g., meal time, personal observations)
    Meal type (breakfast, lunch, dinner, snack, custom categories)
    Time and date of the meal
    Location tagging (optional)
    Barcode scanner for packaged foods
    Photo upload for visual meal tracking
    Ingredient breakdown for complex dishes
    Historical data and trends
    AI-based food or recipe recommendations
    Wearables integration (fitness trackers, smartwatches)
    Grocery list sync from favorite or frequent foods
    API support for food databases (e.g., USDA)
    Hydration tracking alongside meals
    Energy level correlation with food intake
    Symptoms tracking (e.g., GI issues, mood changes)
    Sharing options (recipes, logs)
    Progress sharing on social media
    Streaks and achievements for motivation
    Daily goals for calories and nutrients
    Graphs and charts for trends (calories, macronutrients)
    Weekly summaries of food habits
    Diet comparison to recommended guidelines
    Multi-language support
    Offline mode for food logging without internet access
*/

export default function FoodEntryScreen() {
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
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [foodSentence, setFoodSentence] = useState("");

  const handleSubmit = () => {
    if (!foodName || !category || !quantity) {
      Alert.alert("Error", "Please fill out all required fields.");
      return;
    }
    Alert.alert("Success", `Food recorded: ${foodName}`);
    // Add logic to save to storage or backend here.
    setFoodName("");
    setCategory("");
    setQuantity("");
    setCalories("");
    setNotes("");
  };

  const handleApiResponse = (response) => {
    console.log("Response from API:", response);
    setFoodName(response.food_name || "");
    setQuantity(
      `${response.portion_size?.amount || ""} ${
        response.portion_size?.unit || ""
      }`
    );
    setCalories(response.calories_per_portion || "");
    setCarbohydrates(response.macronutrients?.carbohydrates || "");
    setProteins(response.macronutrients?.proteins || "");
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
    setSaturatedFats(response.fats?.saturated_fats || "");
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
  };
  console.log("Calories:", calories);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Food Tracker</Text>

      <Text>Say or Type a Sentence about what you ate</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., I ate a turkey sandwich for lunch"
        placeholderTextColor="#808080"
        value={foodSentence}
        onChangeText={setFoodSentence}
      />
      {/* space */}
      <View style={{ marginBottom: "10%" }}>
        <Button
          title="Parse Sentence"
          onPress={async () => {
            // api request to  /analyze-food-sentence/
            let res = await api.post("/analyze-food-sentence/", {
              sentence: foodSentence,
            });
            console.log(res.data.food_name_list_response);
            // Assuming the API returns data in the same format as the dummy data example
            const data = res.data.food_name_list_response;
            console.log("Response from API:", data);

            handleApiResponse(data);
          }}
        />
      </View>

      {/* Food Name */}
      {/* <TextInput
        style={styles.input}
        placeholder="Food Name"
        placeholderTextColor="#000"
        value={foodName}
        onChangeText={setFoodName}
      /> */}

      {/* Category Picker */}
      {/* <RNPickerSelect
        onValueChange={(value) => setCategory(value)}
        items={[
          { label: "Breakfast", value: "Breakfast" },
          { label: "Lunch", value: "Lunch" },
          { label: "Dinner", value: "Dinner" },
          { label: "Snack", value: "Snack" },
        ]}
        style={pickerSelectStyles}
        placeholder={{ label: "Select Category", value: "", color: "#000" }}
      /> */}

      {/* Date Picker */}
      {/* <View style={styles.datePickerContainer}>
        <Button
          title="Pick Date & Time"
          onPress={() => setShowDatePicker(true)}
        />
        <Text>{date.toLocaleString()}</Text>
      </View>
      {showDatePicker && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          }}
        >
          <DateTimePicker
            value={date}
            style={{ justifyContent: "center", alignItems: "center" }}
            mode="datetime"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setDate(selectedDate);
            }}
          />
        </View>
      )} */}
      {/* Quantity */}
      <Text style={styles.label}>Food Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Turkey Sandwich"
        keyboardType="default"
        placeholderTextColor="#000"
        value={foodName}
        onChangeText={setFoodName}
      />
      {/* Quantity */}
      <Text style={styles.label}>Quantity</Text>
      <TextInput
        style={styles.input}
        placeholder="Quantity (e.g., 1 serving or 200 grams)"
        keyboardType="default"
        placeholderTextColor="#000"
        value={quantity}
        onChangeText={setQuantity}
      />

      {/* Calories */}
      <Text style={styles.label}>Calories Per Portion (Optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Calories Per Portion (Optional)"
        keyboardType="default"
        placeholderTextColor="#000"
        value={calories}
        onChangeText={setCalories}
      />

      {/* Macronutrients */}

      {/* Carbohydrates */}
      <Text style={styles.label}>Carbohydrates (g)</Text>
      <TextInput
        style={styles.input}
        placeholder="Carbohydrates (g)"
        keyboardType="default"
        placeholderTextColor="#000"
        value={carbohydrates}
        onChangeText={setCarbohydrates}
      />
      {/* Proteins */}
      <Text style={styles.label}>Proteins (g)</Text>
      <TextInput
        style={styles.input}
        placeholder="Proteins (g)"
        keyboardType="default"
        placeholderTextColor="#000"
        value={proteins}
        onChangeText={setProteins}
      />
      {/* Fats */}
      {/* <Text style={styles.label}>Fats (g)</Text>
      <TextInput
        style={styles.input}
        placeholder="Fats (g)"
        keyboardType="numeric"
        placeholderTextColor="#000"
        value={fats}
        onChangeText={setFats}
      /> */}

      <Text style={styles.label}>Saturated Fats (g)</Text>
      <TextInput
        style={styles.input}
        placeholder="Saturated Fats (g)"
        keyboardType="numeric"
        placeholderTextColor="#000"
        value={saturatedFats}
        onChangeText={setSaturatedFats}
      />
      <Text style={styles.label}>{`Trans Fats (g)`}</Text>
      <TextInput
        style={styles.input}
        placeholder="Trans Fats (g)"
        keyboardType="numeric"
        placeholderTextColor="#000"
        value={transFats}
        onChangeText={setTransFats}
      />

      {/* Fiber */}
      <Text style={styles.label}>Fiber (g)</Text>
      <TextInput
        style={styles.input}
        placeholder="Fiber (g)"
        keyboardType="numeric"
        placeholderTextColor="#000"
        value={fiber}
        onChangeText={setFiber}
      />

      {/* Sugar */}
      <Text style={styles.label}>Sugar (g)</Text>
      <TextInput
        style={styles.input}
        placeholder="Sugar (g)"
        keyboardType="numeric"
        placeholderTextColor="#000"
        value={sugar}
        onChangeText={setSugar}
      />
      {/* Cholesterol */}
      <Text style={styles.label}>Cholesterol (mg)</Text>
      <TextInput
        style={styles.input}
        placeholder="Cholesterol (mg)"
        keyboardType="numeric"
        placeholderTextColor="#000"
        value={cholesterol}
        onChangeText={setCholesterol}
      />
      {/* Sodium */}
      <Text style={styles.label}>Sodium (mg)</Text>
      <TextInput
        style={styles.input}
        placeholder="Sodium (mg)"
        keyboardType="numeric"
        placeholderTextColor="#000"
        value={sodium}
        onChangeText={setSodium}
      />
      {/* Saturated Fats */}
      <Text style={styles.label}>Saturated Fats (g)</Text>
      <TextInput
        style={styles.input}
        placeholder="Saturated Fats (g)"
        keyboardType="numeric"
        placeholderTextColor="#000"
        value={saturatedFats}
        onChangeText={setSaturatedFats}
      />
      {/* Vitamins */}
      <Text style={styles.label}>Vitamins</Text>
      <TextInput
        style={styles.input}
        placeholder="Vitamins"
        keyboardType="default"
        placeholderTextColor="#000"
        value={vitamins}
        onChangeText={setVitamins}
      />
      {/* Allergens */}
      <Text style={styles.label}>Allergens</Text>
      <TextInput
        style={styles.input}
        placeholder="Allergens"
        keyboardType="default"
        placeholderTextColor="#000"
        value={allergens}
        onChangeText={setAllergens}
      />
      {/* Dietary Tags */}
      <Text style={styles.label}>Dietary Tags</Text>
      <TextInput
        style={styles.input}
        placeholder="Dietary Tags"
        keyboardType="default"
        placeholderTextColor="#000"
        value={dietaryTags}
        onChangeText={setDietaryTags}
      />
      {/* Custom Recipes */}
      <Text style={styles.label}>Custom Recipes</Text>
      <TextInput
        style={styles.input}
        placeholder="Custom Recipes"
        keyboardType="default"
        placeholderTextColor="#000"
        value={customRecipes}
        onChangeText={setCustomRecipes}
      />
      {/* Favorite Foods */}
      <Text style={styles.label}>Favorite Foods</Text>

      <TextInput
        style={styles.input}
        placeholder="Favorite Foods"
        keyboardType="default"
        placeholderTextColor="#000"
        value={favoriteFoods}
        onChangeText={setFavoriteFoods}
      />
      {/* Minerals */}
      <Text style={styles.label}>Minerals</Text>
      <TextInput
        style={styles.input}
        placeholder="Minerals"
        keyboardType="default"
        placeholderTextColor="#000"
        value={minerals}
        onChangeText={setMinerals}
      />

      {/* Notes */}
      <Text style={styles.label}>Additional Notes</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Additional Notes"
        placeholderTextColor="#000"
        multiline
        value={notes}
        onChangeText={setNotes}
      />

      {/* Submit Button */}
      <Button title="Save Entry" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    color: "black",
    marginBottom: 10,
  },
  datePickerContainer: {
    marginBottom: 10,
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    color: "black",
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    color: "black",
    marginBottom: 10,
  },
};
