import {Avatar, Box, Center, HStack, Text, VStack} from 'native-base';
import React from 'react';
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
            <UserRating avgRatings={comment.rating} size={4} />
          )}
        </VStack>
      </HStack>

      <Text pt={3} color={theme.text} ml={1}>
        {comment.message}
      </Text>
    </Box>
  );
}
