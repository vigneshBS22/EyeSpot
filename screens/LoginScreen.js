import React from 'react';
import {
  Input,
  FormControl,
  Center,
  NativeBaseProvider,
  Button,
  Link,
  HStack,
  Box,
  Stack,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

export const Form = () => {
  return (
    <Box width={'100%'} px={'3'}>
      <FormControl
        w={{
          base: '100%',
        }}>
        <FormControl.Label>Username</FormControl.Label>
        <Input placeholder="Enter Username" />
      </FormControl>
      <FormControl
        w={{
          base: '100%',
          md: '30%',
        }}>
        <FormControl.Label>Password</FormControl.Label>
        <Input placeholder="Enter password" />
        <Link
          _text={{
            fontSize: 'xs',
            fontWeight: '500',
            color: 'indigo.500',
          }}
          alignSelf="flex-end"
          mt="1">
          Forgot password?
        </Link>
      </FormControl>
      <Button mt="2" colorScheme="indigo">
        Log in
      </Button>
    </Box>
  );
};

const SocialMediaSignup = () => {
  return (
    <HStack py={'10'} space={3}>
      <Icon.Button name="google" backgroundColor="#FFA500">
        Login with Google
      </Icon.Button>
      <Icon.Button name="facebook" backgroundColor="#4285F4">
        Login with Facebook
      </Icon.Button>
    </HStack>
  );
};

const LoginScreen = ({setLogin}) => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Form />
        <Box py={10}>OR</Box>
        <SocialMediaSignup />
      </Center>
    </NativeBaseProvider>
  );
};

export default LoginScreen;
