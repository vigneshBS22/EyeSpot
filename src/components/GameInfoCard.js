import {
  Box,
  AspectRatio,
  Image,
  HStack,
  Button,
  Center,
  ScrollView,
} from 'native-base';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {useColor} from '../Context/ColorContext';
import {ScreenName} from '../Navigators/GameNavigator/constants';
import GameItemInfo from './GameItemInfo';

export default function GameInfoCard({item, navigation}) {
  const {
    state: {theme},
  } = useColor();
  return (
    <ScrollView bg={theme.infoCardbg} height={'100%'} flex={1}>
      <Box>
        <AspectRatio ratio={16 / 9}>
          <FastImage
            source={{
              uri: item.image_url,
            }}
            alt="image"
          />
        </AspectRatio>
      </Box>
      <Box h={'full'}>
        <Center>
          <HStack mt={5} p={3} bg={'indigo.300'} borderRadius={'30'}>
            <Button
              bg={theme.primary}
              borderRadius={'20'}
              shadow={theme.shadow}
              mr={3}
              p={3}>
              Information
            </Button>
            <Button
              bg={theme.bg}
              borderRadius={'20'}
              shadow={theme.shadow}
              ml={3}
              p={3}
              onPress={() =>
                navigation.navigate(ScreenName.GAME_REVIEW_SCREEN, {
                  id: item.id,
                  type: item.type,
                  from: 'animeScreen',
                })
              }>
              Discussion
            </Button>
          </HStack>
          <GameItemInfo item={item} />
        </Center>
      </Box>
    </ScrollView>
  );
}
