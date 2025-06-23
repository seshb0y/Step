import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Post } from '@/src/Posts';
import axios from 'axios';
import { Com } from '@/src/Com';

const PostDetails = () => {
    const [post, setPost] = useState<Post>();
    const [com, setCom] = useState<Com>();
    const id = useState();

    useEffect(() => {
        const getPost = async () => {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
            setPost(response.data)
        }
        const getCom = async () => {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?${id}`)
            setCom(response.data)
        }

        getPost();
        getCom();
    })
  return (
    <View>
      <Text>index</Text>
    </View>
  )
}

export default PostDetails