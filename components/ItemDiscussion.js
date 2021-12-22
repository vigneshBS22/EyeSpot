import {Box, Center, FlatList, HStack, Input, Text} from 'native-base';
import React from 'react';
import {useColor} from '../Context/ColorContext';
import Comment from './Comment';
import Modal from './Modal';
import UserRating from './UserRating';

export default function ItemDiscussion({route}) {
  const {
    state: {theme},
  } = useColor();
  const {item} = route.params;

  const calculateAvgRatings = () => {
    return (
      item.comments.reduce((acc, curr) => {
        return acc + curr.rating;
      }, 0) / item.comments.length
    );
  };
  const avgRatings = calculateAvgRatings();

  return (
    <Box>
      <Box>
        <Center>
          <Text fontSize={'6xl'} bold>
            {avgRatings}.0
          </Text>
          <UserRating avgRatings={avgRatings} size={5} comp={'avg'} />
          <Text fontSize={'xs'} color={theme.text}>
            based on {item.comments.length} reviews
          </Text>
        </Center>
      </Box>

      <FlatList
        maxH={'74%'}
        minH={'74%'}
        data={item.comments}
        renderItem={({item}) => <Comment comment={item} />}
        keyExtractor={item => item.id}
      />
      <Modal />
    </Box>
  );
}
