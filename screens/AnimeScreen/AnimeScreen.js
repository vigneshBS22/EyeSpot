import React from 'react';
import {NativeBaseProvider, FlatList} from 'native-base';
import {useColor} from '../../Context/ColorContext';
import Card from '../../components/AnimeCard';
import {animeData} from '../../data';

const AnimeScreen = ({navigation}) => {
  const {
    state: {theme},
  } = useColor();
  return (
    <NativeBaseProvider>
      <FlatList
        data={animeData}
        renderItem={({item}) => <Card navigation={navigation} item={item} />}
        keyExtractor={item => item.id}
      />
    </NativeBaseProvider>
  );
};

export default AnimeScreen;
