import React from 'react';
import {NativeBaseProvider} from 'native-base';
import AnimeInfoCard from '../../components/AnimeInfoCard';
const AnimeInfoScreen = ({route, navigation}) => {
  const {item} = route.params;
  return (
    <NativeBaseProvider>
      <AnimeInfoCard item={item} navigation={navigation} />
    </NativeBaseProvider>
  );
};

export default AnimeInfoScreen;
