import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface Props {
  firstBtnText: string;
  secBtnText: string;
  showArrow: boolean;
  fBtnMoveTo: string;
  sBtnMoveTo: string;
}

const Btn = ({ firstBtnText, secBtnText, showArrow, fBtnMoveTo, sBtnMoveTo }: Props) => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Pressable style={styles.firstBtn} onPress={() => router.navigate(fBtnMoveTo as any)}>
        <Text style={styles.firstBtnText}>{firstBtnText}</Text>
      </Pressable>
      <Pressable style={styles.secBtn} onPress={() => router.navigate(sBtnMoveTo as any)}>
        <Text style={styles.secBtnText}>{secBtnText}</Text>
        {showArrow && (
          <View style={styles.arrowContainer}>
            <FontAwesome name="arrow-right" size={10} color="white" />
          </View>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: -150,
    marginBottom: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  firstBtn: {
    backgroundColor: 'rgb(0, 76, 255)',
    paddingVertical: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 18,
  },
  secBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstBtnText: {
    color: 'rgb(243, 243, 243)',
    fontSize: 22,
    fontWeight: 300,
  },
  secBtnText: {
    fontSize: 15,
    marginRight: 10,
    fontWeight: '300',
  },
  arrowContainer: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'rgb(0, 76, 255)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Btn;
