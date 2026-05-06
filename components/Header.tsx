import { Apple } from "lucide-react-native";
import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

export default function Header() {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.logoArea}>
        <Apple color="#2e7d32" size={28} strokeWidth={2} />
        <Text style={styles.appName}>FitTrack</Text>
      </View>
      <Text style={styles.subtitle}>Twój osobisty dziennik</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#FFFFFF",
    paddingTop: Platform.OS === "ios" ? 50 : 20,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  logoArea: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  appName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1A1A1A",
  },
  subtitle: {
    fontSize: 12,
    color: "#666666",
    fontWeight: "400",
  },
});
