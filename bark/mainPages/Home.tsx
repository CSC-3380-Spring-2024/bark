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
  ActivityIndicator,
} from "react-native";
import generateProfiles from "../components/generateProfiles";
import GeneratedProf from "../components/generatedProfile";
import { useEffect, useState } from "react";
import { push, ref, get } from "@firebase/database";
import { FIREBASE_AUTH, FIREBASE_DATABASE } from "../FirebaseConfig";
const dimensions = Dimensions.get("window");

export default function Home() {
  const [currentProf, setCurrentProf] = useState<number>(0);
  const [profiles, setProfiles] = useState<string[]>([]);
  const [matchedProfiles, setMatchedProfiles] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const profileList = await generateProfiles();
        const filter = profileList.filter((uid) => {
          return uid !== FIREBASE_AUTH.currentUser?.uid;
        });
        setProfiles(filter);
        setLoading(false);
      } catch (error) {
        console.log(error);
        Alert.alert("Failed to load profiles");
      }
    };

    const fetchMatches = async () => {
      try {
        const snapshot = await get(
          ref(
            FIREBASE_DATABASE,
            `users/${FIREBASE_AUTH.currentUser?.uid}/matches`
          )
        );
        const matches: string[] = [];

        snapshot.forEach((child) => {
          matches.push(child.val());
        });
        setMatchedProfiles(matches);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMatches();
    if (profiles.length === 0) {
      fetchProfiles();
    }

    return () => {};
  }, []);

  const accept = async () => {
    console.log("accepted");
    const likedProfile = profiles[currentProf];
    push(
      ref(FIREBASE_DATABASE, `users/${FIREBASE_AUTH.currentUser?.uid}/matches`),
      likedProfile
    );

    const otherUsersLikesSnapshot = await get(
      ref(FIREBASE_DATABASE, `users/${likedProfile}/matches`)
    );

    const otherUserLikes: string[] = [];
    console.log(otherUsersLikesSnapshot);
    otherUsersLikesSnapshot.forEach((value) => {
      console.log(value.val());
      otherUserLikes.push(value.val());
    });

    const currentUser = FIREBASE_AUTH.currentUser?.uid;
    console.log(currentUser);
    console.log(likedProfile);
    console.log(otherUserLikes + "\n\n\n");
    console.log(currentUser && otherUserLikes.includes(currentUser));
    if (currentUser && otherUserLikes.includes(currentUser)) {
      const chatId = generateChatId(currentUser, likedProfile);
      console.log("Pushing 2 firebase:D");
      push(ref(FIREBASE_DATABASE, `users/${currentUser}/chats`), chatId);
      push(ref(FIREBASE_DATABASE, `users/${likedProfile}/chats`), chatId);
    }

    let i = currentProf;
    while (matchedProfiles.includes(profiles[i])) {
      i++;
    }

    setCurrentProf(i);
  };

  function generateChatId(uid1: string, uid2: string) {
    return `${uid1}.${uid2}`;
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
      {profiles.length > 0 && profiles.length > currentProf && (
        <GeneratedProf
          uuid={profiles[currentProf]}
          deny={deny}
          accept={accept}
        />
      )}
      {profiles.length <= currentProf && <Text>No profiles avalible</Text>}
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
