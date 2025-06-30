import drawerComp from "../../src/components/drawerComp";
import { FontAwesome } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{}}
        drawerContent={drawerComp}>

        <Drawer.Screen
          name="index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Home",
            title: "overview",
            drawerIcon:() => <View style={{marginRight: 20}}> 
            <Feather name="home" size={24} color="gray" />
            </View> 
          }}
        />
        <Drawer.Screen
          name="topics" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Topics",
            title: "overview",
            drawerIcon:() => <View style={{marginRight: 15,}}> 
              <MaterialIcons name="topic" size={24} color="gray" />
            </View> 
          }}
        />
        <Drawer.Screen
          name="messages" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Messages",
            title: "overview",
            drawerIcon:() =>
            <View style={{marginRight: 17,}}> 
            <Feather name="message-circle" size={24} color="gray" />
            </View> 
          }}
        />
        <Drawer.Screen
          name="notifications" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Notifications",
            title: "overview",
            drawerIcon:() =>
            <View style={{marginRight: 17,}}> 
            <Ionicons name="notifications-outline" size={24} color="gray" />
            </View> 
          }}
        />
        <Drawer.Screen
          name="bookmarks" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Bookmarks",
            title: "overview",
            drawerIcon:() =>
            <View style={{marginRight: 18, paddingLeft: 2}}> 
            <FontAwesome name='bookmark-o' size={30} color='gray'/>
            </View> 
          }}
        />
        <Drawer.Screen
          name="profile" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Profile",
            title: "overview",
            drawerIcon:() =>
            <View style={{marginRight: 17, paddingLeft: 2}}> 
            <AntDesign name="user" size={24} color="gray" />
            </View> 
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}