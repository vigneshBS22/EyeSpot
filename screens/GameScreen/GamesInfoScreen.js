import React, {useEffect} from 'react';
import {NativeBaseProvider} from 'native-base';
import {useColor} from '../../Context/ColorContext';
import {CommonActions} from '@react-navigation/native';
import GameInfoCard from '../../components/GameInfoCard';
let count = 1;

const GameInfoScreen = ({route, navigation}) => {
  const {
    state: {theme},
  } = useColor();

  useEffect(() => {
    if (from === 'home' && count === 1) {
      navigation.dispatch(state => {
        const routes = [
          {name: 'Games', stale: false, type: 'stack'},
          ...state.routes,
        ];

        count = 0;

        return CommonActions.reset({
          ...state,
          routes,
          index: routes.length - 1,
        });
      });
    }
  }, [from]);

  const {item, from} = route.params;
  return (
    <NativeBaseProvider>
      <GameInfoCard item={item} navigation={navigation} />
    </NativeBaseProvider>
  );
};

export default GameInfoScreen;
