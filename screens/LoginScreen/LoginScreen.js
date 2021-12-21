import React, {useState} from 'react';
import {
  Input,
  FormControl,
  Center,
  NativeBaseProvider,
  Button,
  HStack,
  Box,
  Text,
} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {styles} from './styles';
import {useColor} from '../../Context/ColorContext';
import GoogleIcon from '../../components/GoogleIcon';
import FacebookIcon from '../../components/FacebookIcon';
import {useDispatch} from 'react-redux';
import {emailLoginAsync} from '../../features/authSlice';

export const Form = () => {
  const [details, setDetails] = useState({
    email: '',
    password: '',
  });

  const {
    state: {theme},
  } = useColor();
  const dispatch = useDispatch();

  return (
    <KeyboardAwareScrollView style={styles.scroll} scrollEnabled={false}>
      <Box>
        <FormControl
          w={{
            base: '90%',
          }}
          mx={'5%'}>
          <Input
            shadow={theme.shadow}
            bg={theme.inputbg}
            variant={theme.bg === 'black' ? 'unstyled' : 'outline'}
            p={4}
            value={details.email}
            onChangeText={text => {
              setDetails({...details, email: text});
            }}
            placeholder="Email"
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
            placeholder="Password"
          />
        </FormControl>
        <Button
          shadow={theme.shadow}
          mt="2"
          w="90%"
          p={3}
          colorScheme="indigo"
          onPress={() => dispatch(emailLoginAsync(details))}
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

const LoginScreen = () => {
  const {
    state: {theme},
  } = useColor();

  return (
    <NativeBaseProvider>
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
        <Form />
        {/* <Divider bg="indigo.500" thickness="2" my="5" /> */}
      </Center>
    </NativeBaseProvider>
  );
};

export default LoginScreen;
