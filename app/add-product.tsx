import { useMealContext } from "@/context/MealContext";
import { ArrowLeft, Check } from "lucide-react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,

} from "react-native";
import { MEAL_TYPES, type MealType } from "@/types";

const MAX_WIDTH = 1000;

export default function AddProductScreen() {
  const router = useRouter();
  const { dateKey, mealType } = useLocalSearchParams<{
    dateKey: string;
    mealType: string;
  }>();
  const { addProduct } = useMealContext();

  const [name, setName] = useState("");
  const [kcal, setKcal] = useState("");
  const [protein, setProtein] = useState("");
  const [fat, setFat] = useState("");
  const [carbs, setCarbs] = useState("");

  const errors: Record<string, string> = {};
  if (name.trim().length === 0) errors.name = "Nazwa jest wymagana";
  if (kcal === "" || isNaN(Number(kcal)) || Number(kcal) < 0)
    errors.kcal = "Podaj prawidłową wartość kcal";
  if (protein === "" || isNaN(Number(protein)) || Number(protein) < 0)
    errors.protein = "Podaj prawidłową wartość białka";
  if (fat === "" || isNaN(Number(fat)) || Number(fat) < 0)
    errors.fat = "Podaj prawidłową wartość tłuszczu";
  if (carbs === "" || isNaN(Number(carbs)) || Number(carbs) < 0)
    errors.carbs = "Podaj prawidłową wartość węglowodanów";

  const isValid = Object.keys(errors).length === 0 && dateKey && mealType;

  const handleSave = () => {
    if (!isValid) return;

    addProduct(dateKey, mealType as MealType, {
      name: name.trim(),
      kcal: Number(kcal),
      protein: Number(protein),
      fat: Number(fat),
      carbs: Number(carbs),
    });

    router.back();
  };

  const displayMealType = MEAL_TYPES.includes(mealType as MealType)
    ? mealType
    : mealType;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <ArrowLeft size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dodaj produkt</Text>
        <View style={styles.backButtonPlaceholder} />
      </View>

      <View style={styles.mealBadge}>
        <Text style={styles.mealBadgeText}>{displayMealType}</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.formWrapper}
      >
        <View style={styles.outerForm}>
          <View style={styles.form}>
            <Text style={styles.sectionLabel}>Nazwa produktu</Text>
            <TextInput
              style={[styles.input, errors.name && styles.inputError]}
              value={name}
              onChangeText={setName}
              placeholder="np. Jajecznica"
              placeholderTextColor="#CCCCCC"
            />
            {errors.name && (
              <Text style={styles.errorText}>{errors.name}</Text>
            )}

            <Text style={styles.sectionLabel}>Kalorie (kcal)</Text>
            <TextInput
              style={[styles.input, errors.kcal && styles.inputError]}
              value={kcal}
              onChangeText={setKcal}
              placeholder="np. 250"
              placeholderTextColor="#CCCCCC"
              keyboardType="decimal-pad"
            />
            {errors.kcal && (
              <Text style={styles.errorText}>{errors.kcal}</Text>
            )}

            <Text style={styles.sectionLabel}>Białko (g)</Text>
            <TextInput
              style={[styles.input, errors.protein && styles.inputError]}
              value={protein}
              onChangeText={setProtein}
              placeholder="np. 15"
              placeholderTextColor="#CCCCCC"
              keyboardType="decimal-pad"
            />
            {errors.protein && (
              <Text style={styles.errorText}>{errors.protein}</Text>
            )}

            <Text style={styles.sectionLabel}>Tłuszcz (g)</Text>
            <TextInput
              style={[styles.input, errors.fat && styles.inputError]}
              value={fat}
              onChangeText={setFat}
              placeholder="np. 10"
              placeholderTextColor="#CCCCCC"
              keyboardType="decimal-pad"
            />
            {errors.fat && (
              <Text style={styles.errorText}>{errors.fat}</Text>
            )}

            <Text style={styles.sectionLabel}>Węglowodany (g)</Text>
            <TextInput
              style={[styles.input, errors.carbs && styles.inputError]}
              value={carbs}
              onChangeText={setCarbs}
              placeholder="np. 20"
              placeholderTextColor="#CCCCCC"
              keyboardType="decimal-pad"
            />
            {errors.carbs && (
              <Text style={styles.errorText}>{errors.carbs}</Text>
            )}
          </View>
        </View>

        <View style={styles.buttonWrapper}>
          <View style={styles.outerButton}>
            <TouchableOpacity
              style={[styles.saveButton, !isValid && styles.saveButtonDisabled]}
              onPress={handleSave}
              activeOpacity={0.7}
              disabled={!isValid}
            >
              <Check color="#FFFFFF" size={22} strokeWidth={3} />
              <Text style={styles.saveButtonText}>Dodaj</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "ios" ? 60 : 20,
    paddingBottom: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonPlaceholder: {
    width: 40,
    height: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1A1A1A",
  },
  mealBadge: {
    alignItems: "center",
    paddingVertical: 12,
  },
  mealBadgeText: {
    fontSize: 13,
    color: "#2e7d32",
    fontWeight: "700",
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    overflow: "hidden",
  },
  formWrapper: {
    flex: 1,
  },
  outerForm: {
    flex: 1,
    alignItems: "center",
  },
  form: {
    width: "100%",
    maxWidth: MAX_WIDTH,
    paddingHorizontal: 20,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333",
    marginBottom: 6,
    marginTop: 16,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#1A1A1A",
  },
  inputError: {
    borderColor: "#d32f2f",
  },
  errorText: {
    fontSize: 12,
    color: "#d32f2f",
    marginTop: 4,
  },
  buttonWrapper: {
    paddingVertical: 16,
    paddingBottom: Platform.OS === "ios" ? 34 : 16,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  outerButton: {
    width: "100%",
    alignItems: "center",
  },
  saveButton: {
    width: "100%",
    maxWidth: MAX_WIDTH,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#2e7d32",
    paddingVertical: 16,
    borderRadius: 14,
    marginHorizontal: 20,
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
});
