import FlatBlock from '@/components/flatBox';
import BottomPanel from '@/components/Footer';
import ProfButtons from '@/components/TopProfileBut';
import { View, StyleSheet, Text, FlatList, ScrollView } from 'react-native';

const DATA = Array.from({ length: 50 }, (_, i) => ({
    id: String(i + 1),
    title: `Item ${i + 1}`,
  }));


const Market = () => {
  return (
    <View style={{
        flex: 1,
        justifyContent: 'center',
    }}>
        <ScrollView showsVerticalScrollIndicator={false}>

            <View style={style.topContainer}>
                <ProfButtons
                headerColor="white"
                textColor="white"
                firstBtnText="Back"
                headerText="Market"
                secondBtnText="            "
                />
                <View style={style.playerBlock}>
                <View style={style.playCircle}>
                    <View style={style.triangle} />
                </View>
                </View>
            </View>
            <View>
                <View>
                    <Text style={style.hotDeals}>Hot deals</Text>
                    <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    renderItem={({ item }) => <FlatBlock />}
                    data={DATA}
                    keyExtractor={(item) => item.id}
                    />
                </View>
                <View>
                    <Text style={style.hotDeals}>Trending</Text>
                    <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    renderItem={({ item }) => <FlatBlock />}
                    data={DATA}
                    keyExtractor={(item) => item.id}
                    />
                </View>
            </View>
        </ScrollView>
      <BottomPanel />
    </View>
  );
};

const style = StyleSheet.create({
    hotDeals:{
        fontSize: 24,
        fontWeight: 700,
        fontFamily: "Inter",
        marginVertical: 16,
        marginLeft: 15
    },
    topContainer: {
        backgroundColor: 'rgb(93, 176, 117)',
    },
    playerBlock: {
        backgroundColor: 'white',
        borderRadius: 20,
        margin: 24,
        marginTop: 32,
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    playCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        borderWidth: 2,
        borderColor: 'rgb(93, 176, 117)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    triangle: {
        width: 0,
        height: 0,
        borderLeftWidth: 18,
        borderLeftColor: 'rgb(93, 176, 117)',
        borderTopWidth: 12,
        borderTopColor: 'transparent',
        borderBottomWidth: 12,
        borderBottomColor: 'transparent',
        marginLeft: 6,
    },
});

export default Market;
