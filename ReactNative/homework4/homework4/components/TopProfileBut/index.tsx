import { Pressable, Text, View, StyleSheet } from "react-native"

const ProfButtons = () => {
    return(
        <View style={{
            justifyContent: "center",
            flexDirection: "row",
            gap: 90,
            marginLeft: -20
        }}>
            <Pressable>
                <Text style={style.buttonText}>Settings</Text>
            </Pressable>

            <Text style={style.profile}>Profile</Text>

            <Pressable>
                <Text style={style.buttonText}>Logout</Text>
            </Pressable>
        </View>

    )
}

const style = StyleSheet.create({
    buttonText: {
        color: "white",
        fontWeight: 500,
        fontSize: 16, 
        fontFamily: "Inter",
        lineHeight: 19,
        marginTop: 32,
    },
    profile: {
        color: "white",
        fontFamily: "Inter",
        fontSize: 30,
        fontWeight: 800,
        lineHeight: 36,
        marginTop: 24,
    }
})

export default ProfButtons