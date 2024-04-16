import {View, Text, Pressable} from 'react-native'
import generateProfiles from '../components/generateProfiles';


export default function Home(){
    const profiles: string[] = [];
    async function assign(){
        await generateProfiles().then((promise)=>{ 
            promise.forEach((uid)=>{
                profiles.push(uid)
            })
        })        
    }

    return(
        <View>
            <Text>Home Screen</Text>
            <Pressable onPress={assign}>
                <Text>Assign</Text>
            </Pressable>
            <Pressable onPress={print}>
                <Text>Print that shit</Text>
            </Pressable>
        </View>
    );
}