import { Pressable, Text } from "react-native"
import { style } from "./style";

interface Props {
    title: string,
    onPress: () => void;
    type?: "default" | "transparent"
}

const Button:React.FC<Props> = ({title, onPress, type = "default"}) => {
    return(
        <Pressable style={[
            style.container, 
            type=='transparent' ? style.transparentContainer : {},
        ]}
        onPress={onPress}>
            <Text style={[style.title, type === "transparent" && style.transparentTitle]}>
                {title}
            </Text>
        </Pressable>
    )
}

export default Button