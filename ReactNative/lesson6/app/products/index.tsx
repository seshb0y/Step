import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'expo-router';

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://dummyjson.com/products?limit=5').then((res) => setProducts(res.data.products));
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {products.map(({ id, title }) => (
        <Link key={id} href={`products/${id}`}>
          {title}
        </Link>
      ))}
    </View>
  );
};

export default ProductsList;
