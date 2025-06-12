import { Button, Pressable, Text, View } from "react-native";
import StarRating from "@/components/StarRating";

export default function Index() {
  return (
    <View
      style={{
        backgroundColor: '#5DB075',
        flex: 1,
        justifyContent: 'center'
      }}
    >
      <View style={{
        backgroundColor:'#FFFFFF',
        height: 427,
        marginVertical: 192,
        marginHorizontal: 16,
        borderRadius: 10
      }}>
        <StarRating />
        
        <View style={{
          marginVertical: 16,
          flex: 1,
          justifyContent: 'center'
        }}>
          <Text style={{ 
            fontSize: 30, 
            fontWeight: 'bold', 
            textAlign: 'center', 
            marginBottom: 10 }}>Rate our app</Text>
          <Text style={{ 
            textAlign: 'center', 
            color: '#666', 
            marginBottom: 20, 
            paddingHorizontal: 20,
            fontSize: 16,
            }}>Consequat velit qui adipisicing sunt do reprehenderit ad laborum tempor ullamco
            exercitation. Ullamco tempor adipisicing et voluptate duis 
            sit esse aliqua esse ex dolore esse. Consequat velit qui adipisicing sunt.
            </Text>
        </View>
        <Pressable style={{
          backgroundColor: '#5DB075',
          paddingVertical: 15,
          paddingHorizontal: 16,
          borderRadius: 25,
          alignSelf: 'center',
          alignItems: 'center',
          marginBottom: 18,
          width: 311
        }}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>I love it!</Text>
        </Pressable>
        <Pressable style={{
          backgroundColor: 'transparent',
          alignSelf: 'center',
          marginTop: 10,
          marginBottom: 69
        }}>
          <Text style={{ color: '#5DB075', fontWeight: 'bold' }}>Don't like the app? Let us know.</Text>
        </Pressable>
      </View>
    </View>
  );
}
