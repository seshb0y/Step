import { FlatList, Pressable, StyleSheet, View, Text } from 'react-native';

interface Props {
  isPosts: boolean;
  onPress: () => void;
}

const ScrollBlock = (props: Props) => {
  return (
    <View style={style.pressContainer}>
      <Pressable
        style={[
          style.button,
          {
            backgroundColor: props.isPosts ? 'white' : 'rgb(232, 232, 232)',
          },
        ]}
        onPress={props.onPress}
      >
        <Text style={style.text}>Posts</Text>
      </Pressable>
      <Pressable
        style={[
          style.button,
          {
            backgroundColor: props.isPosts ? 'rgb(232, 232, 232)' : 'white',
          },
        ]}
        onPress={props.onPress}
      >
        <Text style={style.text}>Photos</Text>
      </Pressable>
    </View>
  );
};

const style = StyleSheet.create({
  pressContainer: {
    width: 345,
    height: 50,
    backgroundColor: 'rgb(232, 232, 232)',
    borderRadius: 30,
    marginTop: 24,
    flexDirection: 'row',
    marginLeft: 30,
    marginBottom: 10
  },
  button: {
    width: 170,
    height: 46,
    marginTop: 2,
    borderRadius: 100,
    alignItems: 'center',
    marginLeft: 2,
  },
  text: {
    marginVertical: 13,
    color: 'rgb(93, 176, 117)',
    fontFamily: 'Inter',
    fontWeight: 700,
  },
});

export default ScrollBlock;
