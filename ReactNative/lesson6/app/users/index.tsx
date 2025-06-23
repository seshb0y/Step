import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'expo-router';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { User } from '@/src/Users';

const UsersList = () => {
  const [users, setUsers] = useState<User[]>({} as User[]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users`);
      setUsers(response.data);
    };
    getUsers();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View>
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Link href={`/users/${item.id}`} >
              {item.username}
            </Link>
          )}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default UsersList;
