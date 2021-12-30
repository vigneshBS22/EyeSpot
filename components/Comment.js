import {Avatar, Box, Center, HStack, Text, VStack} from 'native-base';
import React from 'react';
import {Rating} from 'react-native-ratings';
import {useColor} from '../Context/ColorContext';
import UserRating from './UserRating';

export default function Comment({comment}) {
  const {
    state: {theme},
  } = useColor();
  return (
    <Box
      width={'100%'}
      bg={theme.bg}
      p={3}
      borderBottomWidth={1}
      borderColor={'indigo.100'}>
      <HStack>
        <Avatar bg="indigo.500" size="md">
          {comment.user_name.charAt(0)}
        </Avatar>
        <VStack ml={2}>
          <Text color={theme.text} bold>
            {comment.user_name}
          </Text>
          {!comment ? null : (
            <Rating
              readonly={true}
              startingValue={comment.rating}
              tintColor={theme.bg}
              jumpValue={0}
              imageSize={20}
              type={'custom'}
              fractions={2}
            />
          )}
        </VStack>
      </HStack>

      <Text pt={3} color={theme.text} ml={1}>
        {comment.message}
      </Text>
    </Box>
  );
}
