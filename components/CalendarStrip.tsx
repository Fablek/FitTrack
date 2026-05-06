import {
    addDays,
    eachDayOfInterval,
    format,
    isSameDay,
    startOfWeek,
    subDays,
} from "date-fns";
import { pl } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    FlatList,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface Props {
  onDateSelect: (date: Date) => void;
  selectedDate: Date;
}

const MAX_WIDTH = 1000;

export default function CalendarStrip({ onDateSelect, selectedDate }: Props) {
  const [containerWidth, setContainerWidth] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const dates = useMemo(() => {
    const start = subDays(startOfWeek(new Date(), { weekStartsOn: 1 }), 364);
    const end = addDays(new Date(), 365);
    return eachDayOfInterval({ start, end });
  }, []);

  const itemWidth = containerWidth > 0 ? Math.floor(containerWidth / 7) : 0;
  const snapInterval = itemWidth * 7;

  useEffect(() => {
    if (containerWidth > 0) {
      const todayIndex = dates.findIndex((date) => isSameDay(date, new Date()));
      if (todayIndex !== -1) {
        setTimeout(() => {
          const weekStartIndex = Math.floor(todayIndex / 7) * 7;
          flatListRef.current?.scrollToIndex({
            index: weekStartIndex,
            animated: false,
          });
        }, 100);
      }
    }
  }, [containerWidth]);

  const scrollWeeks = (direction: number) => {
    if (flatListRef.current && containerWidth > 0) {
      flatListRef.current.scrollToIndex({
        index:
          (Math.floor(dates.findIndex((d) => isSameDay(d, selectedDate)) / 7) +
            direction) *
          7,
        animated: true,
      });
    }
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.navigationWrapper}>
        {Platform.OS === "web" && (
          <TouchableOpacity
            onPress={() => scrollWeeks(-1)}
            style={styles.navButton}
          >
            <ChevronLeft size={24} color="#2e7d32" />
          </TouchableOpacity>
        )}

        <View
          style={styles.innerContainer}
          onLayout={(e) => {
            const w = e.nativeEvent.layout.width;
            if (Math.abs(containerWidth - w) > 1) setContainerWidth(w);
          }}
        >
          {containerWidth > 0 && (
            <FlatList
              ref={flatListRef}
              data={dates}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.toISOString()}
              snapToInterval={snapInterval}
              snapToAlignment="start"
              decelerationRate="fast"
              disableIntervalMomentum={true}
              scrollEventThrottle={16}
              getItemLayout={(_, index) => ({
                length: itemWidth,
                offset: itemWidth * index,
                index,
              })}
              renderItem={({ item }) => {
                const isSelected = isSameDay(item, selectedDate);
                const isToday = isSameDay(item, new Date());

                return (
                  <TouchableOpacity
                    style={[styles.dayCard, { width: itemWidth }]}
                    onPress={() => onDateSelect(item)}
                  >
                    <Text style={[styles.dayName, isToday && styles.todayText]}>
                      {format(item, "EEE", { locale: pl }).toUpperCase()}
                    </Text>
                    <View
                      style={[
                        styles.circle,
                        isSelected && styles.selectedCircle,
                        isToday && !isSelected && styles.todayCircle,
                      ]}
                    >
                      <Text
                        style={[
                          styles.dayNumber,
                          isSelected && styles.selectedNum,
                          isToday && !isSelected && styles.todayNum,
                        ]}
                      >
                        {format(item, "d")}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </View>

        {Platform.OS === "web" && (
          <TouchableOpacity
            onPress={() => scrollWeeks(1)}
            style={styles.navButton}
          >
            <ChevronRight size={24} color="#2e7d32" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  navigationWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    maxWidth: MAX_WIDTH + 120,
    justifyContent: "center",
  },
  innerContainer: {
    width: "100%",
    maxWidth: MAX_WIDTH,
    paddingVertical: 10,
    overflow: "hidden",
  },
  navButton: {
    padding: 15,
    zIndex: 20,
  } as any,
  dayCard: { alignItems: "center", justifyContent: "center", height: 75 },
  dayName: { fontSize: 10, color: "#999", fontWeight: "700", marginBottom: 4 },
  circle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedCircle: { backgroundColor: "#2e7d32" },
  todayCircle: { borderWidth: 1, borderColor: "#2e7d32" },
  dayNumber: { fontSize: 16, fontWeight: "bold", color: "#333" },
  selectedNum: { color: "#FFFFFF" },
  todayNum: { color: "#2e7d32" },
  todayText: { color: "#2e7d32" },
});
