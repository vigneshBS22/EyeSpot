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
import {ScreenName} from '../Navigators/AnimeNavigator/constants';
import ItemInfo from './AnimeItemInfo';

export default function AnimeInfoCard({item, navigation}) {
  const {
    state: {theme},
  } = useColor();
  return (
    <ScrollView>
      <Box>
        <AspectRatio ratio={16 / 9}>
          <Image
            source={{
              uri: item.imageUrl,
            }}
            alt="image"
          />
        </AspectRatio>
      </Box>

      <Box bg={theme.infoCardbg} h={'full'}>
        <Center>
          <HStack mt={5} p={3} bg={'indigo.300'} borderRadius={'30'}>
            <Button
              bg={'indigo.400'}
              borderRadius={'20'}
              shadow={9}
              mr={3}
              p={3}>
              Information
            </Button>
            <Button
              bg={theme.bg}
              borderRadius={'20'}
              shadow={2}
              ml={3}
              p={3}
              onPress={() =>
                navigation.navigate(ScreenName.ANIME_REVIEW_SCREEN, {
                  item,
                })
              }>
              Discussion
            </Button>
          </HStack>
          <ItemInfo item={item} />
        </Center>
      </Box>
    </ScrollView>
  );
}
