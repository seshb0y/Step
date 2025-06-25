import { View, Text, Button } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

const Home = () => {
    const router = useRouter();
    const handleOpenProfile = () => {
        router.push('/profile')
    }
  return (
    <View>
      <Text>Home</Text>
      <Button title='Open Profile'></Button>
    </View>
  )
}
export default Home;