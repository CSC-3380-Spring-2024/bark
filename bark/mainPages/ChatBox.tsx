import { View, Text, Pressable, Image, StyleSheet } from "react-native";
const dogImg = require("../assets/silly dog.png");

export default function ChatBox() {
    return (
      <View>
        {/* Pressable for the chat feature. */}
        <Pressable style={styles.chatContainer}>
          {/* Profile Picture */}
          <View style={styles.pfpContainer}>
            <Image style={styles.pfpStyle} source={dogImg}></Image>
          </View>
          <View style={styles.textFlex}>
            {/* Username */}
            <View>
              <Text style={styles.usernameText}>Username</Text>
            </View>
            {/* Last message sent */}
            <View>
              <Text style={styles.textFontStyle}>Recent message</Text>
            </View>
          </View>
        </Pressable>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    chatContainer: {
      flexDirection: "row",
      padding: 10,
    },
    pfpContainer: {
      overflow: "hidden",
      borderRadius: 100,
      width: 75,
      height: 75,
    },
    textFlex: {
      flexDirection: "column",
      paddingLeft: 10,
      width: "100%",
    },
    pfpStyle: {
      borderRadius: 100,
      width: 75,
      height: 75,
    },
    textFontStyle: {},
    usernameText: {
      fontWeight: "bold",
      fontSize: 25,
    },
  });
  

// function ChatList () {

//     const listOfChats = [];
//     return (
//         <View>
//             {listOfChats.map(value) => {
//                 <ChatBox user={value} />
//             }
//             }
//         </View>
//     );
// }
