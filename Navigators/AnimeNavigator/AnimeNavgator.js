import React from 'react';
import {AnimeStack} from '../../constants';
import AnimeInfoScreen from '../../screens/AnimeScreen/AnimeInfoScreen';
import AnimeScreen from '../../screens/AnimeScreen/AnimeScreen';
import {ScreenName} from './constants';

export default function AnimeNavigator() {
  return (
    <AnimeStack.Navigator>
      <AnimeStack.Screen
        name={ScreenName.ANIME_SCREEN}
        component={AnimeScreen}
      />
      <AnimeStack.Screen
        name={ScreenName.ANIME_INFO_SCREEN}
        component={AnimeInfoScreen}
      />
    </AnimeStack.Navigator>
  );
}
