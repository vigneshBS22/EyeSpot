import {CommonActions} from '@react-navigation/native';
import {Box, AspectRatio, Center, Image, Text, Pressable} from 'native-base';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {TYPE} from '../constants';
import {useColor} from '../Context/ColorContext';
import {ScreenName as AnimeScreenName} from '../Navigators/AnimeNavigator/constants';
import {ScreenName as GamesScreenName} from '../Navigators/GameNavigator/constants';
import {ScreenName as AuthScreenName} from '../Navigators/AuthNavigator/constants';

export default function HorizontalCard({navigation, item}) {
  const {
    state: {theme},
  } = useColor();

  const navigate = () => {
    navigation.dispatch(state => {
      // if anime info is already present in state then removes it.
      // say anime 1 is open and you go to anime 2 through home screen, then anime 1 state is deleted from navigator state and only anime 2 state is added
      let routes = state.routes.filter(
        r => r.name !== AnimeScreenName.ANIME_INFO_SCREEN,
      );
      routes = state.routes.filter(
        r => r.name !== GamesScreenName.GAMES_INFO_SCREEN,
      );
      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      });
    });

    //moving to the other nested navigator screen.
    if (item.type === TYPE.ANIME) {
      navigation.navigate(AuthScreenName.ANIME_SCREEN, {
        screen: AnimeScreenName.ANIME_INFO_SCREEN,
        params: {item, name: item.name, from: 'home'},
      });
    } else {
      navigation.navigate(AuthScreenName.GAMES_SCREEN, {
        screen: GamesScreenName.GAMES_INFO_SCREEN,
        params: {item, name: item.name, from: 'home'},
      });
    }
  };
  return (
    <Pressable
      bg={theme.bg}
      onPress={() => navigate()}
      mx={1}
      my={1}
      shadow={5}
      rounded={'xl'}
      height={200}
      width={200}>
      <Box bg={theme.bg} rounded={'xl'}>
        <Box mt={3} rounded={'xl'}>
          <AspectRatio w={'95%'} marginLeft={1}>
            <FastImage
              source={{
                uri: item.image_url,
              }}
              alt="image"
              rounded={'xl'}
            />
          </AspectRatio>
          <Center
            bg={theme.bg}
            _text={{
              color: theme.text,
              fontWeight: '700',
              fontSize: 'xs',
            }}
            position="absolute"
            top="3"
            right="4"
            px="3"
            py="1.5"
            borderRadius={5}>
            <Text color={theme.text}>{item.critics_rating}*</Text>
          </Center>
        </Box>
        <Center py={2} rounded={'xl'}>
          <Text
            color={theme.text}
            fontWeight={'extrabold'}
            fontStyle={'italic'}>
            {item.name}
          </Text>
        </Center>
      </Box>
    </Pressable>
  );
}
