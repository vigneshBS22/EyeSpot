import React, {useEffect, useState} from 'react';
import {NativeBaseProvider} from 'native-base';
import {useColor} from '../../Context/ColorContext';
import AnimeInfoCard from '../../components/AnimeInfoCard';
import {CommonActions} from '@react-navigation/native';
let count = 1;
const AnimeInfoScreen = ({route, navigation}) => {
  const {
    state: {theme},
  } = useColor();

  useEffect(() => {
    if (from === 'home' && count === 1) {
      // adding anime home screen to history of navigator state so that back button is present.
      navigation.dispatch(state => {
        const routes = [
          {name: 'Anime', stale: false, type: 'stack'},
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
