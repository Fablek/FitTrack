import CalendarStrip from "@/components/CalendarStrip";
import Header from "@/components/Header";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F9FA" }}>
      <Header selectedDate={selectedDate} />
      <CalendarStrip
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
      />

      <ScrollView>
        {/* Tu będziesz wrzucać sekcje posiłków, które też będą miały maxWidth */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
});
