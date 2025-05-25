import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebaseConfig"

type Message = {
  id: string;
  text: string;
  sender: "resident" | "caretaker";
  timestamp: string;
};

const ChatBubble = ({ message }: { message: Message }) => {
  const isResident = message.sender === "resident";
  return (
    <View
      className={`p-3 rounded-lg mb-2 max-w-[80%] ${
        isResident ? "bg-blue-500 self-end" : "bg-gray-200 self-start"
      }`}
    >
      <Text
        className={`text-base font-[Inter-Regular] ${
          isResident ? "text-white" : "text-gray-900"
        }`}
      >
        {message.text}
      </Text>
      <Text
        className={`text-xs font-[Inter-Regular] mt-1 ${
          isResident ? "text-white/70" : "text-gray-500"
        }`}
      >
        {new Date(message.timestamp).toLocaleTimeString()}
      </Text>
    </View>
  );
};

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    // Listen for messages in Firestore
    const q = query(collection(db, "chats"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messageList: Message[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[];
      setMessages(messageList);
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    try {
      await addDoc(collection(db, "chats"), {
        text: inputText,
        sender: "resident",
        timestamp: new Date().toISOString(),
      });
      setInputText("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 p-4">
        <Text className="text-2xl font-bold text-gray-900 mb-4 font-[Inter-Regular] text-center">
          Chat with Caretaker
        </Text>
        <FlatList
          data={messages}
          renderItem={({ item }) => <ChatBubble message={item} />}
          keyExtractor={(item) => item.id}
          className="flex-1 mb-2"
          contentContainerStyle={{ paddingBottom: 10 }}
        />
        <View className="flex-row items-center bg-white p-3 rounded-lg shadow">
          <TextInput
            className="flex-1 text-base font-[Inter-Regular] text-gray-900"
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message..."
            placeholderTextColor="#6b7280"
          />
          <TouchableOpacity
            className="bg-blue-500 p-2 rounded-lg"
            onPress={sendMessage}
            disabled={!inputText.trim()}
          >
            <Text className="text-white font-semibold font-[Inter-Regular]">
              Send
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
