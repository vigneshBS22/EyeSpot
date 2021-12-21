import React, {useState} from 'react';
import {
  Input,
  FormControl,
  Center,
  NativeBaseProvider,
  Button,
  Box,
  Text,
} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useColor} from '../../Context/ColorContext';
import {useDispatch} from 'react-redux';
import {emailSignupAsync, updateEnteredName} from '../../features/authSlice';

export const Form = () => {
  const [details, setDetails] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  const {
    state: {theme},
  } = useColor();

  const submit = () => {
    if (details.email !== '' && details.password !== '' && details.name !== '')
      dispatch(emailSignupAsync(details));
    else if (details.email === '') setError('asd');
    else if (details.password === '') setError('asd');
    else if (details.name === '') setError('asd');
  };

  return (
    <KeyboardAwareScrollView style={{width: '100%'}}>
      <Box width={'100%'} px={'3'}>
        <FormControl
          py={5}
          w={{
            base: '90%',
          }}
          mx={'5%'}
          isInvalid>
          <Input
            shadow={theme.shadow}
            bg={theme.inputbg}
            color={theme.text}
            variant={theme.bg === 'black' ? 'unstyled' : 'outline'}
            p={4}
            value={details.name}
            onChangeText={text => {
              setDetails({...details, name: text});
            }}
            placeholder="Enter Name"
          />
          {error !== '' && (
            <FormControl.ErrorMessage>
              Please enter name
            </FormControl.ErrorMessage>
          )}
        </FormControl>
        <FormControl
          py={5}
          w={{
            base: '90%',
          }}
          mx={'5%'}>
          <Input
            shadow={theme.shadow}
            bg={theme.inputbg}
            variant={theme.bg === 'black' ? 'unstyled' : 'outline'}
            p={4}
            value={details.username}
            onChangeText={text => {
              setDetails({...details, email: text});
            }}
            color={theme.text}
            placeholder="Enter Email"
          />
          {error !== '' && (
            <FormControl.ErrorMessage>
              Please enter name
            </FormControl.ErrorMessage>
          )}
        </FormControl>
        <FormControl
          py={5}
          w={{
            base: '90%',
          }}
          mx={'5%'}
          isInvalid={error === '' ? false : true}>
          <Input
            shadow={theme.shadow}
            bg={theme.inputbg}
            variant={theme.bg === 'black' ? 'unstyled' : 'outline'}
            p={4}
            type="password"
            value={details.password}
            onChangeText={text => {
              setDetails({...details, password: text});
            }}
            color={theme.text}
            placeholder="Enter password"
          />
          <FormControl.ErrorMessage>Please enter name</FormControl.ErrorMessage>
        </FormControl>
        <Button
          shadow={8}
          mt="2"
          w="90%"
          p={3}
          colorScheme="indigo"
          mx={'5%'}
          onPress={() => {
            dispatch(updateEnteredName(details.name));
            submit();
          }}>
          Signup
        </Button>
      </Box>
    </KeyboardAwareScrollView>
  );
};

const RegisterScreen = ({navigation}) => {
  const {
    state: {theme},
  } = useColor();
  return (
    <NativeBaseProvider>
      <Box mx={10} my={5} mt={20}>
        <Text fontSize={40} bold color={theme.text}>
          Sign Up
        </Text>
      </Box>
      <Center flex={1} px="3">
        <Form />
      </Center>
    </NativeBaseProvider>
  );
};

export default RegisterScreen;
