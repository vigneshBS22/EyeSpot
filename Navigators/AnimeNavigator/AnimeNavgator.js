import React from 'react';
import ItemDiscussion from '../../components/ItemDiscussion';
import {AnimeStack} from '../../constants';
import AnimeInfoScreen from '../../screens/AnimeScreen/AnimeInfoScreen';
import AnimeScreen from '../../screens/AnimeScreen/AnimeScreen';
import {ScreenName} from './constants';

export default function AnimeNavigator() {
  return (
    <AnimeStack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <AnimeStack.Screen
        name={ScreenName.ANIME_SCREEN}
        component={AnimeScreen}
      />
      <AnimeStack.Screen
        name={ScreenName.ANIME_INFO_SCREEN}
        component={AnimeInfoScreen}
        options={({route}) => ({title: route.params.name})}
      />
      <AnimeStack.Screen
        name={ScreenName.ANIME_REVIEW_SCREEN}
        component={ItemDiscussion}
        options={{
          title: 'Reviews',
        }}
      />
    </AnimeStack.Navigator>
  );
}
