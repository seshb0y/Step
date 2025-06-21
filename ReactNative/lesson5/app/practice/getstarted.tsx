import { useRouter } from "expo-router"
import { View, Text, StyleSheet, Button, Pressable } from "react-native"

const GetStarted = () => {

    const router = useRouter();
    return(
        <View style={styles.container}>
            <Text style={styles.text}>
                You want Authentic, here you go!
            </Text>
            <Pressable style={styles.button} onPress={() => router.navigate("/practice/homepage")}>
                <Text style={styles.textButton}>
                    Get Started
                </Text>
            </Pressable>
        </View>
    )
}

export default GetStarted

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        marginHorizontal: 80,
        textAlign: 'center',
        fontSize: 34,
        fontWeight: 700,
    },
    button: {
        marginHorizontal: 55,
        marginVertical: 80,
        borderRadius: 10,
        backgroundColor: "rgb(248, 55, 88)",
        alignItems: 'center',
        paddingVertical: 18
    },
    textButton: {
        color: "white",
        fontSize: 23,
        fontWeight: 600
    }
})