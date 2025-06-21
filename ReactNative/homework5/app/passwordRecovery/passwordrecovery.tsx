import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { useState } from 'react';
import UserAvatar from '@/components/useravatar';
import Btn from '@/components/btn';

const PasswordRecovery = () => {
  const [selected, setSelected] = useState<'sms' | 'email'>('sms');

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <UserAvatar />
        <Text style={styles.fText}>Password Recovery</Text>
        <Text style={styles.sText}>How you would like to restore your password?</Text>
        <View style={styles.optionsContainer}>
          <Pressable
            style={[
              styles.option,
              selected === 'sms' ? styles.optionActive : styles.optionInactive,
            ]}
            onPress={() => setSelected('sms')}
          >
            <Text style={[styles.optionText, selected === 'sms' && styles.optionTextActive]}>
              SMS
            </Text>
            <View style={[styles.checkbox, selected === 'sms' && styles.checkboxActive]}>
              {selected === 'sms' && <View style={styles.checkboxDot} />}
            </View>
          </Pressable>
          <Pressable
            style={[
              styles.option,
              selected === 'email' ? styles.optionActiveEmail : styles.optionInactive,
            ]}
            onPress={() => setSelected('email')}
          >
            <Text style={[styles.optionText, selected === 'email' && styles.optionTextActiveEmail]}>
              Email
            </Text>
            <View style={[styles.checkbox, selected === 'email' && styles.checkboxActiveEmail]}>
              {selected === 'email' && <View style={styles.checkboxDotEmail} />}
            </View>
          </Pressable>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <Btn
          firstBtnText="Next"
          secBtnText="Cancel"
          fBtnMoveTo="../passwordRecovery/passwordrecoverycode"
          sBtnMoveTo="../start/start"
          showArrow={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    width: '100%',
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  fText: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 30,
  },
  sText: {
    fontWeight: '300',
    fontSize: 19,
    paddingHorizontal: 40,
    textAlign: 'center',
    marginBottom: 30,
  },
  optionsContainer: {
    width: 260,
    gap: 18,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 28,
  },
  optionActive: {
    backgroundColor: '#E6F0FF',
  },
  optionActiveEmail: {
    backgroundColor: '#FDEEEF',
  },
  optionInactive: {
    backgroundColor: '#F7F7F7',
  },
  optionText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#222',
  },
  optionTextActive: {
    color: '#004CFF',
    fontWeight: '700',
  },
  optionTextActiveEmail: {
    color: '#E57373',
    fontWeight: '700',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#BFD6F6',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    borderColor: '#004CFF',
    backgroundColor: 'white',
  },
  checkboxActiveEmail: {
    borderColor: '#E57373',
    backgroundColor: 'white',
  },
  checkboxDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#004CFF',
  },
  checkboxDotEmail: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#E57373',
  },
});

export default PasswordRecovery;
