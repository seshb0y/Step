import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import UserAvatar from '@/components/useravatar';
import { useRouter } from 'expo-router';

const PasswordRecoveryCode = () => {
    const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.topBg} />
      <View style={styles.content}>
        <UserAvatar />
        <Text style={styles.title}>Password Recovery</Text>
        <Text style={styles.subtitle}>
          Enter 4-digits code we sent you{'\n'}on your phone number
        </Text>
        <Text style={styles.phone}>+98********00</Text>
        <View style={styles.dotsContainer}>
          {[0, 1, 2, 3].map((i) => (
            <View key={i} style={styles.dot} />
          ))}
        </View>
      </View>
      <View style={styles.btnContainer}>
        <Pressable style={styles.sendBtn} onPress={() => router.navigate("/passwordRecovery/newpassword")}>
          <Text style={styles.sendBtnText}>Send Again(next)</Text>
        </Pressable>
        <Pressable onPress={()=>router.navigate("/start/start")}>
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  topBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 200,
    backgroundColor: 'transparent',
    zIndex: -1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 17,
    color: '#222',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '400',
  },
  phone: {
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 30,
    textAlign: 'center',
    letterSpacing: 1,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
    gap: 18,
  },
  dot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#E3E8F1',
  },
  btnContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 80,
  },
  sendBtn: {
    backgroundColor: '#FF5A99',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 60,
    marginBottom: 18,
  },
  sendBtnText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
  cancelText: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default PasswordRecoveryCode;
