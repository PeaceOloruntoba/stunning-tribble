import { Tabs } from "expo-router";

export default function CaretakerLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: "#fff" },
        tabBarActiveTintColor: "#1e40af",
        tabBarLabelStyle: { fontFamily: "Inter-Regular", fontSize: 12 },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="chat" options={{ title: "Chat" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
