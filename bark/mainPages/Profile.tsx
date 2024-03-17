import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native'
//import { ScrollView } from 'react-native-gesture-handler';
import { blue } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
// import pic from '../../assets/adventuretime.png';

// export default function Profile(){
//     return(
//         // <>
//         //     <View style={{flex: 7, flexDirection:'row'}}>
//         //         <Image source = {require('./coolahhdog.jpg')} style = {styles.profilePic} ></Image>
//         //         <Text style ={styles.username}> CoolAhhDog21 </Text>
//         //     </View>
//         //     <View style={{}}>

//         //     </View>
//         //     <View style={{flex: 1 , alignItems: 'flex-start'}}>
//         //         <Text style ={styles.dognouns}>he/him and boy dog </Text>
//         //     </View>
//         //     <View style={{flex: 10 , alignItems: 'flex-start'}}>
//         //         <Text style ={styles.bioText}>just some cool ahh dog fr </Text>
//         //     </View>
//         //     <View style ={{flex:15}}>
//         //         <Image source = {require("./adventuretime.png")} style = {styles.image} ></Image>
//         //     </View>
//         // </>
//        <ScrollView>
//             <Image source = {require('./coolahhdog.jpg')} style = {styles.profilePic} ></Image>
//        </ScrollView>
//     );
// }



const styles = StyleSheet.create({
    username: {
        fontSize: 35,
        color: 'purple'
    },
    infoText: {
        fontSize: 20,
        color: 'blue',
        marginVertical:5,
        alignSelf:'center',
    },
    dognouns:
    {
        fontSize: 15,
        color: 'purple'
    },
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    image:{
        width:300,
        height:300,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        marginVertical:5,

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
    }
});

  

const logo = {
    uri: 'https://reactnative.dev/img/tiny_logo.png',
    width: 64,
    height: 64,
  };
const Profile = () => (
    <ScrollView>
      {/* <View style={{flex: 7, flexDirection:'row'}}>
        <Image source = {require('./coolahhdog.jpg')} style = {styles.profilePic} ></Image>
      </View> */}
        <View style={{flexDirection:'row'}}>
                  <Image source = {require('./coolahhdog.jpg')} style = {styles.profilePic} ></Image>
                  <View>
                    <Text style ={styles.username}>CoolAhhDog21 </Text>
                  <Text style ={styles.dognouns}> he/him and he/him </Text>
                  </View>
                  
        </View>
        <View style ={{alignSelf: 'center', marginVertical:5}}>
            <Text style ={styles.infoText}>just some cool ahh dog fr </Text>
            <Image source = {require("./coolahhdog.jpg")} style = {styles.image}></Image>
            <Text style ={styles.infoText}>the realest and the baddest ;) </Text>
            <Image source = {require("./corgi1.jpg")} style = {styles.image} ></Image>
            <Text style ={styles.infoText}>no other dawgs be doing it like I do </Text>
            <Image source = {require("./corgi2.jpg")} style = {styles.image} ></Image>
            <Text style ={styles.infoText}>i bark and the bitches come running </Text>
            <Image source = {require("./corgi3.jpg")} style = {styles.image} ></Image>
        </View>
      
    </ScrollView>
  );
  
  export default Profile;