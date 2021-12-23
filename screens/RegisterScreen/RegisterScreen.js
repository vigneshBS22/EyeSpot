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
import {
  emailValidator,
  nameValidator,
  passwordValidator,
} from '../../utils/validators';
import useFieldUpdate from '../../utils/useFieldUpdate';

export const Form = () => {
  const dispatch = useDispatch();

  const {
    state: {theme},
  } = useColor();

  const email = useFieldUpdate('', emailValidator, 'register');
  const password = useFieldUpdate('', passwordValidator, 'register');
  const name = useFieldUpdate('', nameValidator, 'register');
  const [submitForm, setSubmitForm] = useState(false);
  const onSubmit = () => {
    if (!email.error && !password.error && !name.error) {
      dispatch(updateEnteredName(name.value));
      dispatch(
        emailSignupAsync({
          email: email.value,
          password: password.value,
          name: name.value,
        }),
      );
    } else console.log('Validation Failed');
    setSubmitForm(true);
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
          isInvalid={submitForm && !!name.error}>
          <Input
            shadow={theme.shadow}
            bg={theme.inputbg}
            color={theme.text}
            variant={theme.bg === 'black' ? 'unstyled' : 'outline'}
            p={4}
            value={name.value}
            onChangeText={name.changeHandler}
            placeholder="Enter Name"
          />

          <FormControl.ErrorMessage>{name.error}</FormControl.ErrorMessage>
        </FormControl>
        <FormControl
          py={5}
          w={{
            base: '90%',
          }}
          mx={'5%'}
          isInvalid={submitForm && !!email.error}>
          <Input
            shadow={theme.shadow}
            bg={theme.inputbg}
            variant={theme.bg === 'black' ? 'unstyled' : 'outline'}
            p={4}
            value={email.value}
            onChangeText={email.changeHandler}
            color={theme.text}
            placeholder="Enter Email"
          />

          <FormControl.ErrorMessage>{email.error}</FormControl.ErrorMessage>
        </FormControl>
        <FormControl
          py={4}
          w={{
            base: '90%',
          }}
          mx={'5%'}
          isInvalid={submitForm && !!password.error}>
          <FormControl.HelperText mb={2}>
            Password must be at least 6 characters and include at least one of
            each small,capital, numeric and symbol
          </FormControl.HelperText>
          <Input
            shadow={theme.shadow}
            bg={theme.inputbg}
            variant={theme.bg === 'black' ? 'unstyled' : 'outline'}
            p={4}
            type="password"
            value={password.value}
            onChangeText={password.changeHandler}
            color={theme.text}
            placeholder="Enter password"
          />

          <FormControl.ErrorMessage>{password.error}</FormControl.ErrorMessage>
        </FormControl>
        <Button
          shadow={8}
          mt="2"
          w="90%"
          p={3}
          colorScheme="indigo"
          mx={'5%'}
          onPress={() => {
            onSubmit();
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
