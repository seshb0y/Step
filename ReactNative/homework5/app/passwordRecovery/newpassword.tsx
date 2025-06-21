import { View, Text, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import UserAvatar from '@/components/useravatar';
import Btn from '@/components/btn';

const NewPassword = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <UserAvatar />
        <Text style={styles.fText}>Setup New Password</Text>
        <Text style={styles.sText}>Please, setup a new password for your account</Text>
        <TextInput
          style={styles.input}
          placeholder="New Password"
          placeholderTextColor="#A9A9A9"
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Repeat Password"
          placeholderTextColor="#A9A9A9"
          secureTextEntry
        />
      </View>
        <Btn
            firstBtnText="Save"
            secBtnText="Cancel"
            fBtnMoveTo="../helloCard/hellocard"
            sBtnMoveTo="/start/start"
            showArrow={false}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingTop: 40,
  },
  fText: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
  sText: {
    fontWeight: '400',
    fontSize: 17,
    paddingHorizontal: 30,
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#F7F7F7',
    padding: 20,
    borderRadius: 14,
    fontSize: 16,
    marginBottom: 18,
    width: 320,
    textAlign: 'center',
  },
  btnContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
});

export default NewPassword;
