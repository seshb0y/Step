import { View, StyleSheet, Text } from "react-native"

const ScrollPhotos = () => {
    return(
        <View style={style.container}>
            <View style={style.image}/>
            <Text style={style.text}>Header</Text>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 20,
        flex: 1,
        marginLeft: 10
    },
    image:{
        width: 343,
        height: 240,
        backgroundColor: "rgb(246, 246, 246)",
        borderRadius: 30,
    },
    text:{
        marginTop: 10,
        fontSize: 16,
        fontWeight: 700,
        fontFamily: 'Inter',
    }
})

export default ScrollPhotos