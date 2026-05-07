import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

interface Props {
  kcal: number;
  protein: number;
  fat: number;
  carbs: number;
  goal?: number;
}

const MAX_WIDTH = 1000;

export default function SummaryFooter({
  kcal,
  protein,
  fat,
  carbs,
  goal = 2500,
}: Props) {
  const remaining = goal - kcal;

  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <View style={styles.kcalSection}>
          <Text style={styles.label}>Pozostało</Text>
          <Text
            style={[
              styles.kcalValue,
              { color: remaining < 0 ? "#d32f2f" : "#2e7d32" },
            ]}
          >
            {remaining} <Text style={styles.kcalUnit}>kcal</Text>
          </Text>
        </View>

        <View style={styles.macrosSection}>
          <View style={styles.macroBox}>
            <Text style={styles.macroValue}>{protein}g</Text>
            <Text style={styles.macroLabel}>B</Text>
          </View>
          <View style={styles.macroBox}>
            <Text style={styles.macroValue}>{fat}g</Text>
            <Text style={styles.macroLabel}>T</Text>
          </View>
          <View style={styles.macroBox}>
            <Text style={styles.macroValue}>{carbs}g</Text>
            <Text style={styles.macroLabel}>W</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 10,
      },
      default: {
        boxShadow: "0 -4px 10px rgba(0,0,0,0.05)",
      },
    }),
  },
  innerContainer: {
    width: "100%",
    maxWidth: MAX_WIDTH,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 12,
    // Dynamiczny padding dla iPhone'ów z notchem
    paddingBottom: Platform.OS === "ios" ? 34 : 12,
  },
  kcalSection: {
    flex: 1,
  },
  label: {
    fontSize: 11,
    color: "#888",
    textTransform: "uppercase",
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  kcalValue: {
    fontSize: 22,
    fontWeight: "900",
  },
  kcalUnit: {
    fontSize: 14,
    fontWeight: "400",
    color: "#666",
  },
  macrosSection: {
    flexDirection: "row",
    gap: 15,
  },
  macroBox: {
    alignItems: "center",
    minWidth: 40,
  },
  macroValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },
  macroLabel: {
    fontSize: 10,
    color: "#999",
    fontWeight: "600",
  },
});
