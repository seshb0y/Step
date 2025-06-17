import {
  FlatList,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from "react-native";
import FlatBlock from "@/components/flatBox";
import CoffeeBox from "@/components/CofBox";

const DATA = Array.from({ length: 50 }, (_, i) => ({
  id: String(i + 1),
  title: `Item ${i + 1}`,
}));

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      {/* <ScrollView
      horizontal={true}
      contentContainerStyle={{
        flexDirection: "row"
      }}>
      <View
        style={{
          backgroundColor: "red",
          width: 100,
          height: 200,
          marginRight: 40
        }}>
        </View>
        <View
        style={{
          backgroundColor: "blue",
          width: 100,
          height: 200,
          marginRight: 40
        }}>
        </View>
        <View
        style={{
          backgroundColor: "orange",
          width: 100,
          height: 200,
          marginRight: 40
        }}>
        </View>
        <View
        style={{
          backgroundColor: "green",
          width: 100,
          height: 200,
          marginRight: 40
        }}>
        </View>
      </ScrollView>
      <ScrollView>
        <View
        style={{
          backgroundColor: "red",
          width: 100,
          height: 200,
          marginBottom: 40
        }}>
        </View>
        <View
        style={{
          backgroundColor: "blue",
          width: 100,
          height: 200,
          marginBottom: 40
        }}>
        </View>
        <View
        style={{
          backgroundColor: "orange",
          width: 100,
          height: 200,
          marginBottom: 40
        }}>
        </View>
        <View
        style={{
          backgroundColor: "green",
          width: 100,
          height: 200,
          marginBottom: 40
        }}>
        </View>
      </ScrollView>

      <FlatList renderItem={({item}) => (
        <View>
          <Text>{item.title}</Text>
        </View>
        )} 
        data={DATA} keyExtractor={(item) => item.id}/>
         */}

      {/* <View>
        <Text>Hot deals</Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          renderItem={({ item }) => <FlatBlock />}
          data={DATA}
          keyExtractor={(item) => item.id}
        />

      </View>

      <View>
        <Text>Trending</Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          renderItem={({ item }) => <FlatBlock />}
          data={DATA}
          keyExtractor={(item) => item.id}
        />
      </View> */}
      <ImageBackground
        resizeMode="center"
        source={require("@/assets/images/react-logo.png")}
        style={{
          flex: 1,
        }}
      >
        <FlatList
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            paddingHorizontal: 80,
          }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <CoffeeBox />}
          data={DATA}
          keyExtractor={(item) => item.id}
        />
      </ImageBackground>
    </View>
  );
}
