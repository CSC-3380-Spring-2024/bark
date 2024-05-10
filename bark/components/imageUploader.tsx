import { useState } from "react";
import { Pressable, Text, StyleSheet, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FIREBASE_STORAGE, FIREBASE_AUTH } from "../FirebaseConfig";
import { ref, uploadBytes, uploadBytesResumable } from "@firebase/storage";

export function ImageUploader({ index }: { index: number }) {
  const [image, setImage] = useState<string>("");

  const imageUploader = async () => {
    try {
      const result: ImagePicker.ImagePickerResult =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0,
        });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        const response = await fetch(result.assets[0].uri);
        await firebaseUpload(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const firebaseUpload = async (response: Response) => {
    const imgName = `profileImage${index}`;
    const imgPath = `/images/${FIREBASE_AUTH.currentUser?.uid}/${imgName}`;
    const storageRef = ref(FIREBASE_STORAGE, imgPath);

    //const response = await fetch(image);
    const blob = await response.blob();
    console.log("uploading!\n");

    uploadBytesResumable(storageRef, blob);
  };

  return (
    //Button for uploading/editing dog pictures in your account
    <Pressable onPress={imageUploader} style={styles.imageUploadContainer}>
      {image ? (
        //Rectangle image
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        //Plus sign symbol in the middle of rectangles
        <Text style={styles.plusSign}>+</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  imageUploadContainer: {
    borderWidth: 5,
    borderRadius: 18,
    height: 256,
    width: 144,
    marginRight: 5,
    marginStart: 5,
    marginEnd: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  plusSign: {
    fontSize: 35,
    fontWeight: "bold",
  },
  image: {
    height: 249,
    width: 135,
    borderRadius: 15,
  },
});
