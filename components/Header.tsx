import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Apple } from "lucide-react-native";
import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

interface Props {
  selectedDate: Date;
}

const MAX_WIDTH = 1000;

export default function Header({ selectedDate }: Props) {
  const monthYear = format(selectedDate, "LLLL yyyy", { locale: pl });

  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <View style={styles.logoArea}>
          <Apple color="#2e7d32" size={28} strokeWidth={2.5} />
          <Text style={styles.appName}>FitTrack</Text>
        </View>
        <Text style={styles.monthLabel}>{monthYear}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    zIndex: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  innerContainer: {
    width: "100%",
    maxWidth: MAX_WIDTH,
    paddingTop: Platform.OS === "ios" ? 60 : 20,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoArea: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  appName: {
    fontSize: 22,
    fontWeight: "900",
    color: "#1A1A1A",
    textTransform: "uppercase",
    letterSpacing: -0.5,
  },
  monthLabel: {
    fontSize: 16,
    color: "#2e7d32",
    fontWeight: "700",
    textTransform: "capitalize",
  },
});
