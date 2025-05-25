import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useAuth } from "../hooks/useAuth";
import { getApps } from "firebase/app";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Inter-Regular": require("../assets/fonts/Inter-VariableFont_opsz,wght.ttf"),
  });
  const { user, loading } = useAuth();
  const router = useRouter();
  const segments = useSegments();
  const [firebaseReady, setFirebaseReady] = useState(false);

  useEffect(() => {
    if (getApps().length > 0) {
      setFirebaseReady(true);
    }
  }, []);

  useEffect(() => {
    if (fontsLoaded && !loading && firebaseReady) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, loading, firebaseReady]);

  useEffect(() => {
    if (!fontsLoaded || loading || !firebaseReady) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inProtectedGroup = ["resident", "caretaker"].includes(segments[0]);

    if (!user && !inAuthGroup) {
      router.replace("/register");
    } else if (user && inAuthGroup) {
      router.replace("/terms");
    }
  }, [user, loading, fontsLoaded, firebaseReady, segments, router]);

  if (!fontsLoaded || loading || !firebaseReady) {
    return null;
  }

  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#f8f8f8" },
          headerTintColor: "#000",
          headerTitleStyle: { fontFamily: "Inter-Regular", fontSize: 20 },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="terms"
          options={{ title: "Terms and Conditions" }}
        />
        <Stack.Screen
          name="profile-selection"
          options={{ title: "Select a Profile" }}
        />
        <Stack.Screen
          name="device-connection"
          options={{ title: "Connect Devices" }}
        />
        <Stack.Screen name="resident" options={{ headerShown: false }} />
        <Stack.Screen name="caretaker" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ title: "Register" }} />
        <Stack.Screen name="login" options={{ title: "Login" }} />
        <Stack.Screen
          name="forgot-password"
          options={{ title: "Forgot Password" }}
        />
        <Stack.Screen
          name="otp-verification"
          options={{ title: "Verify OTP" }}
        />
      </Stack>
    </>
  );
}
