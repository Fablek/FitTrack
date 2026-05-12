export const MEAL_TYPES = [
  "Śniadanie",
  "Lunch",
  "Obiad",
  "Podwieczorek",
  "Kolacja",
] as const;

export type MealType = (typeof MEAL_TYPES)[number];

export interface Product {
  id: string;
  name: string;
  kcal: number;
  protein: number;
  fat: number;
  carbs: number;
}

export type DailyLog = Record<MealType, Product[]>;

export type MealLogs = Record<string, DailyLog>;
