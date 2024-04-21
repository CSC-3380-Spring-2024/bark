import {
  View,
  Text,
  Pressable,
  Alert,
  StyleSheet,
  TextInput,
} from "react-native";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { getAuth, updatePassword } from "firebase/auth";

export default function Settings(props: {
  goToSettings: (arg0: boolean) => void;
}) {
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
  const auth = getAuth();
  const user = auth.currentUser;
  return (
    <View style={styles.mainContainer}>
      <View style={styles.marginHorizontal}>
        <Pressable onPress={back} style={styles.button}>
          <Text style={styles.buttonText}> {"<"} Back </Text>
        </Pressable>
        <Text style={styles.text}>Change username: </Text>
        <TextInput
          style={styles.textInputs}
          placeholder=" Type NEW username here"
        ></TextInput>
        <Text style={styles.text}>Change password: </Text>
        <TextInput
          //onChangeText={(value)=>}
          style={styles.textInputs}
          placeholder=" Type NEW password here"
        ></TextInput>
        {/* Save Button */}
        <Pressable
          onPress={() => Alert.alert("All changes have been saved")}
          style={styles.button}
        >
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
