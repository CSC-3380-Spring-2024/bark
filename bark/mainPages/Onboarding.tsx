import {
  View,
  Text,
  StyleSheet,
  Button,
  Pressable,
  ScrollView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
} from "react-native";

import {
  FIREBASE_DATABASE,
  FIREBASE_AUTH,
  FIREBASE_STORAGE,
} from "../FirebaseConfig";
import { set, ref, get } from "@firebase/database";
import { ImageUploader } from "../components/imageUploader";
import { Chips } from "../components/Chips";
import { useState, useEffect } from "react";
import { ref as storageRef, getDownloadURL, list } from "@firebase/storage";

export default function Onboarding(props: {
  editingProf: (arg0: boolean) => void;
  signingUp: (arg0: boolean) => void;
  editProf: boolean;
  nameProp: string;
  dogNameProp: string;
  bioProp: string;
}) {
  const [name, setName] = useState<string>(props.nameProp);
  const [dogName, setDogName] = useState<string>(props.dogNameProp);
  const [bio, setBio] = useState<string>(props.bioProp);
  const [characterCount, setCharacterCount] = useState<number>(0);
  // const [image0, setImage0] = useState<string>();
  // const [image1, setImage1] = useState<string>();
  // const [image2, setImage2] = useState<string>();
  // const [image3, setImage3] = useState<string>();
  // const [image4, setImage4] = useState<string>();

  // function setRightImage(uri: string, index: number) {
  //   switch (index) {
  //     case 0:
  //       setImage0(uri);
  //       break;
  //     case 1:
  //       setImage1(uri);
  //       break;
  //     case 2:
  //       setImage2(uri);
  //       break;
  //     case 3:
  //       setImage3(uri);
  //       break;
  //     case 4:
  //       setImage4(uri);
  //       break;
  //     default:
  //       break;
  //   }
  // }
  // useEffect(() => {
  //   const getImage = async () => {
  //     //getStorageRef
  //     for (let i = 0; i < 5; i++) {
  //       const imgRef = storageRef(
  //         FIREBASE_STORAGE,
  //         `images/${FIREBASE_AUTH.currentUser?.uid}/profileImage${i}`
  //       );

  //       await getDownloadURL(imgRef)
  //         .then((response) => {
  //           setRightImage(response, i);
  //         })
  //         .catch((response) => {
  //           console.log(response);
  //         });
  //     }
  //   };

  //   if (image0 == undefined) {
  //     getImage();
  //   }
  // }, []);

  const submitScreen = async () => {
    if (name === "" || dogName === "" || bio === "") {
      Alert.alert("Please fill out all of the text fields");
    } else {
      const response = await set(
        ref(FIREBASE_DATABASE, "users/" + FIREBASE_AUTH.currentUser?.uid),
        {
          name: name,
          dogName: dogName,
          bio: bio,
          onBoarded: true,
        }
      ).then((reply) => {
        console.log(reply);
        props.editingProf(false);
        props.signingUp(true);
      });
    }
  };

  const back = () => {
    props.editingProf(false);
  };

  return (
    <>
      <KeyboardAvoidingView style={styles.mainContainer} behavior="padding">
        <ScrollView>
          {/* Back button only appears if in edit settings mode not setting up account */}
          {props.editProf && (
            <Pressable onPress={back} style={styles.button}>
              <Text style={styles.buttonText}> {"<"} Back </Text>
            </Pressable>
          )}
          {/*Get Owner's and Dog's name */}
          <View style={styles.screen}>
            <Text style={styles.text}>Owner name</Text>
            <TextInput
              onChangeText={setName}
              defaultValue={props.nameProp}
              style={styles.textInputs}
              placeholder="Type YOUR name here"
            ></TextInput>
          </View>
          <View style={styles.screen}>
            <Text style={styles.text}>Dog name</Text>
            <TextInput
              onChangeText={setDogName}
              defaultValue={props.dogNameProp}
              style={styles.textInputs}
              placeholder={'ex: "Susie"'}
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
              defaultValue={props.bioProp}
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
      </KeyboardAvoidingView>
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
    alignSelf: "flex-start",
    borderRadius: 10,
    borderWidth: 2.5,
    borderColor: "#825D09",
    marginHorizontal: "3%",
    marginVertical: "3%",
  },
  buttonText: {
    fontSize: 20,
    color: "#825D09",
    fontWeight: "bold",
  },
  screen: {
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  },
  characterLimitText: {
    fontStyle: "italic",
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: "2%",
  },
  mainContainer: {
    backgroundColor: "#f0eada",
  },
  textInputs: {
    borderBottomWidth: 4,
    borderColor: "#825D09",
    height: 60,
    fontSize: 16,
    marginBottom: 5,
    marginTop: -5
  },
  textInputsBio: {
    borderColor: "#825D09",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    height: 160,
    fontSize: 15,
    padding: 10,
    backgroundColor: "white"
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
