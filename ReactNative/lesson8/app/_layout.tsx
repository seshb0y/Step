// import { AuthProvider } from '@/src/context/AuthContext';
// import { Stack } from 'expo-router';

// export default function RootLayout() {
//   return (
//     <AuthProvider>
//       <Stack
//         screenOptions={{
//           headerShown: false,
//         }}
//       >
//         <Stack.Screen
//           name="(tabs)"
//           options={{
//             headerShown: false,
//           }}
//         />
//       </Stack>
//     </AuthProvider>
//   );
// }
// import { Drawer } from "expo-router/drawer";
// import { GestureHandlerRootView } from "react-native-gesture-handler";

// export default function RootLayout() {
//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <Drawer>
//         <Drawer.Screen
//           name="index" // This is the name of the page and must match the url from root
//           options={{
//             drawerLabel: "Home",
//             title: "overview",
//           }}
//         />
//         <Drawer.Screen
//           name="user" // This is the name of the page and must match the url from root
//           options={{
//             drawerLabel: "User",
//             title: "overview",
//           }}
//         />
//       </Drawer>
//     </GestureHandlerRootView>
//   );
// }

import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack screenOptions={{
      headerShown: false
    }}/>
  )
}

export default _layout