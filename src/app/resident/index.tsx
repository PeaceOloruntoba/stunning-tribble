import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const TabButton = ({ title, route }: { title: string; route: string }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      className="flex-1 p-4 bg-white rounded-lg shadow mx-2 justify-center items-center"
      onPress={() => router.push(route)}
    >
      <Text className="text-lg font-semibold text-gray-900 font-[Inter-Regular]">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default function ResidentHomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 p-4">
        <Text className="text-2xl font-bold text-gray-900 mb-6 text-center font-[Inter-Regular]">
          Resident Dashboard
        </Text>
        <View className="flex-1 justify-center">
          <View className="flex-row justify-between mb-4">
            <TabButton title="Chat with Caretaker" route="/resident/chat" />
            <TabButton title="Devices" route="/resident/devices" />
          </View>
          <View className="flex-row justify-center">
            <TabButton title="Profile" route="/resident/profile" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
