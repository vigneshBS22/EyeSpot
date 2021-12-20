import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

GoogleSignin.configure({
  webClientId: Config.GOOGLE_WEBCLIENT_ID,
});

export const logoutAsync = createAsyncThunk('auth/logoutUser', async () => {
  return auth().signOut();
});

export const loginAsync = createAsyncThunk('auth/loginUser', async user => {
  const docRef = firestore().collection('Users').doc(user.uid);
  const doc = await docRef.get();
  return doc.data();
});

export const emailLoginAsync = createAsyncThunk(
  'auth/emailLogin',
  async details => {
    return auth().signInWithEmailAndPassword(details.email, details.password);
  },
);

export const googleLoginAsync = createAsyncThunk(
  'auth/googleLogin',
  async () => {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  },
);

export const facebookLoginAsync = createAsyncThunk(
  'auth/facebookLogin',
  async () => {
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

    return auth().signInWithCredential(facebookCredential);
  },
);

export const emailSignupAsync = createAsyncThunk(
  'auth/emailSignup',
  async details => {
    return auth().createUserWithEmailAndPassword(
      details.email,
      details.password,
    );
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    name: '',
    enteredName: '',
    isAdmin: false,
  },
  reducers: {
    updateEnteredName: (state, action) => {
      state.enteredName = action.payload;
    },
  },
  extraReducers: {
    [logoutAsync.fulfilled]: state => {
      state.name = '';
      state.isAdmin = false;
    },
    [loginAsync.fulfilled]: (state, action) => {
      state.name = action.payload.name;
      state.isAdmin = action.payload.isAdmin;
    },
    [emailLoginAsync.fulfilled]: (state, action) => {
      console.log('logged in');
    },
    [emailLoginAsync.rejected]: (state, action) => {
      if (action.payload.error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }
      if (action.payload.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
      console.error(action.error);
    },
    [googleLoginAsync.fulfilled]: (state, action) => {
      action.payload.additionalUserInfo.isNewUser
        ? firestore()
            .collection('Users')
            .doc(action.payload.user.uid)
            .set({
              name: action.payload.additionalUserInfo.profile.name,
              email: action.payload.additionalUserInfo.profile.email,
              isAdmin: false,
            })
            .then(() => {
              console.log('User added!');
            })
        : console.log('User not added!');
    },
    [googleLoginAsync.rejected]: (state, action) => {
      console.log('logging error:', action.error);
    },
    [facebookLoginAsync.fulfilled]: (state, action) => {
      action.payload.additionalUserInfo.isNewUser
        ? firestore()
            .collection('Users')
            .doc(action.payload.user.uid)
            .set({
              name: action.payload.additionalUserInfo.profile.name,
              email: action.payload.additionalUserInfo.profile.email,
              isAdmin: false,
            })
            .then(() => {
              console.log('User added!');
            })
        : null;
    },
    [facebookLoginAsync.rejected]: (state, action) => {
      console.log('logging error:', action.error);
    },
    [emailSignupAsync.fulfilled]: (state, action) => {
      action.payload.additionalUserInfo.isNewUser
        ? firestore()
            .collection('Users')
            .doc(action.payload.user.uid)
            .set({
              name: state.enteredName,
              email: action.payload.user.email,
              isAdmin: false,
            })
            .then(() => {
              console.log('User added!');
            })
        : null;
      console.log('User account created & signed in!');
    },
    [emailSignupAsync.rejected]: (state, action) => {
      if (action.payload.error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (action.payload.error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
      console.error(action.error);
    },
  },
});

export const {updateEnteredName} = authSlice.actions;

export const selectAuth = state => state.auth;

export default authSlice.reducer;
