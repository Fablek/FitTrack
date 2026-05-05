import { Tabs } from "expo-router";
import { Apple } from "lucide-react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#2e7d32",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dziennik",
          tabBarIcon: ({ color }) => <Apple color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}
