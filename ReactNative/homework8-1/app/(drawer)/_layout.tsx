import { Drawer } from 'expo-router/drawer';
import { useColorScheme } from 'react-native';
import { AuthProvider } from '@/src/context/AuthContext';
import DrawerComp from '@/src/components/drawerComp';

export default function DrawerLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <Drawer
        screenOptions={{
          headerShown: true,
        }}
        drawerContent={(props) => <DrawerComp {...props} />}
      >
        <Drawer.Screen
          name="(tabs)" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Home',
            title: 'Home',
          }}
        />
        <Drawer.Screen
          name="bookmarks" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Bookmarks',
            title: 'Bookmarks',
          }}
        />
        <Drawer.Screen
          name="messages" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Messages',
            title: 'Messages',
          }}
        />
        <Drawer.Screen
          name="notifications" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Notifications',
            title: 'Notifications',
          }}
        />
        <Drawer.Screen
          name="profile" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Profile',
            title: 'Profile',
          }}
        />
        <Drawer.Screen
          name="topics" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Topics',
            title: 'Topics',
          }}
        />
      </Drawer>
    </AuthProvider>
  );
}
