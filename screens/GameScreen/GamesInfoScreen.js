import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {useColor} from '../../Context/ColorContext';
import Card from '../../components/GameCard';
import GameInfoCard from '../../components/GameInfoCard';

const GameInfoScreen = ({route}) => {
  const {
    state: {theme},
  } = useColor();
  const {item} = route.params;
  return (
    <NativeBaseProvider>
      <GameInfoCard item={item} />
    </NativeBaseProvider>
  );
};

export default GameInfoScreen;
