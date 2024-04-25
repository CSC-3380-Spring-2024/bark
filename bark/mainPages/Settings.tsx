import {
  View,
  Text,
  Pressable,
  Alert,
  StyleSheet,
  TextInput,
} from "react-native";
import { FIREBASE_AUTH, FIREBASE_DATABASE } from "../FirebaseConfig";
import { getAuth, updateEmail, updatePassword } from "firebase/auth";
import { ref, set } from "@firebase/database";
import { useState } from "react";

export default function Settings(props: {
  goToSettings: (arg0: boolean) => void;
}) {
  const auth = getAuth();
  const user = auth.currentUser as any;
  const [pswd, updatePswd] = useState<string>(user.email);
  const [email, changeEmail] = useState<string>("");

  function signOut() {
    FIREBASE_AUTH.signOut()
      .then(() => {
        console.log("Signed out!");
        Alert.alert(
          "Sign out Successful!",
          "You have been successfully signed out"
        );
      })
      .finally(() => {
        console.log(FIREBASE_AUTH.currentUser);
      });
  }
  const back = () => {
    props.goToSettings(false);
  };

  function update() {
    var count = 0;
    if (pswd !== "") {
      updatePassword(user, pswd).then(
        () => {
          // Update successful.
        },
        (error) => {
          // An error happened.
        }
      );
      count++;
    }
    if (email !== "") {
      updateEmail(user, email);
      count++;
    }
    if (count > 0) {
      Alert.alert("Your changes have been saved.");
    }
  }

  // const setEmail = async () => {
  //   // set(ref(FIREBASE_DATABASE, "users/" + user.uid), {
  //   //   username: email,
  //   //   email: email,
  //   // });
  //   user.updatePassword(pswd);
  // };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.marginHorizontal}>
        <Pressable onPress={back} style={styles.button}>
          <Text style={styles.buttonText}> {"<"} Back </Text>
        </Pressable>
        <Text style={styles.text}>Change email: </Text>
        <TextInput
          style={styles.textInputs}
          placeholder=" Type NEW email here"
          onChangeText={(text) => changeEmail(text)}
          defaultValue={email}
        ></TextInput>
        <Text style={styles.text}>Change password: </Text>
        <TextInput
          //onChangeText={(value)=>}
          style={styles.textInputs}
          placeholder=" Type NEW password here"
          onChangeText={(text) => updatePswd(text)}
        ></TextInput>
        {/* Save Button */}
        <Pressable onPress={() => update()} style={styles.button}>
          <Text style={styles.buttonText}> Save Changes </Text>
        </Pressable>

        {/* This is the sign out button */}
        <Pressable
          onPress={() => {
            signOut();
          }}
          style={styles.signOutButton}
        >
          <Text style={styles.signOutButtonText}> Sign out </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#f0eada",
    flex: 1,
  },
  marginHorizontal: {
    marginHorizontal: "3%",
  },
  button: {
    alignSelf: "flex-start",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 2.5,
    borderColor: "sienna",
    marginVertical: "3%",
  },
  buttonText: {
    fontSize: 20,
    color: "sienna",
    fontWeight: "bold",
  },
  signOutButton: {
    alignSelf: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 2.5,
    borderColor: "red",
    marginVertical: "2%",
    marginTop: "100%",
    //justifyContent: "flex-start",
  },
  signOutButtonText: {
    fontSize: 20,
    color: "red",
    fontWeight: "bold",
  },
  textInputs: {
    borderWidth: 2,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: "black",
    height: 35,
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: "2%",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
