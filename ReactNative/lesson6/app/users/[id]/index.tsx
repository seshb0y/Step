import { View, Text, FlatList } from 'react-native';
import React, { use, useEffect, useState } from 'react';
import { User } from '@/src/Users';
import { Link, useLocalSearchParams } from 'expo-router';
import { Post } from '@/src/Posts';
import axios from 'axios';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const UserDetails = () => {
  const [user, setUser] = useState<User>({} as User);
  const [posts, setPosts] = useState<Post[]>([]);
  const { id } = useLocalSearchParams();

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
      console.log(response.data)
      setUser(response.data);
    };
    const getPosts = async () => {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
      console.log(response.data)
      setPosts(response.data);
    };

    getUsers();
    getPosts();
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
        }}
      >
        <Text>{user.username}</Text>
        <Text>{user.email}</Text>
        <Text>{user.phone}</Text>
        <Text>{user.address?.city}</Text>
        <Text>{user.company?.name}</Text>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Link href={{ pathname: '/posts/[postId]', params: { id: item.id.toString() } }}>
              {item.title}
            </Link>
          )}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default UserDetails;
