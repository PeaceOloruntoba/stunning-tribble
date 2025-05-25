import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ResidentHomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 p-4 justify-center items-center">
        <Text className="text-2xl font-bold text-gray-900 mb-6 font-[Inter-Regular]">
          Welcome, Resident!
        </Text>
        <Text className="text-lg text-gray-500 text-center">
          Use the tabs below to chat with your caretaker, control home devices,
          or view your profile.
        </Text>
      </View>
    </SafeAreaView>
  );
}
