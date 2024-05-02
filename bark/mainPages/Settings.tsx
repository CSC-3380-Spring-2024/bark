import {
  View,
  Text,
  Pressable,
  Alert,
  StyleSheet,
  TextInput,
} from "react-native";
import { FIREBASE_AUTH, FIREBASE_DATABASE } from "../FirebaseConfig";
import {
  getAuth,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  verifyBeforeUpdateEmail,
  reauthenticateWithCredential,
} from "firebase/auth";
import { ref, set } from "@firebase/database";
import { useState } from "react";

export default function Settings(props: {
  goToSettings: (arg0: boolean) => void;
}) {
  const user = FIREBASE_AUTH.currentUser;
  const [email, changeEmail] = useState<string>(user?.email as string);

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

  const updateEmail = async () => {
    if (email !== "" && user) {
      try {
        const response = await verifyBeforeUpdateEmail(user, email);
        console.log(response);
        Alert.alert(
          "Check your email for a verification message",
          "Thank you!!"
        );
      } catch (error: any) {
        console.log(error);
      }
    }
  };
  const updatePswd = async () => {
    if (user) {
      try {
        const response = await sendPasswordResetEmail(FIREBASE_AUTH, email);
        console.log(response);
        Alert.alert("A password reset email has been sent");
      } catch (error: any) {
        console.log(error);
      }
    }
  };

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
          onChangeText={changeEmail}
          defaultValue={email}
        ></TextInput>
        {/* Email verification button */}
        <Pressable onPress={() => updateEmail()} style={styles.button}>
          <Text style={styles.buttonText}> Send verification email </Text>
        </Pressable>
        <View style={{ marginVertical: "3%" }}></View>
        {/* Update Password button */}
        <Pressable onPress={() => updatePswd()} style={styles.button}>
          <Text style={styles.buttonText}> Update Password </Text>
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
