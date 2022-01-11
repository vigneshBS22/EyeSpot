import {Avatar, Box, HStack, Text, VStack} from 'native-base';
import React from 'react';
import {Rating} from 'react-native-ratings';
import {useSelector} from 'react-redux';
import {useColor} from '../Context/ColorContext';
import {selectReview} from '../features/reviewSlice';
import UpdateModal from './updateModal';

export default function Comment({
  comment,
  item_id,
  average_rating,
  count,
  type,
}) {
  const {
    state: {theme},
  } = useColor();
  const {user} = useSelector(selectReview);
  return (
    <Box
      width={'100%'}
      bg={theme.bg}
      p={3}
      borderBottomWidth={1}
      borderColor={'indigo.100'}>
      <HStack justifyContent={'space-between'}>
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

        {comment.user_id === (user.length === 0 ? '' : user[0].user_id) && (
          <UpdateModal
            previousRating={comment.rating}
            previousReview={comment.message}
            id={comment.id}
            item_id={item_id}
            average_rating={average_rating}
            count={count}
            type={type}
          />
        )}
      </HStack>
      <Text pt={3} color={theme.text} ml={1}>
        {comment.message}
      </Text>
    </Box>
  );
}
