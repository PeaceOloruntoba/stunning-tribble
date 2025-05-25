import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileCard = ({ title, route }: { title: string; route: string }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      className="bg-white p-4 rounded-lg shadow w-40 h-40 justify-center items-center m-2"
      onPress={() => router.push(route)}
    >
      <Text className="text-xl font-semibold text-gray-900 font-[Inter-Regular]">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default function ProfileSelectionScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-2xl font-bold text-gray-900 mb-6 font-[Inter-Regular]">
          Select a Profile
        </Text>
        <View className="flex-row flex-wrap justify-center">
          <ProfileCard title="Resident" route="/resident" />
          <ProfileCard title="Caretaker" route="/caretaker" />
        </View>
      </View>
    </SafeAreaView>
  );
}
