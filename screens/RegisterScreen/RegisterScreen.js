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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import firestore from '@react-native-firebase/firestore';

export const Form = () => {
  const [details, setDetails] = useState({
    email: '',
    password: '',
    name: '',
  });

  const submit = () => {
    auth()
      .createUserWithEmailAndPassword(details.email, details.password)
      .then(() => {
        firestore()
          .collection('Users')
          .add({
            name: details.name,
            email: details.email,
            isAdmin: false,
          })
          .then(() => {
            console.log('User added!');
          });
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
    <KeyboardAwareScrollView style={{width: '100%'}}>
      <Box width={'100%'} px={'3'} py={'50%'}>
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
          }}>
          <FormControl.Label>Name</FormControl.Label>
          <Input
            value={details.name}
            onChangeText={text => {
              setDetails({...details, name: text});
            }}
            placeholder="Enter Name"
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
    </KeyboardAwareScrollView>
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
