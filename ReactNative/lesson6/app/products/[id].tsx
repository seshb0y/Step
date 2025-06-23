import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import axios from 'axios'
import { Product } from '@/src/Product'


const ProductDetails = () => {
    const [product, setProduct] = useState<Product>({} as Product)
    const {id} = useLocalSearchParams();

    useEffect(() => {
        const getProducts = async () => {
                const response = await axios.get(`https://dummyjson.com/product/${id}`);
                setProduct(response.data)
        }

        getProducts();
    }, [])
  return (
    <View>
      <Text>{product.title}</Text>
      <Text>{product.id}</Text>
      <Text>{product.category}</Text>
      <Text>{product.description}</Text>
      <Text>{product.price}</Text>
      <Text>{product.discountPercentage}</Text>
    </View>
  )
}

export default ProductDetails