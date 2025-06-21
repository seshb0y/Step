import { useRouter } from "expo-router";
import { View, Text, Button } from "react-native";

export default function ProfileScreen(){

    const nav = useRouter()

    return(
        <View style={{
            flex: 1,
            backgroundColor: "red"
        }}>
            <Text>Profile Screen</Text>
            <Button title="go back" onPress={() => {
                nav.back()
            }}></Button>
        </View>
    )
}