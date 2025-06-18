import { Text, View, StyleSheet, ActivityIndicator, Switch } from 'react-native';
import { Image } from 'expo-image';
import { useState } from 'react';

const blurhash = 'L5A]~V}+0d^Q00OG5=4pAaV@^j.7';

export default function Index() {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <Text>Text expo image.</Text>
      <Image
        style={styles.image}
        placeholder={{ blurhash }}
        source={{
          uri: 'https://www.on-off-on.ru/upload/iblock/23b/23b84f0e65c73b39aba9b32508e9e869.jpg',
        }}
      />
      <ActivityIndicator size="large" />
      <ActivityIndicator size="small" />
      <ActivityIndicator size="large" />
      <ActivityIndicator size="large" color="red" />
      <Switch
        trackColor={{ false: 'red', true: 'green' }}
        thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'salmon',
  },
  image: {
    flex: 1,
    width: '100%',
    backgroundColor: '#0553',
  },
});
