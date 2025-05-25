import { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../hooks/useAuth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

interface UserProfile {
  fullName: string;
  email: string;
  role: string;
  phoneNumber: string;
}

export default function ProfileScreen() {
  const { user, logout, loading } = useAuth();
  const [profileData, setProfileData] = useState<UserProfile>({
    fullName: "",
    email: "",
    role: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setProfileData(userDoc.data() as UserProfile);
          }
        } catch (err: any) {
          setError(err.message);
        }
      };
      fetchProfile();
    }
  }, [user]);

  const handleSettings = () => {
    console.log("Settings not implemented");
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 p-4">
        <Text className="text-2xl font-bold text-gray-900 mb-6 font-[Inter-Regular] text-center">
          Profile
        </Text>
        {error && (
          <Text className="text-red-500 text-center mb-4 font-[Inter-Regular]">
            {error}
          </Text>
        )}
        <View className="bg-white p-4 rounded-lg shadow mb-4">
          <Text className="text-lg font-semibold text-gray-900 font-[Inter-Regular] mb-2">
            User Information
          </Text>
          <Text className="text-base text-gray-700 font-[Inter-Regular]">
            Full Name: {profileData.fullName || "N/A"}
          </Text>
          <Text className="text-base text-gray-600 font-[Inter-Regular]">
            Email: {user?.email || "N/A"}
          </Text>
          <Text className="text-base text-gray-700 font-[Inter-Regular]">
            Role: {profileData.role || "N/A"}
          </Text>
          <Text className="text-base text-gray-700 font-[Inter-Regular]">
            Phone: {profileData.phoneNumber || "N/A"}
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
          disabled={loading}
        >
          <Text className="text-white text-center font-semibold font-[Inter-Regular]">
            {loading ? "Logging out..." : "Logout"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
