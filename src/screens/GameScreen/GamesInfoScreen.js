import React from 'react';
import {NativeBaseProvider} from 'native-base';
import GameInfoCard from '../../components/GameInfoCard';
const GameInfoScreen = ({route, navigation}) => {
  const {item} = route.params;
  return (
    <NativeBaseProvider>
      <GameInfoCard item={item} navigation={navigation} />
    </NativeBaseProvider>
  );
};

export default GameInfoScreen;
