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

import {
  FIREBASE_DATABASE,
  FIREBASE_AUTH,
  FIREBASE_STORAGE,
} from "../FirebaseConfig";
import { ref, get } from "@firebase/database";
import { ref as storageRef, getDownloadURL } from "@firebase/storage";

const styles = StyleSheet.create({
    username: {
        fontSize: 35,
        color: "black",
        flexWrap: "wrap",
        marginTop: 5,
        marginVertical:5
    },
    infoText: {
        fontSize: 20,
        color: "black",
        marginVertical:0,
        alignSelf: "center",
        marginHorizontal:10,
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
        width: 195,
        height: 260,
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
        marginHorizontal:5,
  },
    button: {
        borderBlockColor: "black",
        borderColor: "black",
        backgroundColor: "gainsboro",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginRight: 5,
        marginVertical: 5,
        //flexDirection:'row-reverse',
        alignSelf:'flex-end'
  },
    buttonText: {
        fontSize: 20,
        alignSelf: "center",
  },
    line:{
      fontSize:30,
      alignSelf:'stretch'
  },
    title:{
      fontSize:25,
      marginHorizontal:10,
      marginBottom: 10
    }
});

// type userProps = {
//   username: string;
//   dognouns: string;
//   loggedin: boolean;
//   bio: string;
//   dogNames: string;
//   humanName: string;
// };

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
  const [tags, setTags] = useState<boolean[]>([false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,]);

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
      setTags(useMemo(()=>snapshot.val().tags, [tags]));
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
  return (
    <View>
      <View style={{ flexGrow:1, marginHorizontal:15 }}>
              <View style = {{flexDirection:'row', justifyContent:'space-between'}}> 
                <Text style={styles.username}>{dogName}</Text>
                <Pressable style={styles.button}>
                  <Text style={styles.buttonText}>Edit Profile</Text>
                </Pressable>
              </View>
              
              {/* <Text>& {name}</Text>  */}
              {/* {pronouns && <Text style={styles.dognouns}>{pronouns} </Text>} */}
              <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
              <View style={{ height: 2, backgroundColor: 'black', marginBottom:10}} />
      </View>
      <View style={{flexGrow:1}}>
        <ScrollView horizontal={true}>
          {image0 && <Image style={styles.image} source={{ uri: image0 }} />}
          {image1 && <Image style={styles.image} source={{ uri: image1 }} />}
          {image2 && <Image style={styles.image} source={{ uri: image2 }} />}
          {image3 && <Image style={styles.image} source={{ uri: image3 }} />}
          {image4 && <Image style={styles.image} source={{ uri: image4 }} />}
        </ScrollView>
      </View>
      <View style={{flexGrow:1}}>
        <View style={{ height: 2, backgroundColor: 'black', marginHorizontal:15, marginVertical:5, marginTop:15}} />
        <Text style={styles.title}>Bio:</Text>
        
        <Text style={styles.infoText}>{bio}</Text>
        <View style={{ height: 2, backgroundColor: 'black', marginHorizontal:15, marginVertical:5, marginBottom:15}} />
        <Text style={styles.title}>Tags:</Text>
        <ScrollView horizontal = {true} style= {{flexDirection: "row"}}>
                {/* {tags[0] && <Chips onPress={() => {}} chipTitle="1" />}
                {tags[1] && <Chips onPress={() => {}} chipTitle="2" />}
                {tags[2] && <Chips onPress={() => {}} chipTitle="3" />}
                {tags[3] && <Chips onPress={() => {}} chipTitle="4" />}
                {tags[4] && <Chips onPress={() => {}} chipTitle="5" />}
                {tags[5] && <Chips onPress={() => {}} chipTitle="6" />}
                {tags[6] && <Chips onPress={() => {}} chipTitle="7" />}
                {tags[7] && <Chips onPress={() => {}} chipTitle="8" />}
                {tags[8] && <Chips onPress={() => {}} chipTitle="9" />}
                {tags[9] && <Chips onPress={() => {}} chipTitle="10" />}
                {tags[10] && <Chips onPress={() => {}} chipTitle="11" />}
                {tags[11] && <Chips onPress={() => {}} chipTitle="12" />}
                {tags[12] && <Chips onPress={() => {}} chipTitle="13" />}
                {tags[13] && <Chips onPress={() => {}} chipTitle="14" />}
                {tags[14] && <Chips onPress={() => {}} chipTitle="15" />} */}
                <Chips onPress={() => {tags[0] = !tags[0]}} chipTitle="Buttons" />
                <Chips onPress={() => {tags[1] = !tags[1]}} chipTitle="Saying" />
                <Chips onPress={() => {tags[2] = !tags[2]}} chipTitle="Stuff" />
                <Chips onPress={() => {tags[3] = !tags[3]}} chipTitle="About" />
                <Chips onPress={() => {tags[4] = !tags[4]}} chipTitle="Dog" />
        </ScrollView>
      </View>
    </View>
  );
}