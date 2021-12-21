import React from 'react';
import {GameStack} from '../../constants';
import GameInfoScreen from '../../screens/GameScreen/GamesInfoScreen';
import GamesScreen from '../../screens/GameScreen/GamesScreen';
import {ScreenName} from './constants';

export default function GameNavigator() {
  return (
    <GameStack.Navigator>
      <GameStack.Screen
        name={ScreenName.GAMES_SCREEN}
        component={GamesScreen}
      />
      <GameStack.Screen
        name={ScreenName.GAMES_INFO_SCREEN}
        component={GameInfoScreen}
      />
    </GameStack.Navigator>
  );
}
