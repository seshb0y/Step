import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Post } from '@/src/Posts';
import axios from 'axios';
import { Com } from '@/src/Com';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Link } from 'expo-router';

const ComDetails = () => {
    const [com, setCom] = useState<Post>();
    const id = useState();

    useEffect(() => {
        const getCom = async () => {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?${id}`)
            setCom(response.data)
        }

        getCom();
    })
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
        }}
      >
        <FlatList
          data={com}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
                <Text>Name: {item.name}</Text>
                <Text>Email: {item.email}</Text>
                <Text>Body: {item.body}</Text>
            </View>
          )}
        />
      </View>
    </GestureHandlerRootView>
  )
}

export default ComDetails