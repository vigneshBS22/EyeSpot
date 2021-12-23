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
import {useColor} from '../Context/ColorContext';
import {ScreenName} from '../Navigators/GameNavigator/constants';
import GameItemInfo from './GameItemInfo';

export default function GameInfoCard({item, navigation}) {
  const {
    state: {theme},
  } = useColor();
  return (
    <ScrollView>
      <Box>
        <AspectRatio ratio={16 / 9}>
          <Image
            source={{
              uri: item.image_url,
            }}
            alt="image"
          />
        </AspectRatio>
      </Box>
      <Box bg={theme.infoCardbg} h={'full'}>
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
                  item,
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
