import { FlatList, Text, View } from "react-native"

const FlatBlock = () => {
    return(
        <View style={{
        }}>
            <View style={{
                height: 110,
                width: 110,
                backgroundColor: "#F6F6F6",
                borderRadius: 8
            }}>
            </View>
            <Text>Lorem ipsum dolor</Text>
            <Text>$19.99</Text>
        </View>
    )
}

export default FlatBlock