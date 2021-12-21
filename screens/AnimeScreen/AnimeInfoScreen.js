import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {useColor} from '../../Context/ColorContext';
import AnimeInfoCard from '../../components/AnimeInfoCard';

const AnimeInfoScreen = ({route}) => {
  const {
    state: {theme},
  } = useColor();
  const {item} = route.params;
  return (
    <NativeBaseProvider>
      <AnimeInfoCard item={item} />
    </NativeBaseProvider>
  );
};

export default AnimeInfoScreen;
