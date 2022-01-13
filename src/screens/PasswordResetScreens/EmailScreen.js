import {Box, FormControl, Input, Button, useToast} from 'native-base';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useColor} from '../../Context/ColorContext';
import {selectAuth, sendEmailAsync} from '../../store/authSlice';
import useFieldUpdate from '../../utils/useFieldUpdate';
import {emailValidator} from '../../utils/validators';

export default function EmailScreen({navigation}) {
  const email = useFieldUpdate('', emailValidator, 'register');
  const {
    state: {theme},
  } = useColor();
  const [submit, setSubmit] = useState(false);
  const dispatch = useDispatch();
  const {error} = useSelector(selectAuth);

  useEffect(() => {
    if (error === false && submit === true)
      toast.show({
        title: 'Email sent',
        status: 'success',
        duration: 2000,
        placement: 'top',
      });
    setSubmit(false);
  }, [error, submit]);

  const Reset = async () => {
    setSubmit(true);
    if (!email.error) {
      dispatch(sendEmailAsync(email.value));
    }
  };
  const toast = useToast();

  return (
    <Box>
      <FormControl
        py={4}
        w={{
          base: '90%',
        }}
        mx={'5%'}
        isInvalid={submit && !!email.error}>
        <Input
          shadow={theme.shadow}
          bg={theme.inputbg}
          variant={theme.bg === 'black' ? 'unstyled' : 'outline'}
          p={4}
          type="email"
          value={email.value}
          onChangeText={email.changeHandler}
          color={theme.text}
          placeholder="Enter email id"
        />

        <FormControl.ErrorMessage>{email.error}</FormControl.ErrorMessage>
      </FormControl>
      <Button
        shadow={8}
        mt="2"
        w="90%"
        p={3}
        colorScheme="indigo"
        mx={'5%'}
        onPress={() => {
          Reset();
        }}>
        Submit
      </Button>
    </Box>
  );
}
