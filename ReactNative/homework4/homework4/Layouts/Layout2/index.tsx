import BottomPanel from '@/components/Footer';
import ScrollPhotos from '@/components/ScrollPhotos';
import ScrollPosts from '@/components/ScrollPosts';
import CustomInput from '@/components/TextInput';
import ProfButtons from '@/components/TopProfileBut';
import { FlatList, View } from 'react-native';

const DATA = Array.from({ length: 50 }, (_, i) => ({
  id: String(i + 1),
  header: 'Header',
  time: `${i + 1}m ago`,
  text: "Hell want to use your yacht, and I don't want this thing smelling like fish.",
}));

interface Props{
    show: "feed" | "content"
}

const Content = (props: Props) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <ProfButtons
        textColor="green"
        headerColor="black"
        headerText="Content"
        firstBtnText={'Back'}
        secondBtnText={'Filter'}
      />

      <CustomInput placeholder="Search"></CustomInput>

      {props.show === "content" ? (
        <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <ScrollPhotos header={item.header} time={item.time} text={item.text} />
        )}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        />
      ) : 
      (
        <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ScrollPosts header={item.header} time={item.time} text={item.text} />
        )}
        showsVerticalScrollIndicator={false}
      />
      )}

      <BottomPanel />
    </View>
  );
};

export default Content;
