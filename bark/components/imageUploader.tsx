import { useState } from "react";
import { Pressable, Text, StyleSheet, Image } from "react-native";
import * as ImagePicker from "expo-image-picker"


export function ImageUploader(){
    const [image,setImage] = useState<String | null>(null);
    
    const imageUploader = async () => {
        try{
            const result: ImagePicker.ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if(!result.canceled){
                setImage(result.assets[0].uri);
                console.log(result.assets[0].uri);
            }
        }catch (error){
            console.log(error);
        }
    }


    return(
        <Pressable onPress = {imageUploader} style = {styles.imageUploadContainer}>
            {image ?  <Image source={{ uri: image }}  style = {styles.image} /> : <Text style = {styles.plusSign}>+</Text>}
        </Pressable>
    );
}


const styles = StyleSheet.create({
    imageUploadContainer:{
        borderWidth:5,
        borderRadius: 18,
        height: 256,
        width: 144,
        marginRight:5,
        marginStart:5,
        marginEnd:0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    plusSign:{
        fontSize: 35,
        fontWeight: 'bold',
    },
    image:{
        height: 249,
        width: 135,
        borderRadius: 15,
    }
});