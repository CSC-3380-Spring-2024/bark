import { useState } from 'react';
import {ActivityIndicator, Button, TextInput, View} from 'react-native'
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';
import { StyleSheet } from 'react-native';


export default function LandingPage(props: { setLoginStatus: (arg0: boolean) => void; }){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;


    const signIn = async() =>{
        setLoading(true);
        try{
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response)
            props.setLoginStatus(true)
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false);
        }
    }

    const signUp = async() =>{
        setLoading(true);
        try{
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response)
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false);
        }
    }




    return (
        <View style = {styles.container}>
            <TextInput style = {styles.textFields} value = {email} placeholder='Email' autoCapitalize='none' onChangeText = {(text) => setEmail(text)}></TextInput>
            <TextInput style = {styles.textFields} secureTextEntry = {true} value = {password} placeholder='Password' autoCapitalize='none' onChangeText = {(text) => setPassword(text)}></TextInput>

            { loading ? <ActivityIndicator size = "large"/>
            : <>
                <Button title = "Login" onPress = {() => signIn()} />
                <Button title = "Create Account" onPress = {() => signUp()} />
              </>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        padding:50,
        justifyContent: "center",
        verticalAlign: "middle",
        flex: 1
    },
    textFields:{
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 5,
        height: 50,
        marginBottom: 10,
        padding: 3,
        fontSize: 20,
    }
})