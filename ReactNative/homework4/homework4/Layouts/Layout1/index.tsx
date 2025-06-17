import Avatar from '@/components/Avatar';
import BottomPanel from '@/components/Footer';
import ScrollBlock from '@/components/ScrollChangeButtons';
import ScrollPhotos from '@/components/ScrollPhotos';
import ScrollPosts from '@/components/ScrollPosts';
import ProfButtons from '@/components/TopProfileBut';
import { useState } from 'react';
import { Pressable, View, Text, FlatList } from 'react-native';

const DATA = Array.from({ length: 50 }, (_, i) => ({
  id: String(i + 1),
  header: 'Header',
  time: `${i + 1}m ago`,
  text: 'Hell want to use your yacht, and I dont want this thing smelling like fish.',
}));

const Profile = () => {
  const [isPosts, setIsPosts] = useState(false);

  const handleChange = () => {
    setIsPosts(!isPosts);
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
      }}
    >
      <View
        style={{
          backgroundColor: 'rgb(93, 176, 117)',
          width: '100%',
          height: 245,
        }}
      >
        <ProfButtons />
      </View>
      <View style={{ alignItems: 'center' }}>
        <Avatar />
        <Text
          style={{
            fontFamily: 'Inter',
            fontSize: 30,
            fontWeight: 800,
            lineHeight: 36,
          }}
        >
          Victoria Robertson
        </Text>
        <Text
          style={{
            fontFamily: 'Inter',
            fontSize: 16,
            fontWeight: 700,
            lineHeight: 19,
          }}
        >
          A mantra goes here
        </Text>
      </View>

      <ScrollBlock isPosts={isPosts} onPress={handleChange} />

      {isPosts ? (
              <FlatList
              data={DATA}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ScrollPosts header={item.header} time={item.time} text={item.text} />
              )}
              showsVerticalScrollIndicator={false}
            />
      ) : (
        <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ScrollPhotos />
        )}
        showsVerticalScrollIndicator={false}
      />
      )}

      <BottomPanel />
    </View>
  );
};
export default Profile;
