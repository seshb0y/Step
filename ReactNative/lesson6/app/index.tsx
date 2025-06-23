import { Text, View } from "react-native";
import ProductsList from "./products";
import UsersList from "./users";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <UsersList />
    </View>
  );
}
