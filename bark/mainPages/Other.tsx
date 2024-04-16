import {View, Text, Pressable} from 'react-native'
import { ref, get } from '@firebase/database'
import { FIREBASE_DATABASE } from '../FirebaseConfig';
export default function Other(){
    
    const generateNewProfile = async() => {
        const userRef = ref(FIREBASE_DATABASE, '/users')
        const profiles : string[] = [];
        await get(userRef).then((snapshot) =>{
            if(snapshot.exists()){
                console.log(snapshot.forEach((child) =>{
                    profiles.push(child.key);
                }));
            }
        }).finally(()=>{return profiles})

    };

    return(
        <View>
            <Text>Other Screen</Text>
            <Pressable onPress = {generateNewProfile}>
                <View>
                    <Text>Next Profile</Text>
                </View>
            </Pressable>
        </View>
    );
}