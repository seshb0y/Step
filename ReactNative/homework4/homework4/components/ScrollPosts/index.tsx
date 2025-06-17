import { View, Text, StyleSheet } from 'react-native';

interface Props {
  header: string;
  time: string;
  text: string;
}

const ScrollPosts = ({ header, time, text }: Props) => {
  return (
    <View style={style.mainContainer}>
      <View style={style.image} />
      <View style={style.contentContainer}>
        <View style={style.headerContainer}>
          <Text style={style.header}>{header}</Text>
          <Text style={style.time}>{time}</Text>
        </View>
        <Text style={style.text}>{text}</Text>
        <View style={style.line} />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  image: {
    width: 50,
    height: 50,
    backgroundColor: 'rgb(246, 246, 246)',
    borderRadius: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  header: {
    fontSize: 16,
    fontWeight: 700,
    fontFamily: 'Inter',
  },
  time: {
    color: '#666',
    fontSize: 14,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 15,
  },
  line: {
    height: 1,
    backgroundColor: 'rgb(232, 232, 232)',
    width: '100%',
  },
});

export default ScrollPosts;
