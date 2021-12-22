import React from 'react';
import {
  Modal,
  Button,
  Input,
  FormControl,
  Text,
  Slider,
  Box,
  Icon,
} from 'native-base';
import {useColor} from '../Context/ColorContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function CommentModal() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const initialRef = React.useRef(null);
  const {
    state: {theme},
  } = useColor();

  const [onChangeValue, setOnChangeValue] = React.useState(3);

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
            <FormControl>
              <FormControl.Label>
                <Text color={theme.text}>Review</Text>
              </FormControl.Label>
              <Input
                _focus={{borderColor: theme.primary}}
                color={theme.text}
                ref={initialRef}
              />
            </FormControl>
            <Text color={theme.text} mt={4}>
              Rating {onChangeValue}
            </Text>
            <Box width="90%">
              <Slider
                defaultValue={3}
                minValue={0}
                maxValue={5}
                step={1}
                onChange={v => {
                  setOnChangeValue(v);
                }}>
                <Slider.Track bg="yellow.200">
                  <Slider.FilledTrack bg="yellow.500" />
                </Slider.Track>
                <Slider.Thumb borderWidth="0" bg="transparent">
                  <Icon
                    ml="1"
                    color="yellow.500"
                    as={<FontAwesome name="star" />}
                  />
                </Slider.Thumb>
              </Slider>
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
                  setModalVisible(false);
                }}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Button
        colorScheme="indigo"
        height={10}
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
