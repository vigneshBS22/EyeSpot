import React, {useState, useRef} from 'react';
import {
  Modal,
  Button,
  Input,
  FormControl,
  Text,
  Box,
  IconButton,
  Icon,
} from 'native-base';
import {useColor} from '../Context/ColorContext';
import {Rating} from 'react-native-ratings';
import {useDispatch} from 'react-redux';
import {addItem} from '../features/itemSlice';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  emptyValidator,
  nameValidator,
  numberValidator,
  URLValidator,
} from '../utils/validators';
import useFieldUpdate from '../utils/useFieldUpdate';
import ImagePicker from 'react-native-image-crop-picker';

export default function ItemModal({type}) {
  const [modalVisible, setModalVisible] = useState(false);
  const initialRef = useRef(null);
  const {
    state: {theme},
  } = useColor();
  const dispatch = useDispatch();

  const [rating, setRating] = useState(3);
  const name = useFieldUpdate('', nameValidator, 'register');
  const description = useFieldUpdate('', emptyValidator, 'register');
  const episodes = useFieldUpdate('', numberValidator, 'register');
  const language = useFieldUpdate('', emptyValidator, 'register');

  const [submit, setSubmit] = useState(false);
  const [imageUri, setImageUri] = useState('');
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 780,
      cropping: true,
    }).then(image => {
      setImageUri(Platform.OS === 'ios' ? image.sourceURL : image.path);
    });
  };

  const onSubmit = async () => {
    if (type === 'game') {
      if (
        !name.error &&
        !description.error &&
        !language.error &&
        imageUri !== ''
      ) {
        dispatch(
          addItem({
            name: name.value,
            image_url: imageUri,
            description: description.value,
            language: language.value,
            type: type,
            rating: rating,
          }),
        );
        setModalVisible(false);
        name.changeHandler('');
      } else console.log('Validation Failed');
    } else {
      console.log(imageUri);
      if (
        !name.error &&
        !description.error &&
        !language.error &&
        !episodes.error &&
        imageUri !== ''
      ) {
        dispatch(
          addItem({
            name: name.value,
            image_url: imageUri,
            description: description.value,
            language: language.value,
            type: type,
            rating: rating,
            episodes: episodes.value,
          }),
        );
        setModalVisible(false);
        name.changeHandler('');
      } else console.log('Validation Failed');
    }
    setSubmit(true);
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
            <Text color={theme.text}>Add New Title</Text>
          </Modal.Header>
          <Modal.Body>
            <FormControl isInvalid={submit && !!name.error}>
              <FormControl.Label>
                <Text color={theme.text}>Name</Text>
              </FormControl.Label>
              <Input
                _focus={{borderColor: theme.primary}}
                color={theme.text}
                ref={initialRef}
                value={name.value}
                onChangeText={name.changeHandler}
              />
              <FormControl.ErrorMessage>{name.error}</FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={submit && !!description.error}>
              <FormControl.Label>
                <Text color={theme.text}>Description</Text>
              </FormControl.Label>
              <Input
                _focus={{borderColor: theme.primary}}
                color={theme.text}
                value={description.value}
                onChangeText={description.changeHandler}
              />
              <FormControl.ErrorMessage>
                {description.error}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={submit && !!language.error}>
              <FormControl.Label>
                <Text color={theme.text}>Language</Text>
              </FormControl.Label>
              <Input
                _focus={{borderColor: theme.primary}}
                color={theme.text}
                value={language.value}
                onChangeText={language.changeHandler}
              />
              <FormControl.ErrorMessage>
                {language.error}
              </FormControl.ErrorMessage>
            </FormControl>
            {type === 'anime' && (
              <FormControl isInvalid={submit && !!episodes.error}>
                <FormControl.Label>
                  <Text color={theme.text}>Episodes</Text>
                </FormControl.Label>
                <Input
                  _focus={{borderColor: theme.primary}}
                  color={theme.text}
                  value={episodes.value}
                  onChangeText={episodes.changeHandler}
                />
                <FormControl.ErrorMessage>
                  {episodes.error}
                </FormControl.ErrorMessage>
              </FormControl>
            )}
            <Text color={theme.text} mt={4}>
              Rating {rating}
            </Text>
            <Box width="90%">
              <Rating
                jumpValue={1}
                startingValue={3}
                onFinishRating={num => setRating(num)}
                tintColor={theme.bg}
              />
            </Box>
            <Button
              mt="4"
              onPress={() => choosePhotoFromLibrary()}
              colorScheme="indigo">
              Upload Image
            </Button>
            {imageUri === '' && submit === true && (
              <Text color="red.400" fontSize={'sm'}>
                No image uploaded
              </Text>
            )}
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
      <IconButton
        position={'absolute'}
        right={2}
        bottom={2}
        icon={<Icon as={<AntDesign name="plus" />} />}
        bg={'white'}
        borderRadius={100}
        shadow={9}
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
      />
    </>
  );
}
