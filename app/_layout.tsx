import { MealProvider } from "@/context/MealContext";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <MealProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="add-product"
            options={{ presentation: "modal", animation: "slide_from_bottom" }}
          />
        </Stack>
      </MealProvider>
    </SafeAreaProvider>
  );
}
