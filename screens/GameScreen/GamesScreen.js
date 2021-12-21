import React from 'react';
import {NativeBaseProvider, FlatList} from 'native-base';
import {useColor} from '../../Context/ColorContext';
import Card from '../../components/GameCard';
import {gamesData} from '../../data';

const GamesScreen = ({navigation}) => {
  const {
    state: {theme},
  } = useColor();
  return (
    <NativeBaseProvider>
      <FlatList
        data={gamesData}
        renderItem={({item}) => <Card navigation={navigation} item={item} />}
        keyExtractor={item => item.id}
      />
    </NativeBaseProvider>
  );
};

export default GamesScreen;
