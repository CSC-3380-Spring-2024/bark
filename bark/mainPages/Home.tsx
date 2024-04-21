import { View, Text, Pressable } from "react-native";
import generateProfiles from "../components/generateProfiles";

export default function Home() {
  const profiles: string[] = [];
  async function generateProf() {
    await generateProfiles()
      .then((promise) => {
        promise.forEach((uid) => {
          profiles.push(uid);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
}
