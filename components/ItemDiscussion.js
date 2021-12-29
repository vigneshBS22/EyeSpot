import {Box, Center, FlatList, Spinner, Text} from 'native-base';
import React, {useEffect, useMemo} from 'react';
import {useColor} from '../Context/ColorContext';
import Comment from './Comment';
import Modal from './reviewModal';
import UserRating from './UserRating';
import {useSelector, useDispatch} from 'react-redux';
import {
  selectReview,
  fetchNextReviewData,
  fetchReviewData,
} from '../features/reviewSlice';

export default function ItemDiscussion({route}) {
  const {
    state: {theme},
  } = useColor();
  const {item} = route.params;
  const {reviews, lastReview, reviewLastVisible} = useSelector(selectReview);
  const dispatch = useDispatch();

  const getNextReviews = async () => {
    if (!lastReview) {
      dispatch(
        fetchNextReviewData({
          item_id: item.id,
          startAfter: reviewLastVisible,
          lastReview: lastReview,
        }),
      );
    }
  };

  useEffect(() => {
    dispatch(fetchReviewData({item_id: item.id}));
  }, []);

  return (
    <Box>
      <Box>
        <Center>
          <Text fontSize={'6xl'} bold>
            {item.average_rating}
          </Text>
          <UserRating avgRatings={item.average_rating} size={5} comp={'avg'} />
          <Text fontSize={'xs'} color={theme.text}>
            based on {item.total_ratings} reviews
          </Text>
        </Center>
      </Box>
      <FlatList
        maxH={'81%'}
        minH={'81%'}
        data={reviews}
        renderItem={({item}) => <Comment comment={item} />}
        keyExtractor={item => item.id}
        onEndReached={() => getNextReviews()}
        onEndReachedThreshold={0.01}
        scrollEventThrottle={150}
        ListFooterComponent={!lastReview && <Spinner />}
      />
      <Modal item={item} />
    </Box>
  );
}
