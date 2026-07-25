import React, { useEffect, useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AnimatedFruitBackground from "./AnimatedFruitBackground";
import MainPageButton from "../components/MainPageButton";
import api from "@/axios/api";

type AgendaEntry = {
  id: number;
  food_name: string;
  category?: string | null;
  date: string;
  calories?: number | null;
  portion_size?: { amount?: string; unit?: string } | null;
};

function formatDay(date: Date) {
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function dateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function buildWeek() {
  const today = new Date();
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index - 3);
    return date;
  });
}

export default function AgendaScreen() {
  const week = useMemo(buildWeek, []);
  const todayKey = dateKey(new Date());
  const [selectedDate, setSelectedDate] = useState(todayKey);
  const [entries, setEntries] = useState<AgendaEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const weekStart = dateKey(week[0]);
  const weekEnd = dateKey(week[week.length - 1]);
  const selectedEntries = entries.filter(
    (entry) => dateKey(new Date(entry.date)) === selectedDate
  );

  useEffect(() => {
    let cancelled = false;

    async function loadEntries() {
      setIsLoading(true);
      setError("");

      try {
        const response = await api.get<AgendaEntry[]>("/food-entries/", {
          params: { start_date: weekStart, end_date: weekEnd },
        });
        if (!cancelled) setEntries(response.data);
      } catch (err) {
        console.error("Failed to load agenda entries:", err);
        if (!cancelled) setError("Unable to load saved entries.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    loadEntries();
    return () => {
      cancelled = true;
    };
  }, [weekEnd, weekStart]);

  return (
    <AnimatedFruitBackground>
      <ScrollView contentContainerStyle={styles.content}>
        <MainPageButton />

        <View style={styles.header}>
          <Text style={styles.kicker}>Trackerly</Text>
          <Text style={styles.title}>Agenda</Text>
          <Text style={styles.subtitle}>Review meals and plans by day.</Text>
        </View>

        <View style={styles.weekStrip}>
          {week.map((date) => {
            const key = dateKey(date);
            const selected = key === selectedDate;

            return (
              <TouchableOpacity
                key={key}
                style={[styles.dayButton, selected && styles.dayButtonActive]}
                onPress={() => setSelectedDate(key)}
                activeOpacity={0.86}
              >
                <Text
                  style={[styles.dayName, selected && styles.dayNameActive]}
                >
                  {formatDay(date)}
                </Text>
                <Text
                  style={[styles.dayDate, selected && styles.dayDateActive]}
                >
                  {formatDate(date)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.panel}>
          <View style={styles.panelHeader}>
            <Ionicons name="calendar-outline" size={20} color="#168A68" />
            <Text style={styles.panelTitle}>
              {selectedDate === todayKey ? "Today" : "Selected day"}
            </Text>
          </View>

          {isLoading ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>Loading entries</Text>
            </View>
          ) : error ? (
            <View style={styles.emptyState}>
              <Ionicons name="warning-outline" size={26} color="#B42318" />
              <Text style={styles.emptyTitle}>{error}</Text>
            </View>
          ) : selectedEntries.length ? (
            selectedEntries.map((entry) => (
              <View key={entry.id} style={styles.entryRow}>
                <View style={styles.entryIcon}>
                  <Ionicons name="restaurant-outline" size={18} color="#168A68" />
                </View>
                <View style={styles.entryText}>
                  <Text style={styles.entryTitle}>{entry.food_name}</Text>
                  <Text style={styles.entryMeta}>
                    {[entry.category, entry.portion_size?.amount]
                      .filter(Boolean)
                      .join(" - ") || "Saved food entry"}
                  </Text>
                </View>
                <Text style={styles.entryCalories}>
                  {entry.calories != null ? `${entry.calories} kcal` : "--"}
                </Text>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="add-circle-outline" size={26} color="#168A68" />
              <Text style={styles.emptyTitle}>No entries yet</Text>
              <Text style={styles.emptyText}>
                Add a food entry to start building this day.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </AnimatedFruitBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 18,
    paddingTop: 26,
    paddingBottom: 28,
  },
  header: {
    width: "100%",
    maxWidth: 430,
    alignItems: "center",
    marginBottom: 18,
  },
  kicker: {
    color: "#168A68",
    fontSize: 14,
    fontWeight: "800",
    lineHeight: 18,
    marginBottom: 8,
    textAlign: "center",
  },
  title: {
    color: "#18352B",
    fontSize: 34,
    fontWeight: "800",
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: "center",
  },
  subtitle: {
    color: "#49645A",
    fontSize: 16,
    lineHeight: 23,
    marginTop: 8,
    textAlign: "center",
  },
  weekStrip: {
    width: "100%",
    maxWidth: 430,
    flexDirection: "row",
    gap: 8,
    marginBottom: 14,
  },
  dayButton: {
    flex: 1,
    minHeight: 64,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D9E8DF",
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  dayButtonActive: {
    borderColor: "#168A68",
    backgroundColor: "#168A68",
  },
  dayName: {
    color: "#647970",
    fontSize: 12,
    fontWeight: "800",
    lineHeight: 16,
    textAlign: "center",
  },
  dayNameActive: {
    color: "#FFFFFF",
  },
  dayDate: {
    color: "#18352B",
    fontSize: 12,
    fontWeight: "800",
    lineHeight: 16,
    marginTop: 3,
    textAlign: "center",
  },
  dayDateActive: {
    color: "#FFFFFF",
  },
  panel: {
    width: "100%",
    maxWidth: 430,
    borderRadius: 8,
    borderColor: "#D9E8DF",
    borderWidth: 1,
    backgroundColor: "rgba(255, 255, 255, 0.94)",
    padding: 16,
  },
  panelHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  panelTitle: {
    color: "#18352B",
    fontSize: 17,
    fontWeight: "800",
    lineHeight: 22,
  },
  entryRow: {
    minHeight: 68,
    flexDirection: "row",
    alignItems: "center",
    borderTopColor: "#EAF2EE",
    borderTopWidth: 1,
  },
  entryIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EAF7F1",
    marginRight: 10,
  },
  entryText: {
    flex: 1,
    paddingRight: 8,
  },
  entryTitle: {
    color: "#18352B",
    fontSize: 15,
    fontWeight: "800",
    lineHeight: 20,
  },
  entryMeta: {
    color: "#647970",
    fontSize: 13,
    lineHeight: 18,
    marginTop: 2,
  },
  entryCalories: {
    color: "#18352B",
    fontSize: 14,
    fontWeight: "800",
    lineHeight: 20,
  },
  emptyState: {
    minHeight: 160,
    alignItems: "center",
    justifyContent: "center",
    borderTopColor: "#EAF2EE",
    borderTopWidth: 1,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    color: "#18352B",
    fontSize: 17,
    fontWeight: "800",
    lineHeight: 22,
    marginTop: 10,
    textAlign: "center",
  },
  emptyText: {
    color: "#647970",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
    textAlign: "center",
  },
});
