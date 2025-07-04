import { View, Text, Button, StyleSheet } from 'react-native';
import React, { useState } from 'react';

const Index = () => {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Количество кликов: {count}</Text>
      <Button title="Клик" onPress={() => setCount(count + 1)} />
      <View style={{ height: 10 }} />
      <Button title="Очистить" onPress={() => setCount(0)} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default Index;
