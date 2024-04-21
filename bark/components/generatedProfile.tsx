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

import { get as databaseGet, ref as databaseRef } from "@firebase/database";
import { getDownloadURL, ref as storageRef } from "@firebase/storage";
import { useEffect, useState } from "react";
import {
  FIREBASE_AUTH,
  FIREBASE_DATABASE,
  FIREBASE_STORAGE,
} from "../FirebaseConfig";
const dimensions = Dimensions.get("window");

export default function GeneratedProf({ uuid }: { uuid: string }) {
  const [name, setName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [dogName, setDogName] = useState<string>("");
  const [image0, setImage0] = useState<string>();
  const [image1, setImage1] = useState<string>();
  const [image2, setImage2] = useState<string>();
  const [image3, setImage3] = useState<string>();
  const [image4, setImage4] = useState<string>();

  const userRef = databaseRef(FIREBASE_DATABASE, `users/${uuid}/`);
  databaseGet(userRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        setName(snapshot.val().name);
        setBio(snapshot.val().bio);
        setDogName(snapshot.val().dogName);
      }
    })
    .catch((error) => {
      console.log(error);
      Alert.alert("Failed to generate profile");
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
          `images/${uuid}/profileImage${i}`
        );

        await getDownloadURL(imgRef)
          .then((response) => {
            setRightImage(response, i);
            console.log(response);
          })
          .catch((response) => {});
      }
    };
    if (image0 == undefined) {
      getImage();
    }
  }, []);

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={{ flexDirection: "row" }}>
          <View>
            <Text style={styles.username}>{dogName}</Text>
            {/*<Text style={{ fontSize: 12, color: "black", marginTop: 1 }}>
              Location or smth
             </Text>*/}
          </View>
        </View>

        <View>
          <ScrollView
            horizontal={true}
            centerContent={true}
            pagingEnabled={true}
          >
            <View style={styles.dogPicsContainer}>
              {image0 && (
                <Image style={styles.dogPics} source={{ uri: image0 }} />
              )}
              {image1 && (
                <Image style={styles.dogPics} source={{ uri: image1 }} />
              )}
              {image2 && (
                <Image style={styles.dogPics} source={{ uri: image2 }} />
              )}
              {image3 && (
                <Image style={styles.dogPics} source={{ uri: image3 }} />
              )}
              {image4 && (
                <Image style={styles.dogPics} source={{ uri: image4 }} />
              )}
            </View>
          </ScrollView>

          <View style={styles.viewContainer}>
            <TouchableHighlight
              onPress={() => Alert.alert("ayyyy")}
              underlayColor="transparent"
            >
              <View style={styles.view}>
                <Text style={styles.buttonText}>Yes!</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => Alert.alert("awwww")}
              underlayColor="transparent"
            >
              <View style={styles.view2}>
                <Text style={styles.buttonText}>Pass...</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.headings}>Name:</Text>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Apple SD Gothic Neo",
                color: "black",
                marginVertical: 7,
              }}
            >
              Dog Name
            </Text>
          </View>
          <Text style={styles.headings}>Bio:</Text>
          <Text style={styles.dogBio}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
            quaerat molestias quae enim aut ipsa expedita rem aspernatur quidem
            autem ad fugit labore, vitae, blanditiis inventore cupiditate eos.
            Eum, qui excepturi. Sapiente explicabo vitae deleniti alias
            quisquam, est, perspiciatis eum necessitatibus, asperiores voluptate
            hic! Aut dolor iusto tempora voluptatibus dignissimos.
          </Text>
          <View style={styles.container}></View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  headings: {
    fontSize: 18,
    //color:"#6F8FAF",
    fontWeight: "bold",
    fontFamily: "Apple SD Gothic Neo",
    marginVertical: 7,
    marginHorizontal: 10,
  },

  dogPicsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 10,
    alignSelf: "center",
    alignItems: "center",
  },

  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    alignSelf: "flex-start",
    marginHorizontal: 10,
    marginVertical: 7,
  },

  dogBio: {
    fontSize: 16,
    color: "black",
    alignSelf: "flex-start",
    fontFamily: "Apple SD Gothic Neo",
    marginHorizontal: 15,
  },

  dogPics: {
    width: dimensions.width - 20,
    height: 400,
    alignSelf: "center",
    resizeMode: "cover",
    borderRadius: 10,
    paddingBottom: 5,
    marginRight: 15,
    marginLeft: 3,
    justifyContent: "center",
  },

  view: {
    width: dimensions.width / 2,
    height: 30,
    backgroundColor: "lightgreen",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },

  view2: {
    width: dimensions.width / 2,
    height: 30,
    backgroundColor: "#FF3131",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },

  viewContainer: {
    flexDirection: "row",
  },

  buttonText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "black",
    fontFamily: "Apple SD Gothic Neo",
  },

  username: {
    fontSize: 14,
    color: "black",
    marginTop: 12,
    fontWeight: "bold",
  },
});
