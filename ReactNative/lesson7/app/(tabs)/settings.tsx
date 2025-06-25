import { View, Text, Button, TextInput } from 'react-native';
import React from 'react';

const SettingsScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Settings Screen</Text>
      <Button title="Open Settings"></Button>
      <TextInput
        style={{
          padding: 12,
          backgroundColor: 'white',
          width: '90%',
        }}
      ></TextInput>
    </View>
  );
};

export default SettingsScreen;
