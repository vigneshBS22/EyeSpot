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
  Divider,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import firestore from '@react-native-firebase/firestore';

async function onFacebookButtonPress() {
  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions([
    'public_profile',
    'email',
  ]);

  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }

  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw 'Something went wrong obtaining access token';
  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(
    data.accessToken,
  );

  // Sign-in the user with the credential
  auth()
    .signInWithCredential(facebookCredential)
    .then(result =>
      result.additionalUserInfo.isNewUser
        ? firestore()
            .collection('Users')
            .add({
              name: result.additionalUserInfo.profile.name,
              email: result.additionalUserInfo.profile.email,
              isAdmin: false,
            })
            .then(() => {
              console.log('User signed in and added!');
            })
        : console.log('user already present'),
    )
    .catch(err => console.log(err));
}

GoogleSignin.configure({
  webClientId:
    '808934789184-5b2tv6gqiop60ltiovld6go3aape04kp.apps.googleusercontent.com',
});

async function onGoogleButtonPress() {
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  // Sign-in the user with the credential
  auth()
    .signInWithCredential(googleCredential)
    .then(result =>
      result.additionalUserInfo.isNewUser
        ? firestore()
            .collection('Users')
            .add({
              name: result.additionalUserInfo.profile.name,
              email: result.additionalUserInfo.profile.email,
              isAdmin: false,
            })
            .then(() => {
              console.log('User signed in and added!');
            })
        : console.log('user already present'),
    )
    .catch(err => console.log(err));
}

export const Form = () => {
  return (
    <KeyboardAwareScrollView style={{width: '100%', maxHeight: '50%'}}>
      <Box py={'50%'}>
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
          {/* <Link
          _text={{
            fontSize: 'xs',
            fontWeight: '500',
            color: 'indigo.500',
          }}
          alignSelf="flex-end"
          mt="1">
          Forgot password?
        </Link> */}
        </FormControl>
        <Button mt="2" colorScheme="indigo">
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
