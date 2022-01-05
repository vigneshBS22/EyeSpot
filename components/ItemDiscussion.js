import {Box, Center, FlatList, Spinner, Text} from 'native-base';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
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
import {Rating} from 'react-native-ratings';

export default function ItemDiscussion({route}) {
  const {
    state: {theme},
  } = useColor();
  const {item} = route.params;
  const {reviews, lastReview, reviewLastVisible} = useSelector(selectReview);

  const dispatch = useDispatch();

  const getNextReviews = useCallback(() => {
    if (!lastReview) {
      dispatch(
        fetchNextReviewData({
          item_id: item.id,
          startAfter: reviewLastVisible,
          lastReview: lastReview,
        }),
      );
    }
  }, [lastReview, reviewLastVisible]);

  useEffect(() => {
    dispatch(fetchReviewData({item_id: item.id}));
  }, []);

  const [click, setClick] = useState(false);
  const [rating, setRating] = useState(3);

  return (
    <Box>
      <Box>
        <Center>
          <Text fontSize={'6xl'} bold color={theme.text}>
            {!click === true
              ? item.average_rating.toFixed(2)
              : (
                  (item.average_rating * item.total_ratings + rating) /
                  (item.total_ratings + 1)
                ).toFixed(2)}
          </Text>
          <Rating
            readonly={true}
            startingValue={
              !click
                ? item.average_rating.toFixed(2)
                : (
                    (item.average_rating * item.total_ratings + rating) /
                    (item.total_ratings + 1)
                  ).toFixed(2)
            }
            imageSize={30}
            tintColor={theme.itemDiscussionBg}
            type={'custom'}
            fractions={2}
          />
          <Text fontSize={'xs'} color={theme.text}>
            based on {!click ? item.total_ratings : item.total_ratings + 1}{' '}
            reviews
          </Text>
        </Center>
      </Box>
      <FlatList
        maxH={'81%'}
        minH={'81%'}
        data={reviews}
        renderItem={({item}) => <Comment comment={item} />}
        keyExtractor={item => item.id}
        onEndReached={getNextReviews}
        onEndReachedThreshold={0.01}
        scrollEventThrottle={150}
        ListFooterComponent={!lastReview && <Spinner />}
      />
      <Modal
        item={item}
        setClick={setClick}
        rating={rating}
        setRating={setRating}
      />
    </Box>
  );
}
