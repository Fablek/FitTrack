import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { MealLogs, MealType, Product, DailyLog } from "@/types";
import { MEAL_TYPES } from "@/types";

interface MealContextType {
  mealLogs: MealLogs;
  addProduct: (
    dateKey: string,
    mealType: MealType,
    product: Omit<Product, "id">
  ) => void;
  removeProduct: (dateKey: string, mealType: MealType, productId: string) => void;
}

const MealContext = createContext<MealContextType | null>(null);

function createEmptyDailyLog(): DailyLog {
  return MEAL_TYPES.reduce(
    (acc, meal) => {
      acc[meal] = [];
      return acc;
    },
    {} as Record<MealType, Product[]>
  );
}

export function MealProvider({ children }: { children: ReactNode }) {
  const [mealLogs, setMealLogs] = useState<MealLogs>({});

  const addProduct = useCallback(
    (dateKey: string, mealType: MealType, product: Omit<Product, "id">) => {
      const newProduct: Product = {
        ...product,
        id: Date.now().toString() + Math.random().toString(36).slice(2, 9),
      };

      setMealLogs((prev) => ({
        ...prev,
        [dateKey]: {
          ...(prev[dateKey] ?? createEmptyDailyLog()),
          [mealType]: [...(prev[dateKey]?.[mealType] ?? []), newProduct],
        },
      }));
    },
    []
  );

  const removeProduct = useCallback(
    (dateKey: string, mealType: MealType, productId: string) => {
      setMealLogs((prev) => {
        const dailyLog = prev[dateKey];
        if (!dailyLog) return prev;

        const updatedMeal = dailyLog[mealType].filter(
          (p) => p.id !== productId
        );

        return {
          ...prev,
          [dateKey]: {
            ...dailyLog,
            [mealType]: updatedMeal,
          },
        };
      });
    },
    []
  );

  return (
    <MealContext.Provider value={{ mealLogs, addProduct, removeProduct }}>
      {children}
    </MealContext.Provider>
  );
}

export function useMealContext() {
  const context = useContext(MealContext);
  if (!context) {
    throw new Error("useMealContext must be used within a MealProvider");
  }
  return context;
}
