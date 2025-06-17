import { View, Text, Pressable } from "react-native";

const CoffeeBox = () => {
  return (
    <View
      style={{
        marginBottom: 30,
      }}
    >
      <View
        style={{
          height: 110,
          width: 110,
          backgroundColor: "#F6F6F6",
          borderRadius: 8,
          flexDirection: 'row',
        }}
      >
        <Text style={{ 
            color: "yellow", 
            fontSize: 10,
            marginLeft: 70
            }}>★</Text>
        <Text> 4.8</Text>
      </View>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 700,
        }}
      >
        Caffe Mocha
      </Text>
      <Text
        style={{
          color: "gray",
          fontSize: 10,
          opacity: 2,
        }}
      >
        Deep Foam
      </Text>
      <View>
        <Pressable
          style={{
            flexDirection: "row",
            gap: 50,
          }}
        >
          <Text>$ 4.53</Text>
          <View
            style={{
              backgroundColor: "orange",
              borderRadius: 5,
              width: 15,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              +
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};
export default CoffeeBox;
