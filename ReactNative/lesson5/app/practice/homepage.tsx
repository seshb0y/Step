import { useRouter } from "expo-router"
import { View, StyleSheet, Pressable, Text } from "react-native"

const HomePage = () => {
    const router = useRouter();

    return(
        <View style={styles.container}>
            <View style={styles.btnContainer}>
                <View>
                    <Text style={styles.textBtn}>
                        Deal of the Day
                    </Text>
                    <Text style={styles.textBtn}>
                        22h 55m 20s remaining 
                    </Text>
                </View>
                <Pressable style={styles.button} onPress={() => router.navigate("/practice/trends")}>
                    <Text style={styles.textBtn}>
                        View all
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    btnContainer: {
        marginHorizontal: 16,
        backgroundColor: "rgb(67, 146, 249)",
        paddingVertical: 15,
        borderRadius: 10,
        flexDirection: 'row',
        gap: 130,
        paddingHorizontal: 20
    },
    button: {
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 10
    },
    textBtn: {
        color: 'white'
    }
})

export default HomePage