import {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Pressable, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView} from 'react-native'


export default function Texting(){
    const [text, onChangeText] = useState('')
    const [height, setHeight] = useState(0)
    return(

        <View>
        {/* Makes the keyboard go above the text you are sending */}
        <KeyboardAvoidingView behavior={'height'} keyboardVerticalOffset={90}>

        {/* Makes the keyboard vanish when tapping somewhere else */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        
        <View style={styles.bigFlex}>

            {/* Everything in the texting box */}
            <View style={styles.textingBox}>
            <TextInput onChangeText={onChangeText}  placeholder = "Send your message here..." value={text} multiline={true}  
            style={{height: Math.max(35, height),fontSize:20}} onContentSizeChange={(event) =>
        setHeight(event.nativeEvent.contentSize.height) 
      } />
        {/* Send button */}
        <View style={styles.sendContainer}>
            <Pressable>
                <Text>
                    Send
                </Text>
            </Pressable>
        </View>
        </View>



        <View style={styles.chatFlex}>
            <ScrollView>
            {/* Chat Left Bubble */}
            <View style={styles.chatLeft}>
            <Text>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae totam culpa blanditiis atque itaque ullam quisquam, aliquam optio esse nulla.
            </Text>
            </View>
            {/* Chat Right Bubble */}
            <View style={styles.chatRight}>
                <Text>
                    Chat Right
                </Text>
            </View>
            <View style={styles.chatLeft}>
            <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, veniam accusantium. Aspernatur.
            </Text>
            </View>
            <View style={styles.chatRight}>
                <Text>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem beatae dignissimos laboriosam iusto, maxime nesciunt alias quaerat minus, assumenda, suscipit itaque natus unde?
                </Text>
            </View>
            </ScrollView>
        </View>
        </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </View>
        
    );
}

const styles = StyleSheet.create({
    sendContainer:{
        backgroundColor: "blue",
        borderRadius: 100,
        width: 75,
        alignItems: "center",
        justifyContent: "center",
        height: 37,
        position: "absolute", right:0
    },
    textingBox: {
        borderColor: "red",
        borderWidth: 1,
        marginTop: "auto",
        backgroundColor: "crimson",
        borderRadius: 25,
        paddingLeft: 20,
        width: "90%",
        marginLeft:20,
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "nowrap"
    },
    bigFlex:{
        borderWidth: 1,
        width:"100%",
        height: "100%",
    },
    chatFlex:{
        borderWidth: 1,
        borderColor: "pink",
        width: "100%",
        height: "92.5%",
        position: "absolute", top:0,
    },
    chatLeft:{
        borderRadius: 10,
        backgroundColor: "darkkhaki",
        maxWidth:"65%",
        flexWrap: "nowrap",
        margin: 10,
        padding: 10
    },
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