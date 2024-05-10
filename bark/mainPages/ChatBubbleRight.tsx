import { View, Text, StyleSheet } from "react-native";

export default function ChatBubbleRight({ message }: { message: string }) {
  return (
    <View style={styles.chatRight}>
      <Text>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chatRight: {
    borderRadius: 10,
    backgroundColor: "darkseagreen",
    maxWidth: "65%",
    flexWrap: "nowrap",
    margin: 10,
    padding: 10,
    alignSelf: "flex-end",
  },
});
