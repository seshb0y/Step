import { View, Text, StyleSheet } from 'react-native';

interface MessageBoxProps {
  text: string;
  fromMe: boolean;
}

const MessageBox = ({ text, fromMe }: MessageBoxProps) => (
  <View style={[styles.messageContainer, fromMe ? styles.fromMe : styles.fromOther]}>
    <Text style={fromMe ? styles.textMe : styles.textOther}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  messageContainer: {
    maxWidth: '75%',
    marginVertical: 8,
    position: 'relative',
  },
  fromMe: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgb(93, 176, 117)',
    borderRadius: 16,
    padding: 12,
    marginLeft: '25%',
  },
  fromOther: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
    marginRight: '25%',
  },
  textMe: {
    color: 'white',
    fontSize: 15,
  },
  textOther: {
    fontSize: 15,
  }
});

export default MessageBox;
