import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export async function onFacebookButtonPress() {
  const result = await LoginManager.logInWithPermissions([
    'public_profile',
    'email',
  ]);

  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }

  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw 'Something went wrong obtaining access token';
  }

  const facebookCredential = auth.FacebookAuthProvider.credential(
    data.accessToken,
  );

  auth()
    .signInWithCredential(facebookCredential)
    .then(result =>
      result.additionalUserInfo.isNewUser
        ? firestore()
            .collection('Users')
            .doc(result.user.uid)
            .set({
              name: result.additionalUserInfo.profile.name,
              email: result.additionalUserInfo.profile.email,
              isAdmin: false,
            })
            .then(() => {
              console.log('User added!');
            })
        : null,
    )
    .catch(err => console.log(err));
}
