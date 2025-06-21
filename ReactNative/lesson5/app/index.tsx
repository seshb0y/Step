import { Link, useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {

  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Link href={"/details"}><Text>Open Details</Text></Link>
      <Link href={"/profile/address"}><Text>Profile Details</Text></Link>

      <Button title="to details" onPress={() => {
        router.navigate("/details")
      }}></Button>

      <Button title="to profile" onPress={() => {
        router.navigate("/profile/address")
      }}></Button>
      <Button title="to practice" onPress={() => {
        router.navigate("/practice/getstarted")
      }}></Button>
    </View>
  );
}
