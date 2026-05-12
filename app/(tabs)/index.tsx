import { useMealContext } from "@/context/MealContext";
import {
  getDailySummary,
  getMealKcal,
  getProductsForMeal,
} from "@/utils/calculations";
import CalendarStrip from "@/components/CalendarStrip";
import Header from "@/components/Header";
import MealCard from "@/components/MealCard";
import SummaryFooter from "@/components/SummaryFooter";
import { format } from "date-fns";
import { MEAL_TYPES, type MealType } from "@/types";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { mealLogs } = useMealContext();
  const router = useRouter();

  const dateKey = format(selectedDate, "yyyy-MM-dd");

  const summary = useMemo(
    () => getDailySummary(mealLogs, dateKey),
    [mealLogs, dateKey]
  );

  const handleAdd = (mealType: MealType) => {
    router.push({
      pathname: "/add-product",
      params: { dateKey, mealType },
    });
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
        contentContainerStyle={styles.scrollContent}
      >
        {MEAL_TYPES.map((mealType) => {
          const products = getProductsForMeal(mealLogs, dateKey, mealType);
          const kcal = getMealKcal(mealLogs, dateKey, mealType);

          return (
            <MealCard
              key={mealType}
              title={mealType}
              kcal={kcal}
              products={products}
              onAdd={() => handleAdd(mealType)}
            />
          );
        })}
      </ScrollView>

      <SummaryFooter
        kcal={summary.kcal}
        protein={summary.protein}
        fat={summary.fat}
        carbs={summary.carbs}
        goal={2500}
      />
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
