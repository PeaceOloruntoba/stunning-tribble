import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { bluetoothService } from "../services/bluetooth";

export default function DeviceConnectionScreen() {
  const router = useRouter();
  const [devices, setDevices] = useState<string[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    // Request Bluetooth permissions on mount
    bluetoothService.requestPermissions().then((granted) => {
      if (!granted) {
        console.warn("Bluetooth permissions not granted");
      }
    });
  }, []);

  const handleScan = async () => {
    setIsScanning(true);
    try {
      const availableDevices = await bluetoothService.scanDevices();
      setDevices(availableDevices);
    } catch (error) {
      console.error("Scan failed:", error);
    } finally {
      setIsScanning(false);
    }
  };

  const handleConnect = async (deviceId: string) => {
    setIsConnecting(true);
    try {
      const success = await bluetoothService.connect(deviceId);
      if (success) {
        router.push("/resident/devices");
      } else {
        console.warn("Connection failed");
      }
    } catch (error) {
      console.error("Connection error:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 p-4 justify-center items-center">
        <Text className="text-2xl font-bold text-gray-900 mb-6 font-[Inter-Regular]">
          Connect Your Home Devices
        </Text>
        <TouchableOpacity
          className="bg-blue-500 py-3 px-6 rounded-lg mb-4"
          onPress={handleScan}
          disabled={isScanning}
        >
          <Text className="text-white text-center font-semibold">
            {isScanning ? "Scanning..." : "Scan for Devices"}
          </Text>
        </TouchableOpacity>
        {isScanning && <ActivityIndicator size="large" color="#0000ff" />}
        <View className="w-full">
          {devices.map((deviceId) => (
            <TouchableOpacity
              key={deviceId}
              className="bg-white p-4 rounded-lg shadow my-1 flex-row justify-between items-center"
              onPress={() => handleConnect(deviceId)}
              disabled={isConnecting}
            >
              <Text className="text-lg text-gray-900 font-[Inter-Regular]">
                Device: {deviceId}
              </Text>
              {isConnecting && (
                <ActivityIndicator size="small" color="#0000ff" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
