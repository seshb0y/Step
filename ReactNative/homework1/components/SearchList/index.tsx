import { Text, View } from "react-native"

const searchElem = () => {
    return(
        <View>
            <Text style={{
                marginLeft: 33,
                marginRight: 16,
                marginTop: 16,
                fontSize: 16,
                height: 19,
                fontWeight: 500
            }}>Search result</Text>

            <View style={{
                height: 1,
                backgroundColor: '#E8E8E8',
                marginHorizontal: 16,
                marginTop: 14
            }}></View>
        </View>
    )
}

export default searchElem;