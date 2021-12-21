import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {useColor} from '../../Context/ColorContext';
import Card from '../../components/AnimeCard';

const AnimeInfoScreen = ({route}) => {
  const {
    state: {theme},
  } = useColor();
  const {item} = route.params;
  return (
    <NativeBaseProvider>
      <Card item={item} />
    </NativeBaseProvider>
  );
};

export default AnimeInfoScreen;
