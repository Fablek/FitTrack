import { Apple } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Apple color="#2e7d32" size={80} strokeWidth={1.5} />
      <Text style={styles.appName}>FitTrack</Text>
      <Text style={styles.subtitle}>Twój dziennik kalorii</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  appName: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#1A1A1A",
  },
  subtitle: {
    fontSize: 18,
    color: "#666666",
  },
});
