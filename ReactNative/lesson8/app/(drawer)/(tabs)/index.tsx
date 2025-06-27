import { View, Text, Button } from 'react-native'
import React from 'react'

const HomeScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'salmon'
      }}
    >
      <Text>Home Screen</Text>
      <Button title='Open Profile'></Button>
    </View>
  )
}

export default HomeScreen