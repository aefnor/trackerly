import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import type { OpenFoodFactsResponse, Ingredient } from "../types/openfoodfacts";

const IngredientDisplay = ({
  product,
}: {
  product: OpenFoodFactsResponse["product"];
}) => {
  if (!product) return <Text>No product data</Text>;

  const ingredientsText = product.ingredients_text;
  const structuredIngredients: Ingredient[] = product.ingredients || [];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Ingredients</Text>

      {ingredientsText ? (
        <Text style={styles.text}>{ingredientsText}</Text>
      ) : (
        <Text style={styles.text}>No raw ingredient string available.</Text>
      )}

      {structuredIngredients.length > 0 && (
        <>
          <Text style={styles.subtitle}>Parsed Ingredients:</Text>
          {structuredIngredients.map((ing, idx) => (
            <Text key={idx} style={styles.ingredient}>
              • {ing.text}
              {ing.vegan ? ` (Vegan: ${ing.vegan})` : ""}
              {ing.vegetarian ? ` (Vegetarian: ${ing.vegetarian})` : ""}
            </Text>
          ))}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  subtitle: { marginTop: 16, fontWeight: "600" },
  text: { fontSize: 16 },
  ingredient: { fontSize: 14, paddingVertical: 2 },
});

export default IngredientDisplay;
