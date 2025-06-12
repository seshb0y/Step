import Button from "@/components/Button";
import { Text, TextInput, View } from "react-native";
import SearchElem from "@/components/SearchList";

export default function Index() {
  return (
    <View>
      <View style={{
        flexDirection: 'row',
        justifyContent: "space-between",
        height: 36,
        paddingHorizontal: 16
      }}>
        <Button title="Back" bgColor="white" isRounded={false}></Button>
        <Text style={{
          fontSize: 30,
          fontWeight: 600,
        }}>Content</Text>
        <Button title="Filter" bgColor="white" isRounded={false}></Button>
      </View>

      <TextInput placeholder="Search" style={{
        backgroundColor: '#F6F6F6',
        padding: 10,
        height: 50,
        borderRadius: 100,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 32,
        marginHorizontal: 16
      }}></TextInput>

      <View style={{
        marginTop: 32,
      }}>
        <SearchElem/>
        <SearchElem/>
        <SearchElem/>
        <SearchElem/>
        <SearchElem/>
        <SearchElem/>
      </View>
      <View style={{
        marginTop: 300,
        backgroundColor: 'white',
        height: 80,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0'
      }}>
        <Button title="" bgColor="#5DB075" isRounded={true}></Button>
        <Button title="" bgColor="#E8E8E8" isRounded={true}></Button>
        <Button title="" bgColor="#E8E8E8" isRounded={true}></Button>
        <Button title="" bgColor="#E8E8E8" isRounded={true}></Button>
        <Button title="" bgColor="#E8E8E8" isRounded={true}></Button>
      </View>
    </View>
  );
}
