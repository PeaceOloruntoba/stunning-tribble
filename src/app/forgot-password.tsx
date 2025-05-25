import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAuth } from "../hooks/useAuth";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { resetPassword, loading } = useAuth();
  const router = useRouter();

  const handleReset = async () => {
    if (!email) {
      setError("Email is required");
      return;
    }
    try {
      await resetPassword(email);
      setSuccess("Password reset email sent. Check your inbox.");
      setError("");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 p-4 justify-center">
        <Text className="text-2xl font-bold text-gray-900 mb-6 font-[Inter-Regular] text-center">
          Forgot Password
        </Text>
        {error && (
          <Text className="text-red-500 text-center mb-4 font-[Inter-Regular]">
            {error}
          </Text>
        )}
        {success && (
          <Text className="text-green-500 text-center mb-4 font-[Inter-Regular]">
            {success}
          </Text>
        )}
        <TextInput
          className="bg-white p-3 rounded-lg mb-4 font-[Inter-Regular] text-gray-900"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TouchableOpacity
          className="bg-blue-500 p-3 rounded-lg"
          onPress={handleReset}
          disabled={loading}
        >
          <Text className="text-white text-center font-semibold font-[Inter-Regular]">
            {loading ? "Sending..." : "Send Reset Email"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="mt-4"
          onPress={() => router.push("/login")}
        >
          <Text className="text-blue-500 text-center font-[Inter-Regular]">
            Back to Login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
