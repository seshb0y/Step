import { Text, View } from "react-native";

const StarRating = () => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
      <Text style={{ fontSize: 40, color: '#FFC107', marginRight: 8}}>★</Text>
      <Text style={{ fontSize: 40, color: '#FFC107', marginRight: 8 }}>★</Text>
      <Text style={{ fontSize: 40, color: '#FFC107', marginRight: 8 }}>★</Text>
      <Text style={{ fontSize: 40, color: '#FFC107', marginRight: 8 }}>★</Text>
      <Text style={{ fontSize: 40, color: '#FFC107'}}>★</Text>
    </View>
  );
};

export default StarRating; 