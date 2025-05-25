import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TermsScreen() {
  const router = useRouter();

  const handleAccept = () => {
    // Navigate to profile selection screen on accept
    router.push("/profile-selection");
  };

  const handleDecline = () => {
    // Handle decline (e.g., exit app or show message)
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 p-4">
        <Text className="text-2xl font-bold text-center mb-4">
          Terms and Conditions
        </Text>
        <View className="bg-white p-4 rounded-lg shadow">
          <Text className="text-lg font-semibold mb-2">
            Smart Home Control - Terms & Conditions
          </Text>
          <Text className="text-base mb-2">
            By using the Smart Home Control App ("App"), you agree to the
            following terms:
          </Text>
          <Text className="text-base font-semibold mb-1">1. Purpose</Text>
          <Text className="text-base mb-2">
            This App is designed to assist elderly and disabled individuals in
            controlling home appliances through hand gestures, voice commands,
            and mobile input for convenience and accessibility.
          </Text>
          <Text className="text-base font-semibold mb-1">
            2. User Responsibility
          </Text>
          <Text className="text-base mb-2">
            - The App is not a medical device and should not be used as a
            substitute for professional care.
            {"\n"}- Users must ensure Bluetooth permissions are granted and
            device connections are secure.
          </Text>
          <Text className="text-base font-semibold mb-1">3. Data Usage</Text>
          <Text className="text-base mb-4">
            - The App may store non-personal data such as device usage logs and
            temperature readings.
            {"\n"}- No personal or health data is collected, stored, or shared
            without consent.
          </Text>
        </View>
        <View className="flex-row justify-between mt-4">
          <TouchableOpacity
            className="bg-red-500 py-3 px-6 rounded-lg"
            onPress={handleDecline}
          >
            <Text className="text-white text-center font-semibold">
              Decline
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-green-500 py-3 px-6 rounded-lg"
            onPress={handleAccept}
          >
            <Text className="text-white text-center font-semibold">Accept</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
