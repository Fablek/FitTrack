import { Plus } from "lucide-react-native";
import React from "react";
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface Props {
  title: string;
  kcal?: number;
  onAdd: () => void;
}

const MAX_WIDTH = 1000;

export default function MealCard({ title, kcal = 0, onAdd }: Props) {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.kcalInfo}>{kcal} kcal</Text>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={onAdd}
            activeOpacity={0.7}
          >
            <Plus color="#FFFFFF" size={22} strokeWidth={3} />
          </TouchableOpacity>
        </View>

        {/* Miejsce na produkty - na razie placeholder */}
        <View style={styles.content}>
          <Text style={styles.placeholderText}>
            Kliknij +, aby dodać produkt
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  card: {
    width: "100%",
    maxWidth: MAX_WIDTH,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginTop: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
      },
      android: {
        elevation: 3,
      },
      default: {
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      },
    }),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1A1A1A",
  },
  kcalInfo: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  addButton: {
    backgroundColor: "#2e7d32",
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#F5F5F5",
  },
  placeholderText: {
    fontSize: 13,
    color: "#CCCCCC",
    fontStyle: "italic",
  },
});
