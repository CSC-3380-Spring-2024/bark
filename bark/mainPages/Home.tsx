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
import { push, ref, get } from "@firebase/database";
import { FIREBASE_AUTH, FIREBASE_DATABASE } from "../FirebaseConfig";
const dimensions = Dimensions.get("window");

export default function Home() {
  const [currentProf, setCurrentProf] = useState<number>(0);
  const [profiles, setProfile] = useState<string[]>([]);
  const [matchedProfiles, setMatchedProfiles] = useState<string[]>([]);

  useEffect(() => {
    async function generateProf() {
      const prof: string[] = [];
      await generateProfiles()
        .then((promise) => {
          promise.forEach((uid) => {
            if (uid != FIREBASE_AUTH.currentUser?.uid) {
              prof.push(uid);
            }
          });
          setProfile(prof);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    async function generateMatches() {
      const match: string[] = [];
      await get(
        ref(
          FIREBASE_DATABASE,
          `users/${FIREBASE_AUTH.currentUser?.uid}/matches`
        )
      )
        .then((promise) => {
          promise.forEach((key) => {
            match.push(key.val());
          });
          setMatchedProfiles(match);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    generateMatches();
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
    let i = currentProf;
    while (matchedProfiles.includes(profiles[i])) {
      i++;
    }

    setCurrentProf(i);
  }

  function deny() {
    console.log("denied");
    let i = currentProf + 1;
    while (matchedProfiles.includes(profiles[i])) {
      i++;
    }
    console.log(i);
    setCurrentProf(i);
  }

  return (
    <>
      <GeneratedProf uuid={profiles[currentProf]} deny={deny} accept={accept} />
    </>
  );
}
