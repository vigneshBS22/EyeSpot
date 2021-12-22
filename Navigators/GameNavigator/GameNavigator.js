import React from 'react';
import ItemDiscussion from '../../components/ItemDiscussion';
import {GameStack} from '../../constants';
import GameInfoScreen from '../../screens/GameScreen/GamesInfoScreen';
import GamesScreen from '../../screens/GameScreen/GamesScreen';
import {ScreenName} from './constants';

export default function GameNavigator() {
  return (
    <GameStack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <GameStack.Screen
        name={ScreenName.GAMES_SCREEN}
        component={GamesScreen}
      />
      <GameStack.Screen
        name={ScreenName.GAMES_INFO_SCREEN}
        component={GameInfoScreen}
        options={({route}) => ({title: route.params.name})}
      />
      <GameStack.Screen
        name={ScreenName.GAME_REVIEW_SCREEN}
        component={ItemDiscussion}
        options={{
          title: 'Reviews',
        }}
      />
    </GameStack.Navigator>
  );
}
