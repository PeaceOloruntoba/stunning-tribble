import { Stack } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Inter-Regular": require("../assets/fonts/Inter-VariableFont_opsz,wght.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f8f8f8",
          },
          headerTintColor: "#000",
          headerTitleStyle: {
            fontFamily: "Inter-Regular",
            fontSize: 20,
          },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="terms" options={{ headerShown: false }} />
        <Stack.Screen
          name="profile-selection"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="device-connection"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="resident" options={{ headerShown: false }} />
        <Stack.Screen name="caretaker" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
