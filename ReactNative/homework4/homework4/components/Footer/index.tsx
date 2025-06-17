import { View, StyleSheet } from "react-native"
import Button from "../Button"

const BottomPanel = () => {
    return(
        <View style={style.container}>
            <Button title="" bgColor="#5DB075" isRounded={true}></Button>
            <Button title="" bgColor="#E8E8E8" isRounded={true}></Button>
            <Button title="" bgColor="#E8E8E8" isRounded={true}></Button>
            <Button title="" bgColor="#E8E8E8" isRounded={true}></Button>
            <Button title="" bgColor="#E8E8E8" isRounded={true}></Button>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        marginTop: 10,
        backgroundColor: 'white',
        height: 80,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0'
    }
})

export default BottomPanel