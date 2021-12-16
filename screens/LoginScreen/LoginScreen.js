import React, {useState} from 'react';
import {
  Input,
  FormControl,
  Center,
  NativeBaseProvider,
  Button,
  HStack,
  Box,
  Divider,
} from 'native-base';
import auth from '@react-native-firebase/auth';

import Icon from 'react-native-vector-icons/FontAwesome';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {onFacebookButtonPress} from '../../utils/facebookLogin';
import {onGoogleButtonPress} from '../../utils/googleLogin';
import {styles} from './styles';
export const Form = () => {
  const [details, setDetails] = useState({
    email: '',
    password: '',
  });

  const submit = () => {
    auth()
      .signInWithEmailAndPassword(details.email, details.password)
      .then(() => {
        console.log('logged in');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        console.error(error);
      });
  };

  return (
    <KeyboardAwareScrollView style={styles.scroll} scrollEnabled={false}>
      <Box py={'50%'}>
        <FormControl
          w={{
            base: '100%',
          }}>
          <FormControl.Label>Username</FormControl.Label>
          <Input
            value={details.email}
            onChangeText={text => {
              setDetails({...details, email: text});
            }}
            placeholder="Enter Email"
          />
        </FormControl>
        <FormControl
          w={{
            base: '100%',
            md: '30%',
          }}>
          <FormControl.Label>Password</FormControl.Label>
          <Input
            type="password"
            value={details.password}
            onChangeText={text => {
              setDetails({...details, password: text});
            }}
            placeholder="Enter password"
          />
        </FormControl>
        <Button mt="2" colorScheme="indigo" onPress={submit}>
          Log in
        </Button>
      </Box>
    </KeyboardAwareScrollView>
  );
};

const SocialMediaSignup = () => {
  return (
    <HStack py={'5'} space={3}>
      <Icon.Button
        name="google"
        backgroundColor="#FFA500"
        onPress={() => onGoogleButtonPress()}>
        Login with Google
      </Icon.Button>
      <Divider bg="indigo.500" thickness="1" orientation="vertical" />
      <Icon.Button
        name="facebook"
        backgroundColor="#4285F4"
        onPress={() =>
          onFacebookButtonPress().then(result => console.log(result))
        }>
        Login with Facebook
      </Icon.Button>
    </HStack>
  );
};

const LoginScreen = () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3" justifyContent={'flex-start'}>
        <Form />
        <Divider bg="indigo.500" thickness="2" my="5" />
        <SocialMediaSignup />
      </Center>
    </NativeBaseProvider>
  );
};

export default LoginScreen;
