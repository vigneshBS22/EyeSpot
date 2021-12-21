import {Box, AspectRatio, Center, Image, Text} from 'native-base';
import React from 'react';
import {useColor} from '../Context/ColorContext';

export default function Card() {
  const {
    state: {theme},
  } = useColor();
  return (
    <Box bg={theme.bg} width={'95%'} mx={2} shadow={9} rounded={'xl'}>
      <Box mt={3}>
        <AspectRatio w="90%" mx={5}>
          <Image
            source={{
              uri: 'https://static2.cbrimages.com/wordpress/wp-content/uploads/2021/05/link-click-cover.jpg?q=50&fit=crop&w=960&h=500&dpr=1.5',
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
          12 episodes
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
          5*
        </Center>
      </Box>
      <Center py={2}>
        <Text fontWeight={'extrabold'} fontStyle={'italic'}>
          Link Click
        </Text>
      </Center>
    </Box>
  );
}
