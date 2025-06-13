import { useState } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";

export default function Index() {

  const [name, setName] = useState("");

  const handleNameChange = (text: string) => {
    setName(text)
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <TextInput
      style={style.input}
      //onChange={(event) => console.log("event", event)}
      onChangeText={handleNameChange}
      value={name}/>
    </View>
  );
}

const style = StyleSheet.create({
  input: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderBottomColor: "gray",
    borderWidth: 1,
    width: "100%",
  }
})
