import {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Pressable, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, Image} from 'react-native'
import ChatBubbleLeft from "./ChatBubbleLeft"
const sendImg = require("../assets/send button.png");

export default function Texting(props:{
    setChat: (arg0: boolean) => void;
}){
    const [height, setHeight] = useState(0);
    const [send, myText] = useState<string>();
    const back = ()=> {
        props.setChat(false); 
    }
    const sendSubmit = ()=> {
        props.myText();
    }
    return(

        <View>
             <Pressable onPress={back} >
            <Text style = {{fontSize:50}}>
                Back
            </Text>
        </Pressable> 
        {/* Makes the keyboard go above the text you are sending */}
        <KeyboardAvoidingView behavior={'height'} keyboardVerticalOffset={90}>
        {/* Makes the keyboard vanish when tapping somewhere else */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        
        <View style={styles.bigFlex}> 
            {/* Everything in the texting box */}
            <View style={styles.textingBox}>
            <TextInput onChangeText={myText}  placeholder = "Send your message here..." multiline={true}  
            style={{height: Math.max(35, height),fontSize:15}} onContentSizeChange={(event) =>
        setHeight(event.nativeEvent.contentSize.height) 
      } />
        </View>
      {/* Send button */}
      <View style={styles.sendContainer}>
            <Pressable>
              <Image style={styles.sendImgStyle} source={sendImg}>
              </Image>
            </Pressable>
        </View>

        <View style={styles.chatFlex}>
        <ScrollView>
            <View onStartShouldSetResponder={() => true}>
          
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
        width:40,
        height:40,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute", right:0, bottom:0,
        marginRight: 7
    },
    textingBox: {
        borderColor: "red",
        borderWidth: 1,
        marginTop: "auto",
        backgroundColor: "crimson",
        borderRadius: 15,
        paddingLeft: 20,
        paddingRight:10,
        paddingTop:5,
        width: "85%",
        marginLeft:5,
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "nowrap",
        zIndex:1,
    },
    bigFlex:{
        borderWidth: 1,
        width:"100%",
        height: "94.5%",
    },
    chatFlex:{
        borderWidth: 1,
        borderColor: "pink",
        width: "100%",
        height: "92.5%",
        position: "absolute", top:0,
    },
    sendImgStyle:{
      width:25,
      height:25,
      marginLeft:5
    },
    backButton:{
        backgroundColor: "pink",
        width:"20%",
        height:"5%"
    }
})