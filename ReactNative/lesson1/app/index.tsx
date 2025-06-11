import Congratulations from "@/components/Congratulations";
import { useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { TextInput } from "react-native";

const [name, setName] = useState("")

const handleNameChange = (text: any) => {
  console.log("text", text);
}

export default function Index() {
  return (
    // <Congratulations/>
    <TextInput
      style = {{padding: 24, borderWidth: 2, borderColor: 'gray'}}
      value={name}
      onChange={handleNameChange}/>
  );
}

const handleClick= {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: 'red',
    flexDirection: 'row'
  },
  title:{
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center'
  },
  box1:{
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: 100,
    height: 100,
    backgroundColor: 'blue'
  },
  box2:{
    flex: 1,
    width: 100,
    height: 100,
    backgroundColor: 'violet'
  },
  box3:{
    flex: 1,
    width: 100,
    height: '100%',
    backgroundColor: 'aqua'
  }
})
