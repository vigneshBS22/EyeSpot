import {Center, Modal, Spinner} from 'native-base';
import React from 'react';
import {useSelector} from 'react-redux';
import {selectAuth} from '../features/authSlice';

export default function Overlay() {
  const {status} = useSelector(selectAuth);
  return (
    <Modal
      isOpen={status === 'success' ? false : true}
      closeOnOverlayClick={false}>
      <Modal.Content size={'full'} opacity={0.3}>
        <Center flex={1}>
          <Spinner />
        </Center>
      </Modal.Content>
    </Modal>
  );
}
