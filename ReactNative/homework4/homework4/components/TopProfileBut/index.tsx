import { Pressable, Text, View, StyleSheet } from 'react-native';

interface Props {
  textColor: string;
  headerColor: string;
  headerText: string;
  firstBtnText: string;
  secondBtnText: string
}

const ProfButtons = (props: Props) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 90,
        marginLeft: -20,
      }}
    >
      <Pressable>
        <Text style={[style.buttonText, { color: props.textColor }]}>{props.firstBtnText}</Text>
      </Pressable>

      <Text style={[style.profile, { color: props.headerColor }]}>{props.headerText}</Text>

      <Pressable>
        <Text style={[style.buttonText, { color: props.textColor }]}>{props.secondBtnText}</Text>
      </Pressable>
    </View>
  );
};

const style = StyleSheet.create({
  buttonText: {
    fontWeight: 500,
    fontSize: 16,
    fontFamily: 'Inter',
    lineHeight: 19,
    marginTop: 32,
  },
  profile: {
    fontFamily: 'Inter',
    fontSize: 30,
    fontWeight: 800,
    lineHeight: 36,
    marginTop: 24,
  },
});

export default ProfButtons;
