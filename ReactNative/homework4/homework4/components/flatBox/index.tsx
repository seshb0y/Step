import { FlatList, Text, View } from 'react-native';

const FlatBlock = () => {
  return (
    <View style={{ width: 110, marginLeft: 15, height: 200 }}>
      <View
        style={{
          height: 110,
          width: 110,
          backgroundColor: 'rgba(206, 202, 202, 0.5)',
          borderRadius: 8,
        }}
      ></View>
      <Text style={{ maxWidth: 110, flexWrap: 'wrap' }}>Item #1 Name Goes Here</Text>
      <Text style={{fontWeight: 700, marginTop: 5}}>$19.99</Text>
    </View>
  );
};

export default FlatBlock;
