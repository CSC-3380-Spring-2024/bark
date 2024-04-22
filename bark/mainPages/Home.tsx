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
import { useEffect, useState } from "react";
import { push, ref } from "@firebase/database";
import { FIREBASE_AUTH, FIREBASE_DATABASE } from "../FirebaseConfig";
const dimensions = Dimensions.get("window");

export default function Home() {
  const [currentProf, setCurrentProf] = useState<number>(0);
  const [profiles, setProfile] = useState<string[]>([]);

  useEffect(() => {
    async function generateProf() {
      const prof: string[] = [];
      await generateProfiles()
        .then((promise) => {
          promise.forEach((uid) => {
            prof.push(uid);
          });
          setProfile(prof);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (profiles[0] == null) {
      generateProf();
    }
  }, []);

  function accept() {
    console.log("accepted");
    push(
      ref(FIREBASE_DATABASE, `users/${FIREBASE_AUTH.currentUser?.uid}/matches`),
      profiles[currentProf]
    );
    setCurrentProf(currentProf + 1);
  }

  function deny() {
    console.log("accepted");
    setCurrentProf(currentProf + 1);
  }

  return (
    <GeneratedProf uuid={profiles[currentProf]} deny={deny} accept={accept} />
  );
}
