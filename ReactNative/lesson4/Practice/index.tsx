import { View, StyleSheet, Text, Pressable, Alert } from 'react-native';
import { Image } from 'expo-image';
import { MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import ModalCustom from '@/components/Modal';

interface Props {
  id: number;
  name: string;
  rating: number;
  delivery: string;
  time: string;
  categories: string[];
}

const blurhash = 'L5A]~V}+0d^Q00OG5=4pAaV@^j.7';

const Practice = ({ id, name, rating, delivery, time, categories }: Props) => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {};

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setShowModal(true)}>
        <View>
          <Image
            style={styles.image}
            placeholder={{ blurhash }}
            source="https://www.on-off-on.ru/upload/iblock/23b/23b84f0e65c73b39aba9b32508e9e869.jpg"
          />
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.ingredients}>{categories.join(' - ')}</Text>
          <View style={styles.marksRow}>
            <View style={styles.markItem}>
              <MaterialIcons name="star-rate" size={22} color="#FF7A00" />
              <Text style={styles.markText}>
                <Text style={styles.markBold}>{rating}</Text>
              </Text>
            </View>
            <View style={styles.markItem}>
              <MaterialCommunityIcons name="truck-delivery-outline" size={22} color="#FF7A00" />
              <Text style={styles.markText}>{delivery}</Text>
            </View>
            <View style={styles.markItem}>
              <MaterialCommunityIcons name="clock-outline" size={22} color="#FF7A00" />
              <Text style={styles.markText}>{time}</Text>
            </View>
          </View>
        </View>
      </Pressable>
      {showModal && (
        <ModalCustom
          visible={showModal}
          name={name}
          ingredients={categories}
          onClose={() => setShowModal(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20
  },
  image: {
    borderRadius: 15,
    width: '100%',
    height: 200,
  },
  name: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 10,
  },
  ingredients: {
    fontSize: 14,
    color: 'rgb(160, 165, 186)',
  },
  marksRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 25,
  },
  markItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  markText: {
    fontSize: 16,
    color: '#222',
    marginLeft: 3,
  },
  markBold: {
    fontWeight: 'bold',
  },
});

export default Practice;
