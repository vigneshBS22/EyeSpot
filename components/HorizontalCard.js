import {CommonActions} from '@react-navigation/native';
import {Box, AspectRatio, Center, Image, Text, Pressable} from 'native-base';
import React from 'react';
import {useColor} from '../Context/ColorContext';

export default function HorizontalCard({navigation, item}) {
  const {
    state: {theme},
  } = useColor();

  const navigate = () => {
    navigation.dispatch(state => {
      // if anime info is already present in state then removes it.
      // say anime 1 is open and you go to anime 2 through home screen, then anime 1 state is deleted from navigator state and only anime 2 state is added
      let routes = state.routes.filter(r => r.name !== 'Anime Info');
      routes = state.routes.filter(r => r.name !== 'Games Info');
      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      });
    });

    //moving to the other nested navigator screen.
    if (item.type === 'anime') {
      navigation.navigate('AnimeScreen', {
        screen: 'Anime Info',
        params: {item, name: item.name, from: 'home'},
      });
    } else {
      navigation.navigate('GamesScreen', {
        screen: 'Games Info',
        params: {item, name: item.name, from: 'home'},
      });
    }
  };
  return (
    <Pressable
      bg={theme.bg}
      height={190}
      width={200}
      mx={1}
      rounded={'xl'}
      onPress={() => navigate()}
      mx={1}>
      <Box bg={theme.bg} rounded={'xl'}>
        <Box mt={3} rounded={'xl'}>
          <AspectRatio w={'95%'} marginLeft={1}>
            <Image
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
            <Text>{item.critics_rating}*</Text>
          </Center>
        </Box>
        <Center py={2} rounded={'xl'}>
          <Text fontWeight={'extrabold'} fontStyle={'italic'}>
            {item.name}
          </Text>
        </Center>
      </Box>
    </Pressable>
  );
}
