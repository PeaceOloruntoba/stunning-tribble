import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAuth } from "../hooks/useAuth";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, loading } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("All fields are required");
      return;
    }
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 p-4 justify-center">
        <Text className="text-2xl font-bold text-gray-900 mb-6 font-[Inter-Regular] text-center">
          Login
        </Text>
        {error && (
          <Text className="text-red-500 text-center mb-4 font-[Inter-Regular]">
            {error}
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
        <TextInput
          className="bg-white p-3 rounded-lg mb-4 font-[Inter-Regular] text-gray-900"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity
          className="bg-blue-500 p-3 rounded-lg"
          onPress={handleLogin}
          disabled={loading}
        >
          <Text className="text-white text-center font-semibold font-[Inter-Regular]">
            {loading ? "Logging in..." : "Login"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="mt-4"
          onPress={() => router.push("/forgot-password")}
        >
          <Text className="text-blue-500 text-center font-[Inter-Regular]">
            Forgot Password?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="mt-2"
          onPress={() => router.push("/register")}
        >
          <Text className="text-blue-500 text-center font-[Inter-Regular]">
            Don't have an account? Register
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
