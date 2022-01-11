import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {HomeTab} from '../../constants';

import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import SettingScreen from '../../screens/SettingsScreen/SettingScreen';
import {ScreenName, TabLabel} from './constants';
import GameNavigator from '../GameNavigator/GameNavigator';
import AnimeNavigator from '../AnimeNavigator/AnimeNavgator';

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
        component={AnimeNavigator}
        options={{
          tabBarLabel: TabLabel.ANIME,
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <AntDesign name="eyeo" color={color} size={size} />
          ),
        }}
      />
      <HomeTab.Screen
        name={ScreenName.GAMES_SCREEN}
        component={GameNavigator}
        options={{
          headerShown: false,
          tabBarLabel: TabLabel.GAMES,
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
