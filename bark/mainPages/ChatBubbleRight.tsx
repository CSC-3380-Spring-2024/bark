import {View, Text, StyleSheet} from 'react-native'

export default function ChatRight ({uuid}:{uuid:string}) {
{/* Chat Right Bubble */}
<View style={styles.chatRight}>
<Text>
    Chat Right
</Text>
</View>
}

const styles = StyleSheet.create({
    chatRight:{
        borderRadius: 10,
        backgroundColor: "darkseagreen",
        maxWidth: "65%",
        flexWrap: "nowrap",
        margin: 10,
        padding: 10,
        alignSelf: "flex-end"
    }
})