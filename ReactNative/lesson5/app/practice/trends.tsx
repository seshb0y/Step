import { useRouter } from "expo-router"
import { View, StyleSheet, Text, Pressable } from "react-native"

const Trends = () => {
    const router = useRouter();
    return(
        <View style={styles.container}>
            <Pressable style={styles.productContainer} onPress={() => router.navigate("/practice/productCard")}>
                <View style={styles.productImage}></View>
                <Text style={styles.productName}>Black Winter...</Text>
            </Pressable>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    productContainer:{
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    productImage:{
        width: 164,
        height: 136,
        marginBottom: 20,
        backgroundColor: 'blue',
        borderRadius: 10
    },
    productName:{
        fontSize: 16,
        marginVertical: 4,
        marginHorizontal: 8
    }
})

export default Trends