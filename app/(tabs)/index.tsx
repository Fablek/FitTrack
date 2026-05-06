import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CalendarStrip from "../../components/CalendarStrip";
import Header from "../../components/Header";

export default function HomeScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleDateChange = (date: Date) => {
    setCurrentDate(date);
    // Here data from AsyncStorage for this date
  };

  return (
    <View style={styles.container}>
      <Header />

      <CalendarStrip onDateSelect={handleDateChange} />

      <View style={styles.content}>
        <Text style={styles.debugText}>
          Wybrana data: {currentDate.toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  debugText: {
    color: "#666",
    fontStyle: "italic",
  },
});
