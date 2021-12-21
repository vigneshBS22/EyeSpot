import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {HomeTab} from '../../constants';

import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import SettingScreen from '../../screens/SettingsScreen/SettingScreen';
import AnimeScreen from '../../screens/AnimeScreen/AnimeScreen';
import GamesScreen from '../../screens/GameScreen/GamesScreen';
import {ScreenName} from './constants';

export const HomeTabScreen = () => {
  return (
    <HomeTab.Navigator>
      <HomeTab.Screen
        name={ScreenName.HOME_SCREEN}
        component={HomeScreen}
        options={{
          headerShown: false,

          tabBarIcon: ({color, size}) => (
            <AntDesign name="home" color={color} size={size} />
          ),
        }}
      />
      <HomeTab.Screen
        name={ScreenName.ANIME_SCREEN}
        component={AnimeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <AntDesign name="eyeo" color={color} size={size} />
          ),
        }}
      />
      <HomeTab.Screen
        name={ScreenName.GAMES_SCREEN}
        component={GamesScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons
              name="ios-game-controller-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <HomeTab.Screen
        name={ScreenName.SETTING_SCREEN}
        component={SettingScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <AntDesign name="setting" color={color} size={size} />
          ),
        }}
      />
    </HomeTab.Navigator>
  );
};
