import React, {useEffect, useState} from 'react';
import {
  Input,
  FormControl,
  Center,
  NativeBaseProvider,
  Button,
  HStack,
  Box,
  Text,
  Link,
  useToast,
} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {styles} from './styles';
import {useColor} from '../../Context/ColorContext';
import GoogleIcon from '../../components/GoogleIcon';
import FacebookIcon from '../../components/FacebookIcon';
import {useDispatch} from 'react-redux';
import {emailLoginAsync, updateClick} from '../../features/authSlice';
import {emailValidator, passwordValidator} from '../../utils/validators';
import useFieldUpdate from '../../utils/useFieldUpdate';
import Overlay from '../../components/Overlay';

export const Form = ({navigation}) => {
  const {
    state: {theme},
  } = useColor();
  const dispatch = useDispatch();

  const email = useFieldUpdate('', emailValidator, 'login');
  const password = useFieldUpdate('', passwordValidator, 'login');
  const [submitForm, setSubmitForm] = useState(false);
  const submit = () => {
    if (!email.error && !password.error) {
      dispatch(emailLoginAsync({email: email.value, password: password.value}));
      dispatch(updateClick());
    } else console.log('Validation Failed');
    setSubmitForm(true);
  };

  return (
    <KeyboardAwareScrollView style={styles.scroll} scrollEnabled={false}>
      <Box>
        <FormControl
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
            placeholder="Email"
          />
          <FormControl.ErrorMessage>{email.error}</FormControl.ErrorMessage>
        </FormControl>
        <FormControl
          py={5}
          w={{
            base: '90%',
          }}
          mx={'5%'}
          isInvalid={submitForm && !!password.error}>
          <Input
            shadow={theme.shadow}
            bg={theme.inputbg}
            variant={theme.bg === 'black' ? 'unstyled' : 'outline'}
            p={4}
            type="password"
            value={password.value}
            onChangeText={password.changeHandler}
            placeholder="Password"
          />
          <FormControl.ErrorMessage>{password.error}</FormControl.ErrorMessage>
        </FormControl>
        <Link
          _text={{
            fontSize: 'xs',
            fontWeight: '500',
            color: 'indigo.500',
          }}
          alignSelf="flex-end"
          mt="1"
          onPress={() => navigation.navigate('Email')}>
          Forgot password?
        </Link>
        <Button
          shadow={theme.shadow}
          mt="2"
          w="90%"
          p={3}
          colorScheme="indigo"
          onPress={() => submit()}
          mx={'5%'}>
          Log in
        </Button>
      </Box>
    </KeyboardAwareScrollView>
  );
};

const SocialMediaSignup = () => {
  return (
    <HStack space={3}>
      <GoogleIcon />
      <FacebookIcon />
    </HStack>
  );
};

const LoginScreen = ({navigation}) => {
  const {
    state: {theme},
  } = useColor();

  return (
    <NativeBaseProvider>
      <Overlay />
      <Box mx={10} my={5} mt={20}>
        <Text fontSize={40} bold color={theme.text}>
          Log in
        </Text>
      </Box>
      <Center flex={1} px="3" justifyContent={'flex-start'}>
        <SocialMediaSignup />
        <Box my={10} fontSize={20}>
          <Text color={theme.text} bold>
            Or login using
          </Text>
        </Box>
        <Form navigation={navigation} />
      </Center>
    </NativeBaseProvider>
  );
};

export default LoginScreen;
