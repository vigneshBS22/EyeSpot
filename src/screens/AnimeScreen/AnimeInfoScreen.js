import React, {useEffect, useRef} from 'react';
import {NativeBaseProvider} from 'native-base';
import AnimeInfoCard from '../../components/AnimeInfoCard';
import {CommonActions} from '@react-navigation/native';
import {ScreenName} from '../../Navigators/AnimeNavigator/constants';
let count = 1;
const AnimeInfoScreen = ({route, navigation}) => {
  useEffect(() => {
    if (from === 'home' && count === 1) {
      // adding anime home screen to history of navigator state so that back button is present.
      navigation.dispatch(state => {
        const routes = [
          {name: ScreenName.ANIME_SCREEN, stale: false, type: 'stack'},
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
      <AnimeInfoCard item={item} navigation={navigation} />
    </NativeBaseProvider>
  );
};

export default AnimeInfoScreen;
