import React, {useState, useRef} from 'react';
import {Modal, Button, Input, FormControl, Text, Box} from 'native-base';
import {useColor} from '../Context/ColorContext';
import {Rating} from 'react-native-ratings';
import {useDispatch, useSelector} from 'react-redux';
import {selectAuth} from '../features/authSlice';
import {addReview} from '../features/itemSlice';

export default function CommentModal({id}) {
  const [modalVisible, setModalVisible] = useState(false);
  const initialRef = useRef(null);
  const {
    state: {theme},
  } = useColor();
  const dispatch = useDispatch();

  const [rating, setRating] = useState(3);
  const [review, setReview] = useState('');
  const [submit, setSubmit] = useState(false);
  const {name, user_id} = useSelector(selectAuth);

  const onSubmit = async () => {
    setSubmit(true);
    if (review !== '') {
      dispatch(
        addReview({
          item_id: id,
          user_id: user_id,
          user_name: name,
          message: review,
          rating: rating,
        }),
      );
      setModalVisible(false);
      setReview('');
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
            <Text color={theme.text}>Add Review</Text>
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
                Review must not be empty
              </FormControl.ErrorMessage>
            </FormControl>
            <Text color={theme.text} mt={4}>
              Rating {rating}
            </Text>
            <Box width="90%">
              <Rating
                jumpValue={1}
                startingValue={3}
                onFinishRating={num => setRating(num)}
              />
            </Box>
          </Modal.Body>
          <Modal.Footer bg={theme.bg}>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setModalVisible(false);
                }}>
                Cancel
              </Button>
              <Button
                colorScheme="indigo"
                onPress={() => {
                  onSubmit();
                }}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Button
        position={'absolute'}
        bottom={0}
        colorScheme="indigo"
        height={10}
        width={'100%'}
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
        _focusVisible={{background: theme.primary}}
        shadow={theme.shadow}>
        <Text color={'white'} bold>
          Add review
        </Text>
      </Button>
    </>
  );
}
