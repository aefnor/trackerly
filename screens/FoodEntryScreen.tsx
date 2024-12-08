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

export default function FoodEntryScreen() {
  const [foodName, setFoodName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [calories, setCalories] = useState("");
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
      <View style={{ marginBottom: "50%" }}></View>

      {/* Food Name */}
      <TextInput
        style={styles.input}
        placeholder="Food Name"
        placeholderTextColor="#000"
        value={foodName}
        onChangeText={setFoodName}
      />

      {/* Category Picker */}
      <RNPickerSelect
        onValueChange={(value) => setCategory(value)}
        items={[
          { label: "Breakfast", value: "Breakfast" },
          { label: "Lunch", value: "Lunch" },
          { label: "Dinner", value: "Dinner" },
          { label: "Snack", value: "Snack" },
        ]}
        style={pickerSelectStyles}
        placeholder={{ label: "Select Category", value: null, color: "#000" }}
      />

      {/* Date Picker */}
      <View style={styles.datePickerContainer}>
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
      )}

      {/* Quantity */}
      <TextInput
        style={styles.input}
        placeholder="Quantity (e.g., 1 serving or 200 grams)"
        keyboardType="numeric"
        placeholderTextColor="#000"
        value={quantity}
        onChangeText={setQuantity}
      />

      {/* Calories */}
      <TextInput
        style={styles.input}
        placeholder="Calories (Optional)"
        keyboardType="numeric"
        placeholderTextColor="#000"
        value={calories}
        onChangeText={setCalories}
      />

      {/* Notes */}
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
