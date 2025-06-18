import { Alert } from "react-native";

const AlertCustom = () =>{

  const createThreeButtonAlert = () =>
    Alert.alert('Готово', 'Ваш столик забронирован', [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
    return(

    )
}