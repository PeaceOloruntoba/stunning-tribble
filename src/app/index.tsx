import { View, Text, Image } from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to Terms and Conditions after 2 seconds
    const timer = setTimeout(() => {
      router.replace("/terms");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <SafeAreaView className="flex-1 bg-gray-100 justify-center items-center">
      <View className="items-center">
        {/* Replace with your app logo in assets/images/logo.png */}
        {/* <Image
          source={require("../assets/images/logo.png")}
          className="w-32 h-32 mb-4"
          resizeMode="contain"
        /> */}
        <Text className="text-3xl font-bold text-gray-900 font-[Inter-Regular]">
          Smart Home Control
        </Text>
        <Text className="text-lg text-gray-500 mt-2">
          Empowering Accessibility
        </Text>
      </View>
    </SafeAreaView>
  );
}
