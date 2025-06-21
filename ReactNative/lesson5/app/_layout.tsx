import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function RootLayout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        // headerShown: false,
        headerStyle: {},
        headerTitle: 'Hello',
        headerTintColor: 'coral',
        headerTitleStyle: {
          fontSize: 25,
          fontWeight: 700,
        },
        headerRight: () => (
          <View>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 900,
                color: 'coral',
              }}
            >
              +
            </Text>
          </View>
        ),
      }}
    >
      <Stack.Screen
        options={{
          headerTitle: 'index',
          // headerLeft: () => (
          //   <View style={{
          //     height: 30,
          //     width: 30,
          //     backgroundColor: "blue"
          //   }}></View>
          // )
        }}
        name="index"
      />

      <Stack.Screen
        options={{
          headerTitle: 'details',
          // headerLeft: () => (
          //   <View style={{
          //     height: 30,
          //     width: 30,
          //     backgroundColor: "blue"
          //   }}></View>
          // )
          // headerShown: false
        }}
        name="details"
      />

      <Stack.Screen
        options={{
          headerTitle: 'address',
          // headerLeft: () => (
          //   <View style={{
          //     height: 30,
          //     width: 30,
          //     backgroundColor: "blue"
          //   }}></View>
          // )
          headerShown: false,
        }}
        name="profile/address"
      />

      <Stack.Screen
        options={{
          // headerLeft: () => (
          //   <View style={{
          //     height: 30,
          //     width: 30,
          //     backgroundColor: "blue"
          //   }}></View>
          // )
          headerShown: false,
        }}
        name="practice/getstarted"
      />

      <Stack.Screen
        options={{
          headerLeft: () => (
            <View
              style={{
                backgroundColor: 'gray',
                borderRadius: 16,
                width: 32,
                height: 32,
              }}
            ></View>
          ),
          headerRight: () => (
            <View
              style={{
                backgroundColor: 'gray',
                borderRadius: 16,
                width: 32,
                height: 32,
              }}
            ></View>
          ),
          headerTitle: () => <Text style={styles.stylish}>Stylish</Text>,
        }}
        name="practice/homepage"
      />

      <Stack.Screen
        options={{
          headerLeft: () => (
            <View
              style={{
                backgroundColor: 'gray',
                borderRadius: 16,
                width: 32,
                height: 32,
              }}
            ></View>
          ),
          headerRight: () => (
            <View
              style={{
                backgroundColor: 'gray',
                borderRadius: 16,
                width: 32,
                height: 32,
              }}
            ></View>
          ),
          headerTitle: () => <Text style={styles.stylish}>Stylish</Text>,
        }}
        name="practice/trends"
      />

      <Stack.Screen
        options={{
          headerLeft: () => (
            <Ionicons name="chevron-back" size={28} color="black" />
          ),
          headerRight: () => (
            <Pressable onPress={() => router.navigate("/practice/shipping")}>
                <View
                  style={{
                    backgroundColor: 'gray',
                    borderRadius: 16,
                    width: 32,
                    height: 32,
                  }}
                ></View>
            </Pressable>
          ),
          headerTitle: '',
        }}
        name="practice/productCard"
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  stylish: {
    color: 'rgb(67, 146, 249)',
    paddingHorizontal: 120,
    fontSize: 18,
    fontWeight: 700,
  },
});
