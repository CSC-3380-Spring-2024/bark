import { ref, get } from '@firebase/database'
import { FIREBASE_DATABASE } from '../FirebaseConfig';
export default async function generateProfiles(){
    
        const userRef = ref(FIREBASE_DATABASE, '/users')
        const profiles : string[] = [];
        await get(userRef).then((snapshot) =>{
            if(snapshot.exists()){
                console.log(snapshot.forEach((child) =>{
                    profiles.push(child.key);
                }));
            }
        })

        return profiles;

};
