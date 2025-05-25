import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useAuth } from "../hooks/useAuth";
import { ConfirmationResult } from "firebase/auth";

export default function OtpVerificationScreen() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const { verifyOtp, loading } = useAuth();
  const router = useRouter();
  const { confirmation } = useLocalSearchParams();

  const handleVerify = async () => {
    if (!code) {
      setError("OTP code required");
      return;
    }
    try {
      const confirmationString = Array.isArray(confirmation)
        ? confirmation[0]
        : confirmation;
      const confirmationResult = JSON.parse(confirmationString) as {
        verificationId: string;
      };
      await verifyOtp(
        {
          verificationId: confirmationResult.verificationId,
        } as ConfirmationResult,
        code
      );
      router.replace("/terms");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 p-4 justify-center">
        <Text className="text-2xl font-bold text-gray-900 mb-6 font-[Inter-Regular] text-center">
          Verify OTP
        </Text>
        {error && (
          <Text className="text-red-500 text-center mb-4 font-[Inter-Regular]">
            {error}
          </Text>
        )}
        <TextInput
          className="bg-white p-3 rounded-lg mb-4 font-[Inter-Regular] text-gray-900"
          placeholder="Enter 6-digit OTP code"
          value={code}
          onChangeText={setCode}
          keyboardType="numeric"
          maxLength={6}
        />
        <TouchableOpacity
          className="bg-blue-500 p-3 rounded-lg"
          onPress={handleVerify}
          disabled={loading}
        >
          <Text className="text-white text-center font-semibold font-[Inter-Regular]">
            {loading ? "Verifying..." : "Verify"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
