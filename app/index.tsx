import { Text, View, Button, ScrollView } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import {dummyFoodEntries} from "../data/foodData";
import FoodCard from "../components/FoodCard";

export default function Index() {
  const [entries, setEntries] = useState(dummyFoodEntries);

  const handleDelete = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Show Entries for Food Added */}
      <ScrollView style={{ flexDirection: 'column', gap: 10, marginTop: 20 }}>
        {/* List of Entries */}
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', justifyContent: 'center', alignItems: 'center' }}>Recent Entries</Text>
        </View>
        {entries.map((entry, index) => (
          <FoodCard entry={entry} onDelete={handleDelete} key={`entry-${entry.id}`} />
        ))}
      </ScrollView>
      <Button title="Go to Profile" onPress={() => router.push('/profile')} />
      <Button title="Go to Food Entry" onPress={() => router.push('/food-entry')} />
      <Button title="Agenda" onPress={() => router.push('/agenda')} />
    </View>
  );
}

