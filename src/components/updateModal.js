import React, {useState, useRef} from 'react';
import {Modal, Button, Input, FormControl, Text, Box, Icon} from 'native-base';
import {useColor} from '../Context/ColorContext';
import {Rating} from 'react-native-ratings';
import {useDispatch} from 'react-redux';
import {updateCommentData} from '../features/itemSlice';
import {updateReview} from '../features/reviewSlice';
import {ERROR_MESSAGE} from './constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function UpdateModal({
  previousRating,
  previousReview,
  id,
  item_id,
  average_rating,
  count,
  type,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const initialRef = useRef(null);
  const {
    state: {theme},
  } = useColor();
  const dispatch = useDispatch();
  const [review, setReview] = useState(previousReview);
  const [submit, setSubmit] = useState(false);
  const [rating, setRating] = useState(previousRating);

  const onSubmit = () => {
    setSubmit(true);
    if (review !== '') {
      dispatch(
        updateReview({
          item_id: item_id,
          review_id: id,
          message: review,
          rating: rating,
        }),
      );
      dispatch(
        updateCommentData({
          changeRating: rating - previousRating,
          avgRating: average_rating,
          count: count,
          itemId: item_id,
          type: type,
        }),
      );
      setModalVisible(false);
    }
  };

  return (
    <>
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        initialFocusRef={initialRef}>
        <Modal.Content bg={theme.bg}>
          <Modal.CloseButton />
          <Modal.Header>
            <Text color={theme.text}>Update Review</Text>
          </Modal.Header>
          <Modal.Body>
            <FormControl isInvalid={submit === true && review === ''}>
              <FormControl.Label>
                <Text color={theme.text}>Review</Text>
              </FormControl.Label>
              <Input
                _focus={{borderColor: theme.primary}}
                color={theme.text}
                ref={initialRef}
                value={review}
                onChangeText={text => setReview(text)}
              />
              <FormControl.ErrorMessage>
                {ERROR_MESSAGE.REVIEW}
              </FormControl.ErrorMessage>
            </FormControl>
            <Text color={theme.text} mt={4}>
              Rating {rating}
            </Text>
            <Box width="90%">
              <Rating
                jumpValue={1}
                startingValue={rating}
                onFinishRating={num => setRating(num)}
                tintColor={theme.bg}
              />
            </Box>
          </Modal.Body>
          <Modal.Footer bg={theme.bg}>
            <Button
              colorScheme="indigo"
              onPress={() => {
                onSubmit();
              }}>
              Update
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Icon
        mt="2"
        size="6"
        as={<MaterialIcons name="edit" />}
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
      />
    </>
  );
}
