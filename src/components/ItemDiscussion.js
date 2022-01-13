import {Box, Center, FlatList, Spinner, Text} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import {useColor} from '../Context/ColorContext';
import Comment from './Comment';
import Modal from './reviewModal';
import {useSelector, useDispatch} from 'react-redux';
import {
  selectReview,
  fetchNextReviewData,
  fetchReviewData,
  clearReviews,
} from '../store/reviewSlice';
import {Rating} from 'react-native-ratings';
import {selectItem} from '../store/itemSlice';

export default function ItemDiscussion({route}) {
  const {
    state: {theme},
  } = useColor();
  const {id, type} = route.params;
  const {reviews, lastReview, reviewLastVisible} = useSelector(selectReview);
  const {animeData, gamesData, homeScreenAnimeData, homeScreenGamesData} =
    useSelector(selectItem);
  const dispatch = useDispatch();

  const getItem = () => {
    if (type === 'anime') {
      return animeData.filter(item => item.id === id)[0];
    } else {
      return gamesData.filter(item => item.id === id)[0];
    }
  };

  let item = getItem();

  if (item === undefined) {
    if (type === 'anime') {
      item = homeScreenAnimeData.filter(item => item.id === id)[0];
    } else {
      item = homeScreenGamesData.filter(item => item.id === id)[0];
    }
  }

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
    return () => {
      dispatch(clearReviews());
    };
  }, []);

  const [rating, setRating] = useState(3);
  return (
    <Box>
      <Box>
        <Center>
          <Text fontSize={'6xl'} bold color={theme.text}>
            {item.average_rating.toFixed(1)}
          </Text>
          <Rating
            readonly={true}
            startingValue={item.average_rating.toFixed(1)}
            imageSize={30}
            tintColor={theme.itemDiscussionBg}
            type={'custom'}
            fractions={2}
          />
          <Text fontSize={'xs'} color={theme.text}>
            based on {item.total_ratings} reviews
          </Text>
        </Center>
      </Box>
      <FlatList
        maxH={'81%'}
        minH={'81%'}
        data={reviews}
        renderItem={({item: comment}) => (
          <Comment
            comment={comment}
            item_id={item.id}
            average_rating={item.average_rating}
            count={item.total_ratings}
            type={item.type}
          />
        )}
        keyExtractor={item => item.id}
        onEndReached={getNextReviews}
        onEndReachedThreshold={0.01}
        scrollEventThrottle={150}
        ListFooterComponent={!lastReview && <Spinner />}
      />
      <Modal item={item} rating={rating} setRating={setRating} />
    </Box>
  );
}
