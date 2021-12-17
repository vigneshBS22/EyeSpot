import auth from '@react-native-firebase/auth';

export const OnLoginButtonPress = details => {
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
