import { View, Text, StyleSheet, Button, Pressable, ScrollView, TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker"

import { ImageUploader } from "../components/imageUploader";
import { useState } from "react";




export default function Onboarding({ navigation }: {navigation: any}){
    const [name,setName] = useState<string>("");



    return(
        <>
        <ScrollView>
            <Text>Lets start with your name</Text>
            <TextInput onChangeText = {setName} value={name} placeholder="Type YOUR name here"></TextInput>
            <Text> Next, lets get some pictures.</Text>
            <ScrollView  horizontal= {true} style = {styles.profileImagesContainer}>
                <ImageUploader index = {0}/>
                <ImageUploader index = {1}/>
                <ImageUploader index = {2}/>
                <ImageUploader index = {3}/>
                <ImageUploader index = {4}/>
            </ScrollView>
        </ScrollView>
       </>
    );
}


const styles = StyleSheet.create({
    profileImagesContainer:{
        flexDirection: 'row',
        height: 260,
    }
})








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