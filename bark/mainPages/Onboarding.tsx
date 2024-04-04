import {
  View,
  Text,
  StyleSheet,
  Button,
  Pressable,
  ScrollView,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import { ImageUploader } from "../components/imageUploader";
import { Chips } from "../components/Chips";
import { useState } from "react";

export default function Onboarding({ navigation }: { navigation: any }) {
  const [name, setName] = useState<string>("");
  const [dogName, setDogName] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  return (
    <>
      <ScrollView>
        {/*Get Owner's and Dog's name */}
        <Text>Lets start with your name</Text>
        <TextInput
          onChangeText={setName}
          value={name}
          placeholder="Type YOUR name here"
        ></TextInput>
        <Text>Then lets get your dog's name</Text>
        <TextInput
          onChangeText={setDogName}
          value={dogName}
          placeholder="Type your DOG's name here"
        ></TextInput>

        {/*Then get pictures */}
        <Text> Next, lets get some pictures.</Text>
        <ScrollView horizontal={true} style={styles.profileImagesContainer}>
          <ImageUploader index={0} />
          <ImageUploader index={1} />
          <ImageUploader index={2} />
          <ImageUploader index={3} />
          <ImageUploader index={4} />
        </ScrollView>

        {/*Get profile bio*/}
        <Text>Now, lets get to know about your pup!</Text>
        <TextInput
          onChangeText={setBio}
          value={bio}
          placeholder="Bio here..."
          maxLength={240}
          multiline={true}
        ></TextInput>

        {/*Get tags for the profile*/}
        <Text>Now Select all that apply</Text>
        <Chips onPress={() => {}} chipTitle="Sample" />
        <Pressable>
          <Text>Finish profile</Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  profileImagesContainer: {
    flexDirection: "row",
    height: 260,
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
