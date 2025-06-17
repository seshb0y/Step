import ProfButtons from '@/components/TopProfileBut';
import MessageBox from '@/components/MessageBox';
import { View, FlatList, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import CustomInput from '@/components/TextInput';

const MESSAGES = [
  {
    id: '1',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fringilla quam eu faci lisis mollis.',
    fromMe: false,
  },
  { id: '2', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', fromMe: true },
  { id: '3', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', fromMe: true },
  {
    id: '4',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fringilla quam eu faci lisis mollis.',
    fromMe: false,
  },
];

const Messages = () => {
  const [input, setInput] = useState('');

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ProfButtons
        textColor="green"
        headerColor="black"
        headerText="Messages"
        firstBtnText="Back"
        secondBtnText="Filter"
      />
      <FlatList
        data={MESSAGES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MessageBox text={item.text} fromMe={item.fromMe} />}
        contentContainerStyle={{ padding: 16, paddingBottom: 70 }}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Message here..."
          value={input}
          onChangeText={setInput}
          placeholderTextColor="#BDBDBD"
        />
        <Pressable style={styles.sendButton}>
          <Text style={{ color: 'white', fontSize: 40, marginTop: -10 }}>↑</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 24,
    paddingHorizontal: 16,
    margin: 16,
    height: 48,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#222',
  },
  sendButton: {
    backgroundColor: 'rgb(93, 176, 117)',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});

export default Messages;
