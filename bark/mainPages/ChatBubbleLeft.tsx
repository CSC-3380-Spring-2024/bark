import {View, Text, StyleSheet} from 'react-native'

// export default function ChatLeft ({uuid}:{uuid:string}) {
// {/* Chat Left Bubble */}
// <View style={styles.chatLeft}>
// <Text>
//     Chat left
// </Text>
// </View>
// }

//Temporary Chat Function
export default function ChatLeft () {
    {/* Chat Left Bubble */}
    <View style={styles.chatLeft}>
    <Text>
        myText
    </Text>
    </View>
    }


const styles = StyleSheet.create({
    chatLeft:{
        borderRadius: 10,
        backgroundColor: "darkkhaki",
        maxWidth:"65%",
        flexWrap: "nowrap",
        margin: 10,
        padding: 10
    }
})