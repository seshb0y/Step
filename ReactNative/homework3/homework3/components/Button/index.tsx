import { Pressable, ViewStyle, Text } from "react-native"

interface Props{
    onPress: () => void,
    text: string,
    textColor: string
    style: ViewStyle
}

const MyButton = (props: Props) => {
    return(
        <Pressable
            onPress={props.onPress}
            style={props.style}>
            <Text style={{
                color: props.textColor
            }}>{props.text}</Text>
        </Pressable>
    )
}

export default MyButton