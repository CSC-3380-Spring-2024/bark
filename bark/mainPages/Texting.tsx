import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from "react-native";
import ChatBubbleLeft from "./ChatBubbleLeft";
import { onValue, ref, push } from "@firebase/database";
import { FIREBASE_AUTH, FIREBASE_DATABASE } from "../FirebaseConfig";
import ChatBubbleRight from "./ChatBubbleRight";
const sendImg = require("../assets/send button.png");
export default function Texting(props: { chatID: string }) {
  const [height, setHeight] = useState(0);
  const [send, myText] = useState<string>();
  const [messages, setMessages] = useState<string[]>([]);
  const messageRef = ref(FIREBASE_DATABASE, `/chats/${props.chatID}/messages`);

  const sideFunc = () => {
    const first = props.chatID.substring(0, 28);
    const second = props.chatID.substring(28, 56);
    if (first === FIREBASE_AUTH.currentUser?.uid) {
      return "0";
    } else if (second === FIREBASE_AUTH.currentUser?.uid) {
      return "1";
    } else {
      return "0";
    }
  };
  const side = sideFunc();
  onValue(messageRef, (snapshot) => {
    const values = snapshot.val();
    const newMessages = Object.values(values).filter(
      (message) => typeof message === "string"
    ) as string[];

    // Only update messages if the new array is different
    if (JSON.stringify(messages) !== JSON.stringify(newMessages)) {
      setMessages(newMessages);
    }
  });

  const messageSender = async () => {
    push(messageRef, `${side}` + send);
    myText("");
  };

  return (
    <View>
      <Pressable>
        <Text style={{ fontSize: 50 }}>Back</Text>
      </Pressable>
      {/* Makes the keyboard go above the text you are sending */}
      <KeyboardAvoidingView behavior={"height"} keyboardVerticalOffset={90}>
        {/* Makes the keyboard vanish when tapping somewhere else */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.bigFlex}>
            {messages.map((message, index) => {
              if (message.startsWith(side)) {
                return (
                  <ChatBubbleRight key={index} message={message.slice(1)} />
                );
              } else {
                return (
                  <ChatBubbleLeft key={index} message={message.slice(1)} />
                );
              }
            })}

            {/* Everything in the texting box */}
            <View style={styles.textingBox}>
              <TextInput
                onChangeText={myText}
                placeholder="Send your message here..."
                multiline={true}
                style={{ height: Math.max(35, height), fontSize: 15 }}
                onContentSizeChange={(event) =>
                  setHeight(event.nativeEvent.contentSize.height)
                }
              />
            </View>
            {/* Send button */}
            <View style={styles.sendContainer}>
              <Pressable onPress={messageSender}>
                <Image style={styles.sendImgStyle} source={sendImg}></Image>
              </Pressable>
            </View>

            <View style={styles.chatFlex}>
              <ScrollView>
                <View onStartShouldSetResponder={() => true}></View>
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  sendContainer: {
    backgroundColor: "blue",
    borderRadius: 100,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 0,
    bottom: 0,
    marginRight: 7,
  },
  textingBox: {
    borderColor: "red",
    borderWidth: 1,
    marginTop: "auto",
    backgroundColor: "crimson",
    borderRadius: 15,
    paddingLeft: 20,
    paddingRight: 10,
    paddingTop: 5,
    width: "85%",
    marginLeft: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "nowrap",
    zIndex: 1,
  },
  bigFlex: {
    borderWidth: 1,
    width: "100%",
    height: "94.5%",
  },
  chatFlex: {
    borderWidth: 1,
    borderColor: "pink",
    width: "100%",
    height: "92.5%",
    position: "absolute",
    top: 0,
  },
  sendImgStyle: {
    width: 25,
    height: 25,
    marginLeft: 5,
  },
  backButton: {
    backgroundColor: "pink",
    width: "20%",
    height: "5%",
  },
});
