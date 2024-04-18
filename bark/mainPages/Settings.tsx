import {View, Text, Pressable, Alert} from 'react-native'
import {FIREBASE_AUTH} from '../FirebaseConfig'


export default function Settings(){

    function signOut(){
        FIREBASE_AUTH.signOut().then(() => {
            console.log("Signed out!");
            Alert.alert("Sign out Successful!", "You have been successfully signed out");
            
        }).finally(() => {
            console.log(FIREBASE_AUTH.currentUser);
        });
    }
    return(
        <>
            <View style ={{marginTop: 150}}>
                <Text>Settings page</Text>
                <Pressable onPress = {() => {signOut()}}><Text>Sign out</Text></Pressable>
            </View>
        </>
    );
}