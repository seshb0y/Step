import { View, StyleSheet, Text, TextInput, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import Btn from '@/components/btn';

const CreateAcc = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={style.container}>
      <View style={style.mainContent}>
        <Text style={style.text}>
          Create{'\n'}
          Account
        </Text>
        <View style={style.photoContainer}>
          <Feather name="camera" size={40} color="#004CFF" />
        </View>
        <View style={style.formContainer}>
          <TextInput style={style.input} placeholder="Email" placeholderTextColor="#A9A9A9" />
          <View style={style.passwordInputContainer}>
            <TextInput
              style={style.passwordInput}
              placeholder="Password"
              placeholderTextColor="#A9A9A9"
              secureTextEntry={!passwordVisible}
            />
            <Pressable onPress={() => setPasswordVisible(!passwordVisible)}>
              <Feather name={passwordVisible ? 'eye' : 'eye-off'} size={24} color="#A9A9A9" />
            </Pressable>
          </View>
          <View style={style.phoneInputContainer}>
            <View style={style.countryPicker}>
              <Feather name="globe" size={24} color="#A9A9A9" />
              <Feather name="chevron-down" size={16} color="#A9A9A9" style={{ marginLeft: 5 }} />
            </View>
            <TextInput
              style={style.phoneInput}
              placeholder="Your number"
              placeholderTextColor="#A9A9A9"
              keyboardType="phone-pad"
            />
          </View>
        </View>
      </View>
      <Btn firstBtnText="Done" secBtnText="Cancel" showArrow={false} fBtnMoveTo="../helloCard/hellocard" sBtnMoveTo='../start/start' />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContent: {
    flex: 1,
  },
  text: {
    marginTop: 90,
    marginBottom: 40,
    paddingHorizontal: 40,
    fontSize: 50,
    fontWeight: '700',
    lineHeight: 58,
  },
  photoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#004CFF',
    borderWidth: 2,
    marginLeft: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  formContainer: {
    paddingHorizontal: 40,
  },
  input: {
    backgroundColor: '#F7F7F7',
    padding: 20,
    borderRadius: 50,
    fontSize: 16,
    marginBottom: 20,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 20,
    borderRadius: 14,
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 20,
    fontSize: 16,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 50,
  },
  countryPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
  },
  phoneInput: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
});

export default CreateAcc;
