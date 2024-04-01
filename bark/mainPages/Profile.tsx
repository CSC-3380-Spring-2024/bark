import {View, Text, Button} from 'react-native'

export default function Profile({ navigation }: {navigation: any}){
    return(
        <View>
            <Text>Profile Screen</Text>
            <Button onPress={() => {navigation.navigate("Onboarding")}} title = "Go to onboarding screen"/>
        </View>
    );
}

