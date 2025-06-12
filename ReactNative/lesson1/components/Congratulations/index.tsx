import { View, Text } from "react-native";
import Button from "../Button/index";
import {style} from "../Congratulations/style";

const Congratulations = () => {
  return (
    <View style={style.container}>
      <View style={style.innerContainer}>
        <Text style={style.title}>Congreatulations!</Text>
        <Text style={style.description}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores
          facere cupiditate dicta, beatae dolorum vel tempora vero repellendus
          distinctio molestiae eos itaque placeat ipsum cumque quam in harum
          doloribus tenetur?
        </Text>
        <Button
        onPress={() => console.log("first tbn click")}
        title="Secondart Action"/>
        <Button
        type="transparent"
        onPress={() => console.log("second tbn click")}
        title="Secondart Action"/>
      </View>
    </View>
  );
};
export default Congratulations;
