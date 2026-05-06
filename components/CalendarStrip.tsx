import { addDays, format, startOfWeek } from "date-fns";
import { pl } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function CalendarStrip({
  onDateSelect,
}: {
  onDateSelect: (date: Date) => void;
}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weekDays, setWeekDays] = useState<Date[]>([]);

  useEffect(() => {
    const start = startOfWeek(new Date(), { weekStartsOn: 1 });
    const days = [];

    for (let i = 0; i < 7; i++) {
      days.push(addDays(start, i));
    }

    setWeekDays(days);
  }, []);

  const handleDatePress = (date: Date) => {
    setSelectedDate(date);
    onDateSelect(date);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {weekDays.map((day, index) => {
          const isSelected =
            format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");

          return (
            <TouchableOpacity
              key={index}
              style={[styles.dayCard, isSelected && styles.selectedDayCard]}
              onPress={() => handleDatePress(day)}
            >
              <Text style={[styles.dayName, isSelected && styles.selectedText]}>
                {format(day, "EEE", { locale: pl }).toUpperCase()}
              </Text>
              <Text
                style={[styles.dayNumber, isSelected && styles.selectedText]}
              >
                {format(day, "d")}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  scrollContainer: {
    paddingHorizontal: 16,
    gap: 8,
  },
  dayCard: {
    width: 52,
    height: 68,
    borderRadius: 12,
    backgroundColor: "#F8F9FA",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  selectedDayCard: {
    backgroundColor: "#2e7d32",
    borderColor: "#2e7d32",
  },
  dayName: {
    fontSize: 11,
    color: "#6C757D",
    fontWeight: "600",
    marginBottom: 4,
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#212529",
  },
  selectedText: {
    color: "#FFFFFF",
  },
});
