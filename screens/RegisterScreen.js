import React, {useState} from 'react';
import {
  Input,
  FormControl,
  Center,
  NativeBaseProvider,
  Button,
  Box,
} from 'native-base';
import auth from '@react-native-firebase/auth';

export const Form = () => {
  const [details, setDetails] = useState({email: '', password: ''});

  const submit = () => {
    auth()
      .createUserWithEmailAndPassword(details.email, details.password)
      .then(() => {
        console.log('User account created & signed in!');
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
    <Box width={'100%'} px={'3'}>
      <FormControl
        w={{
          base: '100%',
        }}>
        <FormControl.Label>Email</FormControl.Label>
        <Input
          value={details.username}
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
        Signup
      </Button>
    </Box>
  );
};

const RegisterScreen = ({navigation}) => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Form />
      </Center>
    </NativeBaseProvider>
  );
};

export default RegisterScreen;
