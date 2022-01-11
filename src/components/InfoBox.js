import {Center, Stack, Text} from 'native-base';
import React from 'react';
import {useColor} from '../Context/ColorContext';

export default function InfoBox({info, number}) {
  const {
    state: {theme},
  } = useColor();
  return (
    <Stack p={5} bg={theme.bg} borderRadius={10} shadow={1}>
      <Text color={theme.text}>{info}</Text>
      <Center>
        <Text color={theme.text} lineHeight={20}>
          {number}
        </Text>
      </Center>
    </Stack>
  );
}
