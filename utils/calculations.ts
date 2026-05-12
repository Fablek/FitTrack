import type { DailyLog, MealLogs, MealType } from "@/types";

export function getProductsForMeal(
  mealLogs: MealLogs,
  dateKey: string,
  mealType: MealType
) {
  return mealLogs[dateKey]?.[mealType] ?? [];
}

export function getDailySummary(
  mealLogs: MealLogs,
  dateKey: string
): { kcal: number; protein: number; fat: number; carbs: number } {
  const dailyLog: DailyLog | undefined = mealLogs[dateKey];

  if (!dailyLog) return { kcal: 0, protein: 0, fat: 0, carbs: 0 };

  const allProducts = Object.values(dailyLog).flat();

  return allProducts.reduce(
    (acc, p) => ({
      kcal: acc.kcal + p.kcal,
      protein: acc.protein + p.protein,
      fat: acc.fat + p.fat,
      carbs: acc.carbs + p.carbs,
    }),
    { kcal: 0, protein: 0, fat: 0, carbs: 0 }
  );
}

export function getMealKcal(
  mealLogs: MealLogs,
  dateKey: string,
  mealType: MealType
): number {
  return getProductsForMeal(mealLogs, dateKey, mealType).reduce(
    (sum, p) => sum + p.kcal,
    0
  );
}
