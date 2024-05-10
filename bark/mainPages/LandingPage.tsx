import React, { useContext } from "react";
import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  TextInput,
  View,
  Image,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { FIREBASE_AUTH, FIREBASE_DATABASE } from "../FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
} from "@firebase/auth";

import { ref, set } from "@firebase/database";
import { StyleSheet } from "react-native";

var DogLogo=require("../assets/barkLogo.png");

export default function LandingPage(props: {
  setLoginStatus: (arg0: boolean) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log("User " + user.email + " with uid " + uid + " has logged in");
      props.setLoginStatus(true);
    } else {
      props.setLoginStatus(false);
    }
  });

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      props.setLoginStatus(true);
    } catch (error) {
      console.log(error);
      Alert.alert("Username or Password is incorrect");
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).then((userCredential) => {
        set(ref(FIREBASE_DATABASE, "users/" + userCredential.user.uid), {
          username: email,
          email: email,
          onBoarded: false,
        });
      });
      props.setLoginStatus(true);
      console.log(response);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "This email is already being used by another account",
        "Try logging in instead or using another email"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        {/*Dog Logo and Bark text*/}
        <Image source={DogLogo} style={styles.dogLogo} />
        <Text style={styles.barkText}>BARK.</Text>
      </View>
      {/*Prevents keyboard from blocking input*/}
      <KeyboardAvoidingView style={styles.bottomSection} behavior="padding">
        <View style={styles.bottomSection}>
          <View style={styles.inputContainer}>
            {/*Box to enter email*/}
            <TextInput
              style={styles.textFields}
              value={email}
              placeholder="Email"
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            {/*Box to enter password*/}
            <TextInput
              style={styles.textFields}
              secureTextEntry={true}
              value={password}
              placeholder="Password"
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.loginButtonWrapper}>
              {/*Login button*/}
              <Button title="Login" onPress={() => signIn()} color="white" />
            </View>
            <View style={styles.createAccountButtonWrapper}>
              {/*Create Account button*/}
              <Button
                title="Create Account"
                onPress={() => signUp()}
                color="#5C4033"
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#EADDCA",
    alignItems: "center",
    padding: 50,
  },
  topSection: {
    alignItems: "center",
    marginBottom: 130,
  },
  bottomSection: {
    width: "100%",
    alignItems: "center",
  },
  dogLogo: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    marginLeft: -35,
  },
  barkText: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: -35,
  },
  inputContainer: {
    marginBottom: 20,
    width: "90%",
  },
  buttonContainer: {
    width: "60%",
    marginBottom: 0,
  },
  loginButtonWrapper: {
    borderRadius: 50,
    overflow: "hidden",
    marginBottom: 10,
    backgroundColor: "#895C3E",
  },
  createAccountButtonWrapper: {
    borderRadius: 50,
    overflow: "hidden",
    marginBottom: 10,
    borderWidth: 3,
    bord