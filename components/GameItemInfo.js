import {HStack, Stack, Text, Center} from 'native-base';
import React from 'react';
import {useColor} from '../Context/ColorContext';
import InfoBox from './InfoBox';

export default function GameItemInfo({item}) {
  const {
    state: {theme},
  } = useColor();
  return (
    <Stack>
      <Text bold fontSize={25} color={theme.text} mx={3} mt={5}>
        {item.name}
      </Text>
      {console.log(item)}
      <Center>
        <HStack space={10} mt={5}>
          <InfoBox info={'Rating'} number={item.rating} />
          <InfoBox info={'Language'} number={'ENG'} />
        </HStack>
      </Center>
      <Text color={theme.text} lineHeight={20} mx={3} mt={5}>
        {item.description}
      </Text>
    </Stack>
  );
}