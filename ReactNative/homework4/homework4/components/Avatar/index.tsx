import { View, Image, StyleSheet } from "react-native"

const Avatar = () => {
    return(
        <View style={styles.avatarContainer}>
            <Image 
                source={{uri:"https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1"}}
                style={styles.avatarImage}
                />
        </View>
    )
}


const styles = StyleSheet.create({
    avatarContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: -128,
    },
    avatarImage: {
      width: 158,
      height: 158,
      borderRadius: 100,
      borderWidth: 4,
      borderColor: 'white', 
    },
  });

export default Avatar