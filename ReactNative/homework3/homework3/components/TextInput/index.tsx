import { TextInput, View } from "react-native"
import MyButton from "../Button";

interface Props{
    placehold: string;
    secureTextEntry?: boolean;
    showPassword?: boolean;
    onTogglePassword?: () => void;
}

const MyTextInput = (props: Props) => {
    return(
        <View style={{
            flexDirection: 'row', 
            alignItems: 'center', 
            borderRadius: 5, 
            paddingHorizontal: 20,
            marginVertical: 10,
            backgroundColor: "rgb(248, 248, 248)",
            borderColor: 'rgb(209, 209, 209)',
            borderWidth: 1,
            width: '90%'
        }}>
            <TextInput
                placeholder={props.placehold}
                secureTextEntry={props.secureTextEntry && !props.showPassword}
                style={{flex: 1}}
            />
            {props.secureTextEntry && (
                <MyButton
                    onPress={() => props.onTogglePassword?.()}
                    text={props.showPassword ? "Hide" : "Show"}
                    textColor="green"
                    style={{marginLeft: 10}}
                />
            )}
        </View>
    )
}

export default MyTextInput