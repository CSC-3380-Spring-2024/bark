import { useState } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";

export function Chips({
  onPress,
  chipTitle,
}: {
  onPress: Function;
  chipTitle: string;
}) {
  const [on, setOn] = useState(false);

  function handlePress() {
    onPress();
    setOn(true);
  }

  return (
    <>
      <Pressable onPress={handlePress}>
        <View style={styles.container}>
          <Text style={styles.text}>{chipTitle}</Text>
        </View>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 125,
    height: 50,
    marginBottom: 15,
    borderRadius: 45,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: "white",
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    flex: 1,
    marginTop: 13,
    fontWeight: "bold",
    fontSize: 17,
  },
});
