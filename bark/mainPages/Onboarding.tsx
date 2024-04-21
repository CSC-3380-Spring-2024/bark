import {
  View,
  Text,
  StyleSheet,
  Button,
  Pressable,
  ScrollView,
  TextInput,
} from "react-native";


import { FIREBASE_DATABASE, FIREBASE_AUTH, FIREBASE_STORAGE } from "../FirebaseConfig";
import { set, ref, get } from "@firebase/database";
import { ImageUploader } from "../components/imageUploader";
import { Chips } from "../components/Chips";
import { useState, useMemo } from "react";
import { ref as storageRef, getDownloadURL, list } from "@firebase/storage";


export default function Onboarding({ navigation }: { navigation: any }) {
  const [name, setName] = useState<string>("");
  const [dogName, setDogName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [characterCount, setCharacterCount] = useState<number>(0);
  const tags = new Array(15).fill(false);

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
      props.editingProf(false)}
    );
  };

  const back = () =>{
    props.editingProf(false);
  };

  const updateVals = async () => {
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
      console.log("updated");
  });
  }
  const userRef = ref(
    FIREBASE_DATABASE,
    `users/${FIREBASE_AUTH.currentUser?.uid}/`
  );
  // var name1 ="";
  // var dogName1 = "";
  // var bio1 = "";
  get(userRef).then((snapshot) => {
      
      // name1 = snapshot.val().name;
      // dogName1 = snapshot.val().dogName;
      // bio1 = snapshot.val().bio;
      // setName(snapshot.val().name);
      // setDogName(snapshot.val().dogName);
      // setBio(snapshot.val().bio);
  });

  const textHandler = (text : string) =>{
    setName(text);
    updateVals();
  }

  return (
    <>
      <ScrollView style={styles.mainContainer}>
        <Button onPress={()=>{}} title = "< Back" />
        {/*Get Owner's and Dog's name */}
        <Pressable onPress={back} style = {styles.button}>
            <Text style = {styles.buttonText}> Back </Text>
          </Pressable>
        <View style={styles.screen}>
          <Text style={styles.text}>Name</Text>
          <TextInput
            onChangeText={setName}
            //onKeyPress={(value)=>textHandler(value.nativeEvent.key)}
            //onSubmitEditing={(value) => textHandler(value.nativeEvent.text)}
            //onEndEditing={(value) => textHandler(value.nativeEvent.text)}
            value={name}
            //defaultValue={name}
            style={styles.textInputs}
            placeholder="Type YOUR name here"
          ></TextInput>
        </View>
        <View style={styles.screen}>
          <Text style={styles.text}>Dog name</Text>
          <TextInput
            onChangeText={setDogName}
            //defaultValue={dogName}
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
        {/*Get tags for the profile*/}
        <View style={styles.screen}>
          <Text style={styles.text}>Now Select all that apply</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View>
              <Chips
                onPress={() => {
                  tags[0] = !tags[0];
                }}
                chipTitle="Sample"
              />
              <Chips
                onPress={() => {
                  tags[1] = !tags[1];
                }}
                chipTitle="Sample"
              />
              <Chips
                onPress={() => {
                  tags[2] = !tags[2];
                }}
                chipTitle="Sample"
              />
              <Chips
                onPress={() => {
                  tags[3] = !tags[3];
                }}
                chipTitle="Sample"
              />
              <Chips
                onPress={() => {
                  tags[4] = !tags[4];
                }}
                chipTitle="Sample"
              />
            </View>
            <View>
              <Chips
                onPress={() => {
                  tags[5] = !tags[5];
                }}
                chipTitle="Sample"
              />
              <Chips
                onPress={() => {
                  tags[6] = !tags[6];
                }}
                chipTitle="Sample"
              />
              <Chips
                onPress={() => {
                  tags[7] = !tags[7];
                }}
                chipTitle="Sample"
              />
              <Chips
                onPress={() => {
                  tags[8] = !tags[8];
                }}
                chipTitle="Sample"
              />
              <Chips
                onPress={() => {
                  tags[9] = !tags[9];
                }}
                chipTitle="Sample"
              />
            </View>
            <View>
              <Chips
                onPress={() => {
                  tags[10] = !tags[10];
                }}
                chipTitle="Sample"
              />
              <Chips
                onPress={() => {
                  tags[11] = !tags[11];
                }}
                chipTitle="Sample"
              />
              <Chips
                onPress={() => {
                  tags[12] = !tags[12];
                }}
                chipTitle="Sample"
              />
              <Chips
                onPress={() => {
                  tags[13] = !tags[13];
                }}
                chipTitle="Sample"
              />
              <Chips
                onPress={() => {
                  tags[14] = !tags[14];
                }}
                chipTitle="Sample"
              />
            </View>
          </View>
        </View>

        <View style={{alignSelf:'center', marginBottom:"5%"}}>
          <Pressable onPress={submitScreen} style = {styles.button}>
            <Text style = {styles.buttonText}> Finish profile </Text>
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
  button:{
    backgroundColor: 'beige',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginHorizontal: "2%",
  },
  buttonText:{
    fontSize:20
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
    marginBottom: "2%"
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
