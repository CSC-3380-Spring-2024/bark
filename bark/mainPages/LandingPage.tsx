import { useState } from 'react';
import {ActivityIndicator, Button, TextInput, View} from 'react-native'
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';


export default function LandingPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;


    const signIn = async() =>{
        setLoading(true);
        try{
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response)
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
        <View>
            <TextInput value = {email} placeholder='Email' autoCapitalize='none' onChangeText = {(text) => setEmail(text)}></TextInput>
            <TextInput secureTextEntry = {true} value = {password} placeholder='Password' autoCapitalize='none' onChangeText = {(text) => setPassword(text)}></TextInput>

            { loading ? <ActivityIndicator size = "large"/>
            : <>
                <Button title = "Login" onPress = {() => signIn()} />
                <Button title = "CreateAccount" onPress = {() => signUp()} />
              </>
            }
        </View>
    );
}