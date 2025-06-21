import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const cards = [
  {
    title: 'Hello',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non consectetur turpis. Morbi eu eleifend lacus.',
  },
  {
    title: 'Hello',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non consectetur turpis. Morbi eu eleifend lacus.',
  },
  {
    title: 'Hello',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non consectetur turpis. Morbi eu eleifend lacus.',
  },
  {
    title: 'Ready?',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

const HelloCard = () => {
    const router = useRouter();
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (index < cards.length - 1) setIndex(index + 1);
    else setIndex(index -1)
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.card} onPress={handleNext}>
        <View style={styles.imgStub} />
        <Text style={styles.title}>{cards[index].title}</Text>
        <Text style={styles.desc}>{cards[index].desc}</Text>
        {index === cards.length - 1 && (
          <Pressable style={styles.btn} onPress={() => router.navigate('/start/start')}>
            <Text style={styles.btnText}>{"Let's Start"}</Text>
          </Pressable>
        )}
      </Pressable>
      <View style={styles.pagination}>
        {cards.map((_, i) => (
          <View key={i} style={[styles.dot, i === index && styles.dotActive]} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  card: {
    borderRadius: 24,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
  },
  imgStub: {
    width: '100%',
    paddingVertical: 250,
    backgroundColor: '#E3E8F1',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  desc: {
    fontSize: 16,
    color: '#222',
    textAlign: 'center',
    paddingHorizontal: 18,
    marginBottom: 18,
  },
  btn: {
    backgroundColor: '#004CFF',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 40,
    marginTop: 10,
  },
  btnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
    gap: 10,
  },
  dot: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#E3E8F1',
  },
  dotActive: {
    backgroundColor: '#004CFF',
  },
});

export default HelloCard;
