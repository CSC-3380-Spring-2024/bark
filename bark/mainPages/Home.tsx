import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  Button,
  Alert,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import generateProfiles from "../components/generateProfiles";
import GeneratedProf from "../components/generatedProfile";
const dimensions = Dimensions.get("window");

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

  return <GeneratedProf uuid="ROLJCQwcPZfNv5vcKa0Qbu3cDQ12" />;
}
