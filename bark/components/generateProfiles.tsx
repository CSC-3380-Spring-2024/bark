import { ref, get } from "@firebase/database";
import { FIREBASE_DATABASE } from "../FirebaseConfig";
export default async function generateProfiles() {
  const userRef = ref(FIREBASE_DATABASE, "/users");
  const profiles: string[] = [];
  await get(userRef).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(
        snapshot.forEach((child) => {
          profiles.push(child.key);
        })
      );
    }
  });

  const shuffledProfiles = shuffle(profiles);
  return shuffledProfiles;
}

function shuffle(profile: string[]) {
  //Fisher-Yates algorithm for unbaised shuffling
  for (let i = profile.length - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1));
    [profile[i], profile[j]] = [profile[j], profile[i]];
  }

  return profile;
}
