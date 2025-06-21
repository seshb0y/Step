import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Pressable, Button } from 'react-native';
import UserAvatar from '@/components/useravatar';
import { useRouter } from 'expo-router';

const PASSWORD_LENGTH = 8;

const Password = () => {
  const [password, setPassword] = useState('');
  const router = useRouter();
  const handleAddChar = () => {
    if (password.length < PASSWORD_LENGTH) {
      setPassword(password + '•');
    }
    else{
        router.navigate("../passwordRecovery/passwordrecovery")
    }
  };

  return (
    <View style={style.container}>
      <UserAvatar />
      <Text style={style.fText}>Hello, Romina!!</Text>
      <Text style={style.sText}>Type your password</Text>
      <View style={style.dotsContainer}>
        {Array.from({ length: PASSWORD_LENGTH }).map((_, i) => (
          <View
            key={i}
            style={[style.dot, { backgroundColor: i < password.length ? '#004CFF' : '#E3E8F1' }]}
          />
        ))}
      </View>
      <Pressable style={style.btn} onPress={handleAddChar}>
        <Text style={style.btnText}>push to test</Text>
      </Pressable>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fText: {
    fontSize: 28,
    fontWeight: 700,
    marginBottom: 30,
  },
  sText: {
    fontWeight: 300,
    fontSize: 19,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 24,
    gap: 10,
  },
  dot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    marginHorizontal: 5,
    backgroundColor: '#E3E8F1',
  },
  btn: {
    marginTop: 20,
    backgroundColor: '#004CFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Password;
