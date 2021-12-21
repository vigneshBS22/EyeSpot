import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const onSignUpButtonPress = details => {
  auth()
    .createUserWithEmailAndPassword(details.email, details.password)
    .then(result => {
      result.additionalUserInfo.isNewUser
        ? firestore()
            .collection('Users')
            .doc(result.user.uid)
            .set({
              name: details.name,
              email: details.email,
              isAdmin: false,
            })
            .then(() => {
              console.log('User added!');
            })
        : null;
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

export const googleLoginAsync = createAsyncThunk(
  'auth/googleLogin',
  async () => {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    try {
      let result = await auth().signInWithCredential(googleCredential);
      if (result.additionalUserInfo.isNewUser) {
        console.log('google new user coming');
        try {
          let user = await firestore()
            .collection('Users')
            .doc(result.user.uid)
            .set({
              name: result.additionalUserInfo.profile.name,
              email: result.additionalUserInfo.profile.email,
              isAdmin: false,
            });
          console.log(user);
        } catch (err) {
          throw err;
        }
      } else console.log('not added');
    } catch (err) {
      throw err;
    }
  },
);

export const googleLoginAsync = createAsyncThunk(
  'auth/googleLogin',
  async () => {
    try {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      console.log('starting');
      auth()
        .signInWithCredential(googleCredential)
        .then(
          result =>
            result.additionalUserInfo.isNewUser
              ? firestore()
                  .collection('Users')
                  .doc(result.user.uid)
                  .set({
                    name: result.additionalUserInfo.profile.name,
                    email: result.additionalUserInfo.profile.email,
                    isAdmin: false,
                  })
                  .then(res => {
                    console.log(res);
                  })
              : null,
          console.log('google sign in'),
        );
    } catch (err) {
      throw err;
    }
  },
);
