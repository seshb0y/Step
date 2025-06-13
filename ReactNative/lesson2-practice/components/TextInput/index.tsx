import { TextInput as RNTextInput, View, TextInputProps } from 'react-native';
import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome';

interface Props extends TextInputProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;
    iconName: 'user' | 'envelope' | 'lock';
    secureTextEntry?: boolean;
    showPassword?: boolean;
    onTogglePassword?: () => void;
}

const TextInputReusable = (props: Props) => {
    return (
        <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            borderRadius: 5, 
            padding: 8, 
            width: '100%',
            backgroundColor: "rgb(248, 248, 248)"
        }}>
            <Icon 
                name={props.iconName} 
                size={20} 
                color={props.value ? 'rgb(96, 181, 250)' : 'rgb(219, 219, 219)'} 
                style={{ marginRight: 10 }} 
            />
            <RNTextInput 
                {...props}
                style={{ flex: 1 }}
            />
            {props.secureTextEntry && (
                <Icon 
                    name={props.showPassword ? "eye" : "eye-slash"} 
                    size={20} 
                    color="gray" 
                    onPress={props.onTogglePassword} 
                    style={{ marginLeft: 10 }}
                />
            )}
        </View>
    );
}

export default TextInputReusable;