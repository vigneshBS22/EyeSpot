import {
  Box,
  AspectRatio,
  Image,
  HStack,
  Button,
  Center,
  ScrollView,
} from 'native-base';
import React, {useState} from 'react';
import {useColor} from '../Context/ColorContext';
import ItemInfo from './AnimeItemInfo';
import ItemReplies from './ItemReplies';

export default function AnimeInfoCard({item}) {
  const [component, setComponent] = useState('Info');
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
              onPress={() => setComponent('Info')}
              bg={component === 'Info' ? theme.bg : 'indigo.400'}
              borderRadius={'20'}
              shadow={component === 'Info' ? 9 : 2}
              mr={3}
              p={3}>
              Informations
            </Button>
            <Button
              onPress={() => setComponent('Replies')}
              bg={component === 'Replies' ? theme.bg : 'indigo.400'}
              borderRadius={'20'}
              shadow={component === 'Replies' ? 9 : 2}
              ml={3}
              p={3}>
              Replies
            </Button>
          </HStack>

          {component === 'Info' ? <ItemInfo item={item} /> : <ItemReplies />}
        </Center>
      </Box>
    </ScrollView>
  );
}
