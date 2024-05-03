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
export default function Texting(props: {
  chatID: string;
  chatSetter: Function;
}) {
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
    console.log("Im here1");
    const values = snapshot.val();
    console.log(props.chatID);

    const newMessages: string[] = Object.values(values).filter((message) => {
      console.log(message);
      return typeof message === "string";
    }) as string[];
    const newMessagesRemoved = newMessages.slice(1);
    // Only update messages if the new array is different
    if (JSON.stringify(messages) !== JSON.stringify(newMessagesRemoved)) {
      setMessages(newMessagesRemoved);
    }
  });

  const messageSender = async () => {
    if (send != "") {
      push(messageRef, `${side}` + send);
    }
    myText("");
  };

  return (
    <View>
      <View
        style={{
          backgroundColor: "#EADDCA",
        }}
      >
        <Pressable
          onPress={() => {
            props.chatSetter("");
          }}
        >
          <Text
            style={{
              fontSize: 30,
              width: "30%",
              borderWidth: 3,
              borderRadius: 10,
              borderColor: "#895C3E",
            }}
          >
            {"<"} Back
          </Text>
        </Pressable>
      </View>
      {/* Makes the keyboard go above the text you are sending */}
      <KeyboardAvoidingView behavior={"height"} keyboardVerticalOffset={90}>
        {/* Makes the keyboard vanish when tapping somewhere else */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.bigFlex}>
            <View style={styles.chatFlex}>
              <ScrollView>
                <View onStartShouldSetResponder={() => true}>
                  {messages.map((message, index) => {
                    if (message.startsWith(side)) {
                      return (
                        <ChatBubbleRight
                          key={index}
                          message={message.slice(1)}
                        />
                      );
                    } else {
                      return (
                        <ChatBubbleLeft
                          key={index}
                          message={message.slice(1)}
                        />
                      );
                    }
                  })}
                </View>
              </ScrollView>
            </View>

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
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  sendContainer: {
    backgroundColor: "#895C3E",
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
    marginTop: "auto",
    backgroundColor: "#895C3E",
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
    width: "100%",
    height: "96.1%",
    backgroundColor: "#EADDCA",
  },
  chatFlex: {
    width: "100%",
    height: "90%",
    position: "absolute",
    top: 0,
  },
  sendImgStyle: {
    width: 25,
    height: 25,
    marginLeft: 5,
  },
  backButton: {
    width: "20%",
    height: "5%",
  },
});
