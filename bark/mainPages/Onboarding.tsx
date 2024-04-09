import {
  View,
  Text,
  StyleSheet,
  Button,
  Pressable,
  ScrollView,
  TextInput,
} from "react-native";

import { FIREBASE_DATABASE, FIREBASE_AUTH } from "../FirebaseConfig";
import { set, ref } from "@firebase/database";
import { ImageUploader } from "../components/imageUploader";
import { Chips } from "../components/Chips";
import { useState } from "react";

export default function Onboarding({ navigation }: { navigation: any }) {
  const [name, setName] = useState<string>("");
  const [dogName, setDogName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [tags, setTags] = useState([15]);

  const submitScreen = async () => {
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
    });
  };

  return (
    <>
      <ScrollView style={styles.mainContainer}>
        {/*Get Owner's and Dog's name */}
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
          <Text style={styles.text}>Then lets get your dog's name</Text>
          <TextInput
            onChangeText={setDogName}
            value={dogName}
            style={styles.textInputs}
            placeholder={'ex: "susie"'}
          ></TextInput>
        </View>
        {/*Then get pictures */}
        <View style={styles.screen}>
          <Text style={styles.text}> Next, lets get some pictures.</Text>
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
          <Text style={styles.text}>Now, lets get to know about your pup!</Text>
          <TextInput
            onChangeText={setBio}
            value={bio}
            placeholder="Bio here..."
            maxLength={240}
            multiline={true}
            scrollEnabled={false}
            style={styles.textInputsBio}
          ></TextInput>
        </View>
        {/*Get tags for the profile*/}
        <View style={styles.screen}>
          <Text style={styles.text}>Now Select all that apply</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View>
              <Chips onPress={() => {}} chipTitle="Sample" />
              <Chips onPress={() => {}} chipTitle="Sample" />
              <Chips onPress={() => {}} chipTitle="Sample" />
              <Chips onPress={() => {}} chipTitle="Sample" />
              <Chips onPress={() => {}} chipTitle="Sample" />
            </View>
            <View>
              <Chips onPress={() => {}} chipTitle="Sample" />
              <Chips onPress={() => {}} chipTitle="Sample" />
              <Chips onPress={() => {}} chipTitle="Sample" />
              <Chips onPress={() => {}} chipTitle="Sample" />
              <Chips onPress={() => {}} chipTitle="Sample" />
            </View>
            <View>
              <Chips onPress={() => {}} chipTitle="Sample" />
              <Chips onPress={() => {}} chipTitle="Sample" />
              <Chips onPress={() => {}} chipTitle="Sample" />
              <Chips onPress={() => {}} chipTitle="Sample" />
              <Chips onPress={() => {}} chipTitle="Sample" />
            </View>
          </View>
        </View>

        <View style={styles.screen}>
          <Pressable onPress={submitScreen}>
            <Text>Finish profile</Text>
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
  screen: {
    marginTop: "65%",
    marginBottom: "55%",
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
  },
  centered: {},
  mainContainer: {},
  textInputs: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    height: 60,
    fontSize: 30,
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
