import CalendarStrip from "@/components/CalendarStrip";
import Header from "@/components/Header";
import MealCard from "@/components/MealCard";
import SummaryFooter from "@/components/SummaryFooter";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <View style={styles.container}>
      <Header selectedDate={selectedDate} />
      <CalendarStrip
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <MealCard title="Śniadanie" onAdd={() => {}} />
        <MealCard title="Lunch" onAdd={() => {}} />
        <MealCard title="Obiad" onAdd={() => {}} />
        <MealCard title="Podwieczorek" onAdd={() => {}} />
        <MealCard title="Kolacja" onAdd={() => {}} />
      </ScrollView>

      <SummaryFooter kcal={0} protein={0} fat={0} carbs={0} goal={2500} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  scrollContent: {
    paddingBottom: 120,
  },
});
