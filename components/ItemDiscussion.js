import {Box, Center, FlatList, Spinner, Text} from 'native-base';
import React, {useEffect, useMemo} from 'react';
import {useColor} from '../Context/ColorContext';
import Comment from './Comment';
import Modal from './reviewModal';
import UserRating from './UserRating';
import {useSelector, useDispatch} from 'react-redux';
import {selectAuth} from '../features/authSlice';
import {
  fetchNextReviewData,
  fetchReviewData,
  selectItem,
} from '../features/itemSlice';

export default function ItemDiscussion({route}) {
  const {
    state: {theme},
  } = useColor();
  const {item} = route.params;
  const {reviews, lastReview, reviewLastVisible} = useSelector(selectItem);
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

  const {user_id} = useSelector(selectAuth);

  const calculateAvgRatings = () => {
    if (reviews.length === 0) return 0;
    const result = reviews.reduce((acc, curr) => {
      return acc + curr.rating;
    }, 0);
    return Math.floor(result / reviews.length);
  };
  const avgRatings = calculateAvgRatings();

  const checkReviewed = () => {
    const res = reviews.reduce(
      (curr, review) => curr || review.user_id === user_id,
      false,
    );
    return res;
  };

  const memoizedResult = useMemo(() => {
    return checkReviewed();
  }, [reviews]);
  return (
    <Box>
      <Box>
        <Center>
          <Text fontSize={'6xl'} bold>
            {avgRatings}.0
          </Text>
          {reviews.length === 0 ? null : (
            <UserRating avgRatings={avgRatings} size={5} comp={'avg'} />
          )}
          <Text fontSize={'xs'} color={theme.text}>
            based on {reviews.length} reviews
          </Text>
        </Center>
      </Box>

      <FlatList
        maxH={memoizedResult ? '81%' : '81%'}
        minH={memoizedResult ? '81%' : '81%'}
        data={reviews}
        renderItem={({item}) => <Comment comment={item} />}
        keyExtractor={item => item.id}
        onEndReached={() => getNextReviews()}
        onEndReachedThreshold={0.01}
        scrollEventThrottle={150}
        ListFooterComponent={!lastReview && <Spinner />}
      />
      {/* {!reviewed && ( */}
      <Modal id={item.id} />
      {/* )} */}
    </Box>
  );
}
