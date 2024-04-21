import {
  View,
  Text,
  StyleSheet,
  Button,
  Pressable,
  ScrollView,
  TextInput,
} from "react-native";

import {
  FIREBASE_DATABASE,
  FIREBASE_AUTH,
  FIREBASE_STORAGE,
} from "../FirebaseConfig";
import { set, ref, get } from "@firebase/database";
import { ImageUploader } from "../components/imageUploader";
import { Chips } from "../components/Chips";
import { useState, useMemo } from "react";
import { ref as storageRef, getDownloadURL, list } from "@firebase/storage";

export default function Onboarding(props: {
  editingProf: (arg0: boolean) => void;
  editProf: boolean;
}) {
  const [name, setName] = useState<string>("");
  const [dogName, setDogName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [characterCount, setCharacterCount] = useState<number>(0);
  const tags = new Array(15).fill(false);
  const [onBoarded, onBoard] = useState<boolean>(false);

  const submitScreen = async () => {
    const response = await set(
      ref(FIREBASE_DATABASE, "users/" + FIREBASE_AUTH.currentUser?.uid),
      {
        name: name,
        dogName: dogName,
        bio: bio,
        onBoarded: true,
        tags: tags,
      }
    ).then((reply) => {
      console.log(reply);
      props.editingProf(false);
    });
  };

  const back = () => {
    props.editingProf(false);
  };

  // const updateVals = async () => {
  //   const response = await set(
  //     ref(FIREBASE_DATABASE, "users/" + FIREBASE_AUTH.currentUser?.uid),
  //     {
  //       name: name,
  //       dogName: dogName,
  //       bio: bio,
  //       onBoarded: true,
  //       tags: tags,
  //     }
  //   ).then((reply) => {
  //     console.log("updated");
  // });
  //}

  //DATABASE REFERENCE
  const userRef = ref(
    FIREBASE_DATABASE,
    `users/${FIREBASE_AUTH.currentUser?.uid}/`
  );

  //PULL USER DATA FROM DATABASE
  get(userRef).then((snapshot) => {
    if (snapshot.exists()) {
      // setName(snapshot.val().name);
      // setBio(snapshot.val().bio);
      // setPronouns(snapshot.val().pronouns);
      // setDogName(snapshot.val().dogName);
      // setTags(useMemo(()=>snapshot.val().tags,[]));
      onBoard(snapshot.val().onBoarded);
    } else {
    }
  });

  return (
    <>
      <ScrollView style={styles.mainContainer}>
        {/* {props.editProf && <Button onPress={back} title="< Back" />} */}
        {/*Get Owner's and Dog's name */}
        {props.editProf && (
          <Pressable onPress={back} style={styles.button}>
            <Text style={styles.buttonText}> {"<"} Back </Text>
          </Pressable>
        )}
        <View style={styles.screen}>
          <Text style={styles.text}>Name</Text>
          <TextInput
            onChangeText={setName}
            value={name}
            style={styles.textInputs}
            placeholder="Type YOUR name here"
          ></TextInput>
        </View>
        <View style={styles.screen}>
          <Text style={styles.text}>Dog name</Text>
          <TextInput
            onChangeText={setDogName}
            value={dogName}
            style={styles.textInputs}
            placeholder={'ex: "susie"'}
          ></TextInput>
        </View>
        {/*Then get pictures */}
        <View style={styles.screen}>
          <Text style={styles.text}>Pictures</Text>
          <ScrollView horizontal={true} style={styles.profileImagesContainer}>
            <ImageUploader index={0} />
            <ImageUploader index={1} />
            <ImageUploader index={2} />
            <ImageUploader index={3} />
            <ImageUploader index={4} />
          </ScrollView>
        </View>
        {/*Get profile bio*/}
        <View style={styles.screen}>
          <Text style={styles.text}>Bio</Text>
          <TextInput
            onChangeText={(text) => {
              setBio(text);
              setCharacterCount(text.length);
            }}
            value={bio}
            placeholder="Bio here..."
            maxLength={240}
            multiline={true}
            scrollEnabled={false}
            style={styles.textInputsBio}
          ></TextInput>
          <Text style={styles.characterLimitText}>{characterCount} / 240</Text>
        </View>

        <View style={{ alignSelf: "center", marginBottom: "5%" }}>
          <Pressable onPress={submitScreen} style={styles.button}>
            <Text style={styles.buttonText}> Finish profile </Text>
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  profileImagesContainer: {
    flexDirection: "row",
    height: 260,
    marginLeft: 0,
  },
  button: {
    // backgroundColor: "",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 2.5,
    borderColor: "sienna",
    marginHorizontal: "3%",
    marginVertical: "3%",
  },
  buttonText: {
    fontSize: 20,
    color: "sienna",
    fontWeight: "bold",
  },
  screen: {
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
  },
  characterLimitText: {
    fontStyle: "italic",
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: "2%",
  },
  centered: {},
  mainContainer: {
    backgroundColor: "#f0eada",
  },
  textInputs: {
    borderBottomWidth: 5,
    borderColor: "black",
    height: 60,
    fontSize: 25,
    fontWeight: "bold",
  },
  textInputsBio: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    height: 160,
    fontSize: 15,
    padding: 10,
  },
  button: {
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 25,
    height: 50,
    marginTop: 15,
  },
  buttonText: {
    justifyContent: "center",
    fontWeight: "bold",
    alignContent: "center",
    textAlign: "center",
    paddingTop: 10,
  },
});

///////////////////////////ALL CODE BELOW HERE APPEARS ON PROFILE.TSX IF THE USER HAS NOT SET UP THEIR PROFILE////////////////

/**const styles = StyleSheet.create({
    container:{
        flex: 1,
        margin: 35,
        marginTop: 50,
        justifyContent: 'center',
        verticalAlign: 'middle',
        //backgroundColor: 'black',
    },
    text:{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 0,
    },
    button:{
        borderColor: 'black',
        borderWidth: 3,
        borderRadius: 25,
        height: 50,
        marginTop: 15,
    },
    buttonText:{
        justifyContent: 'center',
        fontWeight: 'bold',
        alignContent: 'center',
        textAlign: 'center',
        paddingTop: 10,
    }
})

*/

/**
 * <View style = {styles.container}>
        <Text style={styles.text}>Lets begin setting up your profile</Text>
        <Pressable onPress = {() => {console.log("Pressed")}} style = {({pressed}) => [styles.button, {backgroundColor: pressed ? '#5c5454' : 'white'}]}>
            <Text style = {styles.buttonText}>Lets go!</Text>
        </Pressable>
    </View>
 * 
 * 
 * 
 */
