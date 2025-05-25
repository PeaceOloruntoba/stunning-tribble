import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const user = {
    name: "John Doe",
    role: "Resident",
    email: "john.doe@example.com",
  };

  const handleSettings = () => {
    console.log("Open settings");
  };

  const handleLogout = () => {
    console.log("Logout");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 p-4">
        <Text className="text-2xl font-bold text-gray-900 mb-6 font-[Inter-Regular] text-center">
          Profile
        </Text>
        <View className="bg-white p-4 rounded-lg shadow mb-4">
          <Text className="text-lg font-semibold text-gray-900 font-[Inter-Regular] mb-2">
            User Information
          </Text>
          <Text className="text-base text-gray-700 font-[Inter-Regular]">
            Name: {user.name}
          </Text>
          <Text className="text-base text-gray-700 font-[Inter-Regular]">
            Role: {user.role}
          </Text>
          <Text className="text-base text-gray-700 font-[Inter-Regular]">
            Email: {user.email}
          </Text>
        </View>
        <TouchableOpacity
          className="bg-blue-500 py-3 px-6 rounded-lg mb-2"
          onPress={handleSettings}
        >
          <Text className="text-white text-center font-semibold font-[Inter-Regular]">
            Settings
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-red-500 py-3 px-6 rounded-lg"
          onPress={handleLogout}
        >
          <Text className="text-white text-center font-semibold font-[Inter-Regular]">
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
