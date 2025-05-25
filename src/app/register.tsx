import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAuth } from "../hooks/useAuth";

export default function RegisterScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState<"resident" | "caretaker" | null>(null);
  const [error, setError] = useState("");
  const { signUp, loading } = useAuth();
  const router = useRouter();

  const handleRegister = async () => {
    if (
      !fullName ||
      !email ||
      !password ||
      !confirmPassword ||
      !phoneNumber ||
      !role
    ) {
      setError("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const { confirmationResult } = await signUp(
        fullName,
        email,
        password,
        role,
        phoneNumber
      );
      router.push({
        pathname: "/otp-verification",
        params: { confirmation: JSON.stringify(confirmationResult) },
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="flex-1 p-4">
        <Text className="text-2xl font-bold text-gray-900 mb-6 font-[Inter-Regular] text-center">
          Register
        </Text>
        {error && (
          <Text className="text-red-500 text-center mb-4 font-[Inter-Regular]">
            {error}
          </Text>
        )}
        <TextInput
          className="bg-white p-3 rounded-lg mb-4 font-[Inter-Regular] text-gray-900"
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          className="bg-white p-3 rounded-lg mb-4 font-[Inter-Regular] text-gray-900"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          className="bg-white p-3 rounded-lg mb-4 font-[Inter-Regular] text-gray-900"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          className="bg-white p-3 rounded-lg mb-4 font-[Inter-Regular] text-gray-900"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <TextInput
          className="bg-white p-3 rounded-lg mb-4 font-[Inter-Regular] text-gray-900"
          placeholder="Phone Number (e.g., +1234567890)"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
        <View className="flex-row justify-between mb-4">
          <TouchableOpacity
            className={`flex-1 p-3 rounded-lg mr-2 ${
              role === "resident" ? "bg-blue-500" : "bg-gray-200"
            }`}
            onPress={() => setRole("resident")}
          >
            <Text
              className={`text-center font-[Inter-Regular] ${
                role === "resident" ? "text-white" : "text-gray-900"
              }`}
            >
              Resident
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 p-3 rounded-lg ml-2 ${
              role === "caretaker" ? "bg-blue-500" : "bg-gray-200"
            }`}
            onPress={() => setRole("caretaker")}
          >
            <Text
              className={`text-center font-[Inter-Regular] ${
                role === "caretaker" ? "text-white" : "text-gray-900"
              }`}
            >
              Caretaker
            </Text>
          </TouchableOpacity>
        </View>
        <View id="recaptcha-container" />
        <TouchableOpacity
          className="bg-blue-500 p-3 rounded-lg"
          onPress={handleRegister}
          disabled={loading}
        >
          <Text className="text-white text-center font-semibold font-[Inter-Regular]">
            {loading ? "Registering..." : "Register"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="mt-4"
          onPress={() => router.push("/login")}
        >
          <Text className="text-blue-500 text-center font-[Inter-Regular]">
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
