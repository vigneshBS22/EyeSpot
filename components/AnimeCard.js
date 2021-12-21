import {Box, AspectRatio, Center, Image, Text, Pressable} from 'native-base';
import {background} from 'native-base/lib/typescript/theme/styled-system';
import React from 'react';
import {useColor} from '../Context/ColorContext';
import {ScreenName} from '../Navigators/AnimeNavigator/constants';

export default function Card({navigation, item}) {
  const {
    state: {theme},
  } = useColor();
  return (
    <Pressable
      width={'95%'}
      mx={2}
      shadow={9}
      rounded={'xl'}
      mt={5}
      bg={theme.bg}
      onPress={() =>
        navigation.navigate(ScreenName.ANIME_INFO_SCREEN, {
          item,
        })
      }>
      <Box bg={theme.bg}>
        <Box mt={3}>
          <AspectRatio w="90%" mx={5}>
            <Image
              source={{
                uri: item.imageUrl,
              }}
              alt="image"
              rounded={'xl'}
            />
          </AspectRatio>
          <Center
            bg="violet.500"
            _text={{
              color: 'warmGray.50',
              fontWeight: '700',
              fontSize: 'xs',
            }}
            position="absolute"
            bottom="5"
            left="7"
            px="3"
            py="1.5"
            borderRadius={5}>
            {item.episodes} episodes
          </Center>
          <Center
            bg={theme.bg}
            _text={{
              color: theme.text,
              fontWeight: '700',
              fontSize: 'xs',
            }}
            position="absolute"
            top="5"
            right="7"
            px="3"
            py="1.5"
            borderRadius={5}>
            <Text>{item.rating}*</Text>
          </Center>
        </Box>
        <Center py={2}>
          <Text fontWeight={'extrabold'} fontStyle={'italic'}>
            {item.name}
          </Text>
        </Center>
      </Box>
    </Pressable>
  );
}
