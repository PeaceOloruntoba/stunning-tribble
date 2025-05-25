import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PlaceholderScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 p-4">
        <Text className="text-2xl font-bold font-[Inter-Regular]">
          Placeholder Screen
        </Text>
      </View>
    </SafeAreaView>
  );
}
