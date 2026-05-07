import CalendarStrip from "@/components/CalendarStrip";
import Header from "@/components/Header";
import MealCard from "@/components/MealCard";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleAddProduct = (mealName: string) => {
    console.log(`Otwieram wyszukiwarkę dla: ${mealName}`);
  };

  return (
    <View style={styles.container}>
      <Header selectedDate={selectedDate} />
      <CalendarStrip
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollPadding}
      >
        <MealCard
          title="Śniadanie"
          onAdd={() => handleAddProduct("Śniadanie")}
        />
        <MealCard title="Lunch" onAdd={() => handleAddProduct("Lunch")} />
        <MealCard title="Obiad" onAdd={() => handleAddProduct("Obiad")} />
        <MealCard
          title="Podwieczorek"
          onAdd={() => handleAddProduct("Podwieczorek")}
        />
        <MealCard title="Kolacja" onAdd={() => handleAddProduct("Kolacja")} />

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  scrollPadding: {
    paddingBottom: 20,
  },
});
