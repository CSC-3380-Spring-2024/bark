import React, { useEffect, useState, useMemo } from "react";
import { Chips } from "../components/Chips";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Button,
  Alert,
  Pressable,
} from "react-native";

import DogLogo from '../assets/barkLogo.png';

import {
  FIREBASE_DATABASE,
  FIREBASE_AUTH,
  FIREBASE_STORAGE,
} from "../FirebaseConfig";
import { ref, get } from "@firebase/database";
import { ref as storageRef, getDownloadURL } from "@firebase/storage";
import Onboarding from "./Onboarding";
import Settings from "./Settings";

export default function Profile() {
  //ALL STATE HOOKS
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [pronouns, setPronouns] = useState<string>("");
  const [dogName, setDogName] = useState<string>("");
  const [image0, setImage0] = useState<string>();
  const [image1, setImage1] = useState<string>();
  const [image2, setImage2] = useState<string>();
  const [image3, setImage3] = useState<string>();
  const [image4, setImage4] = useState<string>();
  const [tags, setTags] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [editProf, editingProf] = useState<boolean>(false);
  const [settings, goToSettings] = useState<boolean>(false);

  const images = new Array(5).fill("");

  //DATABASE REFERENCE
  const userRef = ref(
    FIREBASE_DATABASE,
    `users/${FIREBASE_AUTH.currentUser?.uid}/`
  );

  //PULL USER DATA FROM DATABASE
  get(userRef).then((snapshot) => {
    if (snapshot.exists()) {
      setName(snapshot.val().name);
      setBio(snapshot.val().bio);
      setPronouns(snapshot.val().pronouns);
      setDogName(snapshot.val().dogName);
      setTags(useMemo(() => snapshot.val().tags, []));
    } else {
    }
  });

  function setRightImage(uri: string, index: number) {
    switch (index) {
      case 0:
        setImage0(uri);
        break;
      case 1:
        setImage1(uri);
        break;
      case 2:
        setImage2(uri);
        break;
      case 3:
        setImage3(uri);
        break;
      case 4:
        setImage4(uri);
        break;
      default:
        break;
    }
  }
  useEffect(() => {
    const getImage = async () => {
      //getStorageRef
      for (let i = 0; i < 5; i++) {
        const imgRef = storageRef(
          FIREBASE_STORAGE,
          `images/${FIREBASE_AUTH.currentUser?.uid}/profileImage${i}`
        );

        await getDownloadURL(imgRef)
          .then((response) => {
            setRightImage(response, i);
          })
          .catch((response) => {
            console.log(response);
          });
      }
    };

    if (image0 == undefined) {
      getImage();
    }
  }, []);
  return editProf ? (
    <Onboarding
      editingProf={editingProf}
      editProf={editProf}
      nameProp={name}
      dogNameProp={dogName}
      bioProp={bio}
    />
  ) : settings ? (
    <Settings goToSettings={goToSettings} />
  ) : (
    <ScrollView style={styles.mainContainer} bounces={false}>
      <View style={{ flexGrow: 1, marginHorizontal: "3%" }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.dogName}>{dogName}</Text>
          <View style={{ flexDirection: "row" }}>
            <Pressable style={styles.button} onPress={() => editingProf(true)}>
              <Image
                source={require("../assets/pencil.png")}
                style={styles.gear}
              ></Image>
            </Pressable>
            <Pressable style={styles.button} onPress={() => goToSettings(true)}>
              <Image
                source={require("../assets/gear2.png")}
                style={styles.gear}
              ></Image>
            </Pressable>
          </View>
        </View>

        {/* {pronouns && <Text style={styles.dognouns}>{pronouns} </Text>} */}
        <View
          style={{
            flex: 1,
            height: 2,
            backgroundColor: "black",
            marginBottom: 10,
          }}
        />
      </View>
      <View style={{ flexGrow: 1 }}>
        <ScrollView horizontal={true}>
          {image0 && <Image style={styles.image} source={{ uri: image0 }} />}
          {image1 && <Image style={styles.image} source={{ uri: image1 }} />}
          {image2 && <Image style={styles.image} source={{ uri: image2 }} />}
          {image3 && <Image style={styles.image} source={{ uri: image3 }} />}
          {image4 && <Image style={styles.image} source={{ uri: image4 }} />}
        </ScrollView>
      </View>
      <View style={{ flexGrow: 1 }}>
        <View
          style={{
            height: 2,
            backgroundColor: "black",
            marginHorizontal: "3%",
            marginVertical: 5,
            marginTop: "3%",
          }}
        />
        <Text style={styles.title}>Bio:</Text>

        <Text style={styles.infoText}>{bio}</Text>
        <View
          style={{
            height: 2,
            backgroundColor: "black",
            marginHorizontal: "3%",
            marginVertical: 0,
            marginBottom: "3%",
          }}
        />
        <View style={{flexDirection:"row", justifyContent:"center"}}>
          <Text style={styles.ownerName}>Owner: </Text>
          <Text style={styles.ownerName}>{name}</Text>
        </View>
        <Image source={DogLogo} style={styles.logo} />
      </View>


    </ScrollView>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#f0eada",
  },
  dogName: {
    fontSize: 25,
    color: "black",
    flexWrap: "wrap",
    marginTop: 10,
    marginVertical: 5,
    fontWeight: "bold",
  },
  ownerName: {
    fontSize: 16,
    color: "black",
    alignSelf: "center",
    fontWeight: "bold",
  },
  infoText: {
    fontSize: 16,
    color: "black",
    marginVertical: 0,
    marginHorizontal: 10,
    marginBottom: 10
  },
  dognouns: {
    fontSize: 15,
    color: "black",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 225,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginHorizontal: 5,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderColor: "black",
    borderWidth: 3,
    alignSelf: "center",
    marginVertical: 5,
    marginHorizontal: 5,
  },
  button: {
    borderBlockColor: "black",
    borderColor: "black",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginRight: 5,
    marginVertical: 5,
    //flexDirection:'row-reverse',
    alignSelf: "flex-end",
  },
  buttonText: {
    fontSize: 20,
    alignSelf: "center",
  },
  line: {
    fontSize: 30,
    alignSelf: "stretch",
  },
  title: {
    fontSize: 18,
    marginHorizontal: 10,
    marginBottom: 5,
    fontWeight: "bold",
  },
  gear: {
    width: 25,
    height: 25,
    backgroundColor: "transparent",
    marginLeft: 8
  },
  logo:{
    width: 70,
    height: 70,
    alignSelf: "center",
    marginTop: 80,
    marginLeft: -15
  }
});