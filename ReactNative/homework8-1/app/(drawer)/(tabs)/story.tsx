import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function StoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Story</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
