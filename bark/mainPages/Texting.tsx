import {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Pressable, Keyboard, TouchableWithoutFeedback} from 'react-native'


export default function Texting(){
    const [text, onChangeText] = useState('Send message')
    const [height, setHeight] = useState(0)
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.bigFlex}>
            <View style={styles.textingBox}>
            <TextInput onChangeText={onChangeText} value={text} multiline={true}  
            style={[styles.texting, {height: Math.max(35, height)}]} onContentSizeChange={(event) =>
        setHeight(event.nativeEvent.contentSize.height)
      } />
              <View style={styles.sendContainer}>
            <Pressable>
                <Text>
                    Send
                </Text>
            </Pressable>
        </View>
        </View>
        </View>
        </TouchableWithoutFeedback>
        
    );
}

const styles = StyleSheet.create({
    texting:{

    },
    sendContainer:{
        backgroundColor: "blue",
        borderRadius: 100,
        width: 75,
        alignItems: "center",
        justifyContent: "center"
    },
    textingBox: {
        borderColor: "red",
        borderWidth: 1,
        marginTop: "auto",
        backgroundColor: "crimson",
        borderRadius: 100,
        paddingLeft: 20,
        width: "90%",
        marginLeft:20,
        flexDirection: "row",
        justifyContent: "space-between"

    },
    bigFlex:{
        borderWidth: 1,
        width:"100%",
        height: "100%"
    },
    textLeft:{ 

    },
    textRight:{

    }
    //chat bubbles
    //text box
    //if text is sent, send right. if text is recieved, send left
})