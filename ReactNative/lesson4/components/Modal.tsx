import { View, StyleSheet, Modal, Text, Pressable, Alert, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { useState } from 'react';

interface Props {
  visible: boolean;
  onClose: () => void;
  name: string;
  ingredients: string[];
}
const blurhash = 'L5A]~V}+0d^Q00OG5=4pAaV@^j.7';

const ModalCustom = ({ visible, onClose, name, ingredients }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleBook = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      Alert.alert('Готово', 'Ваш столик забронирован', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }, 2000);
  };

  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              style={styles.image}
              placeholder={{ blurhash }}
              source="https://www.on-off-on.ru/upload/iblock/23b/23b84f0e65c73b39aba9b32508e9e869.jpg"
            />
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.ingredients}>{ingredients.join('-')}</Text>
            <Pressable style={styles.button} onPress={handleBook} disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Забронировать столик</Text>
              )}
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minWidth: 280,
  },
  image: {
    width: 220,
    height: 120,
    borderRadius: 12,
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  ingredients: {
    fontSize: 14,
    color: 'rgb(160, 165, 186)',
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    marginTop: 16,
    backgroundColor: '#FF7A00',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 24,
    alignItems: 'center',
    minWidth: 180,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ModalCustom;
