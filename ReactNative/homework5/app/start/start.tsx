import Btn from '@/components/btn';
import { View, StyleSheet, Text, Image } from 'react-native';

const Start = () => {
  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <View style={styles.iconWrapper}>
          <Image source={require('../../assets/images/react-logo.png')} resizeMode="contain" />
        </View>
        <Text style={styles.fText}>Shoppe</Text>
        <Text style={styles.sText}>Beautiful eCommerce UI Kit for your online store</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Btn
          firstBtnText="Let's get started"
          secBtnText="I already have an account"
          showArrow={true}
          fBtnMoveTo={'../createAcc/createacc'}
          sBtnMoveTo={'../login/login'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
  },
  fText: {
    paddingHorizontal: 115,
    fontSize: 52,
    fontWeight: 700,
  },
  sText: {
    marginTop: 18,
    fontSize: 19,
    fontWeight: 300,
    lineHeight: 33,
    paddingHorizontal: 90,
    textAlign: 'center',
  },
  iconWrapper: {
    padding: 10,
    borderRadius: 60,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 8,
    alignSelf: 'center',
    marginBottom: 24,
  },
  buttonContainer: {
    paddingBottom: 30,
    marginTop: 20,
  },
});

export default Start;
