import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import Slider from "@react-native-community/slider";
import { bluetoothService } from "../../services/bluetooth";

const DeviceControl = ({
  title,
  commandPrefix,
}: {
  title: string;
  commandPrefix: string;
}) => {
  const [isOn, setIsOn] = useState(false);
  const [value, setValue] = useState(0);

  const toggleDevice = async () => {
    try {
      await bluetoothService.sendCommand(
        `${commandPrefix}_${isOn ? "OFF" : "ON"}`
      );
      setIsOn(!isOn);
    } catch (error) {
      console.error(`${title} toggle error:`, error);
    }
  };

  const updateValue = async (newValue: number) => {
    setValue(newValue);
    try {
      await bluetoothService.sendCommand(
        `${commandPrefix}_${Math.round(newValue)}`
      );
    } catch (error) {
      console.error(`${title} value update error:`, error);
    }
  };

  return (
    <View className="bg-white p-4 rounded-lg shadow mb-4">
      <Text className="text-lg font-semibold text-gray-900 font-[Inter-Regular] mb-2">
        {title}
      </Text>
      <TouchableOpacity
        className={`py-2 px-4 rounded-lg ${
          isOn ? "bg-green-500" : "bg-red-500"
        }`}
        onPress={toggleDevice}
      >
        <Text className="text-white text-center font-semibold">
          {isOn ? "Turn Off" : "Turn On"}
        </Text>
      </TouchableOpacity>
      {isOn && (
        <View className="mt-4">
          <Text className="text-base text-gray-700 font-[Inter-Regular]">
            {title === "Light" ? "Brightness" : "Speed/Temperature"}:{" "}
            {Math.round(value)}%
          </Text>
          <Slider
            minimumValue={0}
            maximumValue={100}
            step={1}
            value={value}
            onValueChange={updateValue}
            minimumTrackTintColor="#1e40af"
            maximumTrackTintColor="#d1d5db"
            thumbTintColor="#1e40af"
          />
        </View>
      )}
    </View>
  );
};

export default function DevicesScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 p-4">
        <Text className="text-2xl font-bold text-gray-900 mb-6 font-[Inter-Regular] text-center">
          Control Your Devices
        </Text>
        <DeviceControl title="Light" commandPrefix="LIGHT" />
        <DeviceControl title="Fan" commandPrefix="FAN" />
        <DeviceControl title="AC" commandPrefix="AC" />
      </View>
    </SafeAreaView>
  );
}
