import {Box, FormControl, Input, Text} from 'native-base';
import React from 'react';
import {useColor} from '../Context/ColorContext';

export default function ItemReplies() {
  const {
    state: {theme},
  } = useColor();
  return (
    <Box width={'90%'} mt={10}>
      <FormControl>
        <Input
          shadow={theme.shadow}
          bg={theme.inputbg}
          color={theme.text}
          variant={theme.bg === 'black' ? 'unstyled' : 'outline'}
          p={4}
          placeholder="Reply here"
        />
      </FormControl>
      <Text>Replies</Text>
    </Box>
  );
}
