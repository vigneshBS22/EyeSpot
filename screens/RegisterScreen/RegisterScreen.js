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
import {onSignUpButtonPress} from '../../utils/emailSignup';
import {useColor} from '../../Context/ColorContext';

export const Form = () => {
  const [details, setDetails] = useState({
    email: '',
    password: '',
    name: '',
  });

  const {
    state: {theme},
  } = useColor();

  return (
    <KeyboardAwareScrollView style={{width: '100%'}}>
      <Box width={'100%'} px={'3'}>
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
            value={details.name}
            onChangeText={text => {
              setDetails({...details, name: text});
            }}
            placeholder="Enter Name"
          />
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
            placeholder="Enter Email"
          />
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
            type="password"
            value={details.password}
            onChangeText={text => {
              setDetails({...details, password: text});
            }}
            placeholder="Enter password"
          />
        </FormControl>
        <Button
          shadow={8}
          mt="2"
          w="90%"
          p={3}
          colorScheme="indigo"
          mx={'5%'}
          onPress={() => {
            onSignUpButtonPress(details);
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
