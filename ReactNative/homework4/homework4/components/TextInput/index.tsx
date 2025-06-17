import { TextInput, View, StyleSheet } from "react-native";

interface Props{
    placeholder: string
}

const CustomInput = (props: Props) => {
    return(
        <View style={style.container}>
            <TextInput placeholder={props.placeholder} style={style.input}></TextInput>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        marginVertical: 20,
        marginLeft: 30
    },
    input:{
        backgroundColor: "rgb(232, 232, 232)",
        width: 343,
        height: 50,
        borderRadius: 50,
    }
})

export default CustomInput;