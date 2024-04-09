
import React, { useState } from 'react';
import {View, Text, StyleSheet, Image, ScrollView, Button, Alert, Pressable} from 'react-native';

import { FIREBASE_DATABASE, FIREBASE_AUTH, } from "../FirebaseConfig";
import {ref, onValue } from '@firebase/database'
//import { ScrollView } from 'react-native-gesture-handler';
import { blue } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import Home from './Home';

const styles = StyleSheet.create({
    username: {
        fontSize: 35,
        color: 'black',
        flexWrap: 'wrap'
    },
    infoText: {
        fontSize: 20,
        color: 'black',
        marginVertical:5,
        alignSelf:'center',
    },
    dognouns:
    {
        fontSize: 15,
        color: 'black'
    },
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    image:{
        width:225,
        height:300,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        marginHorizontal: 5,

    },
    profilePic:{
        width:100,
        height:100,
        borderBottomLeftRadius:50,
        borderBottomRightRadius:50,
        borderTopLeftRadius:50,
        borderTopRightRadius:50,
        borderColor: 'black',
        borderWidth:3,
        alignSelf: 'center',
        marginVertical:5
    },
    button:{
        borderBlockColor: 'black',
        borderColor: 'black',
        backgroundColor: 'gainsboro',
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        marginRight: 5,
        marginVertical:5
    },
    buttonText:{
        fontSize: 20,
        alignSelf: 'center',

    }
});

type userProps = {
    username: string,
    dognouns: string,
    loggedin: boolean,
    bio: string,
    dogNames: string,
    humanName: string,
}





export default function Profile(){


    const [userData, setUserData] = useState<any>();
    const userRef = ref(FIREBASE_DATABASE, "users/" + FIREBASE_AUTH.currentUser?.uid + "/");
    onValue(userRef, (snapshot) => {
        setUserData(snapshot);
    });
    return(

        <View>
        <View style={{flexDirection:'row'}}>
                  <Image source = {require('./coolahhdog.jpg')} style = {styles.profilePic} ></Image>
                  <View style={{alignItems:'flex-start', marginHorizontal: 5}}>
                    <Text style ={styles.username}>{userData.name} </Text>
                    <Text style ={styles.dognouns}>he/him and he/him </Text>
                    <Pressable style = {styles.button}>
                        <Text style={styles.buttonText}>Edit Profile</Text>
                    </Pressable>
                  </View>
        </View>
            <ScrollView  horizontal> 
                {/* <Image source = {require("./coolahhdog.jpg")} style = {styles.image}></Image>
                <Image source = {require("./corgi1.jpg")} style = {styles.image} ></Image>
                <Image source = {require("./corgi2.jpg")} style = {styles.image} ></Image>
                <Image source = {require("./corgi3.jpg")} style = {styles.image} ></Image> */}
            </ScrollView>            
            <Text style ={styles.infoText}>bio bio bio bio bio bio bio bio bio bio bio bio bio bio bio bio bio bio bio bio bio bio bio bio</Text>
    </View>
    );
}
//export default Profile;
