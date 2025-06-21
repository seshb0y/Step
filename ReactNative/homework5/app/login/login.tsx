import Btn from '@/components/btn';
import { View, StyleSheet, Text, TextInput } from 'react-native';

const Login = () => {
  return (
    <View style={styles.container}>
        <View style={styles.textContainer}>
            <Text style={styles.title}>Login</Text>
            <Text style={styles.subtitle}>Good to see you back! ♥</Text>
            <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#A9A9A9" />
        </View>
        <Btn
          firstBtnText="Next"
          secBtnText="Cancel"
          fBtnMoveTo="../password/password"
          sBtnMoveTo="../start/start"
          showArrow={false}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    gap: 170,
  },
  textContainer:{
    paddingHorizontal: 20
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 40,
  },
  input: {
    backgroundColor: '#F7F7F7',
    padding: 20,
    borderRadius: 50,
    fontSize: 16,
    marginBottom: 20,
  },
});

export default Login;
