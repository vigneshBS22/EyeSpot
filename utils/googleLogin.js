import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Config from 'react-native-config';

GoogleSignin.configure({
  webClientId: Config.GOOGLE_WEBCLIENT_ID,
});

export async function onGoogleButtonPress() {
  const {idToken} = await GoogleSignin.signIn();

  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

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
