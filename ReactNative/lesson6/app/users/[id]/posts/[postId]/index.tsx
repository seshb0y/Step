import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Post } from '@/src/Posts';
import axios from 'axios';
import { Com } from '@/src/Com';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Link } from 'expo-router';

const PostDetails = () => {
  const [post, setPost] = useState<Post>();
  const [com, setCom] = useState<Com[]>([]);
  const id = useState();

  useEffect(() => {
    const getPost = async () => {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
      setPost(response.data);
    };
    const getCom = async () => {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?${id}`);
      setCom(response.data);
    };

    getPost();
    getCom();
  });
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
        }}
      >
        <Text>{post?.title}</Text>
        <Text>{post?.body}</Text>
        <FlatList
          data={com}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Link
              href={{
                pathname: '/users/[id]/posts/[postId]/comments/[commentsId]',
                params: {
                  id: String(id), // id пользователя
                  postId: String(post?.id), // id поста
                  commentsId: item.id.toString(), // id комментария
                },
              }}
            >
              <Text>Name: {item.name}</Text>
              <Text>Email: {item.email}</Text>
              <Text>Body: {item.body}</Text>
            </Link>
          )}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default PostDetails;
