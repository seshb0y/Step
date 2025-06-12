import { Pressable, Text } from "react-native";
import { style } from "./style";


interface ButtonProps {
    title: string;
    bgColor: string;
    isRounded: boolean
}

const Button = ({ title, bgColor: backgroundColor, isRounded }: ButtonProps) => {
    return(
        <Pressable
        style={{
            backgroundColor,
            ...(isRounded ? {
                width: 32,
                height: 32,
                borderRadius: 16,
                justifyContent: 'center',
                alignItems: 'center',
            } : {
                borderRadius: 0,
                paddingBottom: 9,
                paddingTop: 8,
            })
         }}>
            <Text style={style.textColor}> {title} </Text>
        </Pressable>
    )
}

export default Button;