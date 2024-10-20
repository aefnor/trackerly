// components/FoodCard.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

// Define the types for the entry prop.
interface FoodEntry {
  id: string;
  foodName: string;
  category: string;
  date: string;
  quantity: string;
  calories?: string;
  notes?: string;
}

// Define the props for the FoodCard component.
interface FoodCardProps {
  entry: FoodEntry;
  onDelete: (id: string) => void; // Function to handle deletion.
}

const FoodCard: React.FC<FoodCardProps> = ({ entry, onDelete }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.foodName}>{entry.foodName}</Text>
      <Text>Category: {entry.category}</Text>
      <Text>Date: {entry.date}</Text>
      <Text>Quantity: {entry.quantity}</Text>
      {entry.calories && <Text>Calories: {entry.calories}</Text>}
      {entry.notes && <Text>Notes: {entry.notes}</Text>}

      <Button 
        title="Delete" 
        onPress={() => onDelete(entry.id)} 
        color="#FF6347" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  foodName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default FoodCard;
