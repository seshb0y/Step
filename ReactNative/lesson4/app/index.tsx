import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Switch,
  Button,
  Alert,
  Modal,
  Pressable,
  
} from 'react-native';
import { Image } from 'expo-image';
import { useState } from 'react';
import Practice from '@/Practice';
import { restaurants } from '@/data';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';

const blurhash = 'L5A]~V}+0d^Q00OG5=4pAaV@^j.7';


export default function Index() {
  //const [isEnabled, setIsEnabled] = useState(false);
  //const [modalVisible, setModalVisible] = useState(false);

  //const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  //const createTwoButtonAlert = () => {
    //   Alert.alert('Alert Title', 'My Alert Msg', [
    //     {
    //       text: 'Cancel',
    //       onPress: () => console.log('Cancel Pressed'),
    //       style: 'cancel',
    //     },
    //     { text: 'OK', onPress: () => console.log('OK Pressed') },
    //   ]);
  //};

  // const createThreeButtonAlert = () =>
  //   Alert.alert('Alert Title', 'My Alert Msg', [
  //     {
  //       text: 'Ask me later',
  //       onPress: () => console.log('Ask me later pressed'),
  //     },
  //     {
  //       text: 'Cancel',
  //       onPress: () => console.log('Cancel Pressed'),
  //       style: 'cancel',
  //     },
  //     { text: 'OK', onPress: () => console.log('OK Pressed') },
  //   ]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Practice
            id={item.id}
            name={item.name}
            rating={item.rating}
            delivery={item.delivery}
            time={item.time}
            categories={item.categories}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </GestureHandlerRootView>
    // <View style={styles.container}>
    //   {/* <Button title={'2-Button Alert'} onPress={createTwoButtonAlert} />
    //   <Button title={'3-Button Alert'} onPress={createThreeButtonAlert} /> */}
    //   <Button title="Show Modal" onPress={() => setModalVisible(true)} />
    //   <Modal
    //     animationType="fade"
    //     transparent={true}
    //     visible={modalVisible}
    //     onRequestClose={() => {
    //       Alert.alert('Modal has been closed.');
    //       setModalVisible(!modalVisible);
    //     }}
    //   >
    //     <View style={styles.centeredView}>
    //       <View style={styles.modalView}>
    //         <Text style={styles.modalText}>Hello World!</Text>
    //         <Pressable
    //           style={[styles.button, styles.buttonClose]}
    //           onPress={() => setModalVisible(!modalVisible)}
    //         >
    //           <Text style={styles.textStyle}>Hide Modal</Text>
    //         </Pressable>
    //       </View>
    //     </View>
    //   </Modal>
    // </View>
  );
  // return (
  //   <View style={styles.container}>
  //     <Text>Text expo image.</Text>
  //     <Image
  //       style={styles.image}
  //       placeholder={{ blurhash }}
  //       source={{
  //         uri: 'https://www.on-off-on.ru/upload/iblock/23b/23b84f0e65c73b39aba9b32508e9e869.jpg',
  //       }}
  //     />
  //     <ActivityIndicator size="large" />
  //     <ActivityIndicator size="small" />
  //     <ActivityIndicator size="large" />
  //     <ActivityIndicator size="large" color="red" />
  //     <Switch
  //       trackColor={{ false: 'red', true: 'green' }}
  //       thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
  //       onValueChange={toggleSwitch}
  //       value={isEnabled}
  //     />

  //   </View>
  // );
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
