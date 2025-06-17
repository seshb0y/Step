import { View, StyleSheet, Text } from 'react-native';

interface Props {
  header: string;
  time: string;
  text: string;
}

const ScrollPhotos = ({ header, time, text }: Props) => {
  return (
    <View style={style.container}>
      <View style={style.image} />
      <Text style={style.header}>{header}</Text>
      <Text style={style.text}>{text}</Text>
      <View style={style.footerContainer}>
        <Text style={style.time}>{time}</Text>
        <View style={style.dotsContainer}>
          <View style={style.dot} />
          <View style={style.dot} />
          <View style={style.dot} />
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
    flex: 1,
    marginLeft: 10,
  },
  image: {
    width: 343,
    height: 240,
    backgroundColor: 'rgb(246, 246, 246)',
    borderRadius: 30,
  },
  header: {
    fontSize: 16,
    fontWeight: 700,
    fontFamily: 'Inter',
    marginTop: 10,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingRight: 30,
  },
  time: {
    fontSize: 12,
    color: '#666',
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgb(93, 176, 117)',
  },
});

export default ScrollPhotos;
