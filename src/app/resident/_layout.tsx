import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ResidentLayout() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#ffffff",
            borderTopWidth: 1,
            borderTopColor: "#e5e7eb",
            height: 60,
            paddingBottom: 5,
          },
          tabBarActiveTintColor: "#1e40af",
          tabBarInactiveTintColor: "#6b7280",
          tabBarLabelStyle: {
            fontFamily: "Inter-Regular",
            fontSize: 12,
            fontWeight: "600",
          },
          tabBarIconStyle: {
            marginTop: 5,
          },
        }}
      >
        <Tabs.Screen
          name="chat"
          options={{
            tabBarLabel: "Chat",
            tabBarIcon: ({ color }) => (
              <View className="items-center">
                <Text className="text-2xl" style={{ color }}>
                  💬
                </Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="devices"
          options={{
            tabBarLabel: "Devices",
            tabBarIcon: ({ color }) => (
              <View className="items-center">
                <Text className="text-2xl" style={{ color }}>
                  🏠
                </Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color }) => (
              <View className="items-center">
                <Text className="text-2xl" style={{ color }}>
                  👤
                </Text>
              </View>
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
