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

export const loginAsync = createAsyncThunk(
  'auth/loginUser',
  async (user, ThunkApi) => {
    ThunkApi.dispatch(updateUserId(user.uid));
    const docRef = firestore().collection('Users').doc(user.uid);
    const doc = await docRef.get();
    if (doc.exists) return doc.data();
    else return {name: '', isAdmin: false};
  },
);

export const emailLoginAsync = createAsyncThunk(
  'auth/emailLogin',
  async details => {
    return auth().signInWithEmailAndPassword(details.email, details.password);
  },
);

export const googleLoginAsync = createAsyncThunk(
  'auth/googleLogin',
  async (_, ThunkApi) => {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    try {
      let result = await auth().signInWithCredential(googleCredential);
      if (result.additionalUserInfo.isNewUser) {
        try {
          let user = await firestore()
            .collection('Users')
            .doc(result.user.uid)
            .set({
              name: result.additionalUserInfo.profile.name,
              email: result.additionalUserInfo.profile.email,
              is_admin: false,
              created_at: firestore.FieldValue.serverTimestamp(),
            });
          ThunkApi.dispatch(
            updateEnteredName(result.additionalUserInfo.profile.name),
          );
        } catch (err) {
          throw err;
        }
      }
    } catch (err) {
      throw err;
    }
  },
);

export const facebookLoginAsync = createAsyncThunk(
  'auth/facebookLogin',
  async (_, ThunkApi) => {
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

    try {
      let result = await auth().signInWithCredential(facebookCredential);
      if (result.additionalUserInfo.isNewUser) {
        try {
          await firestore().collection('Users').doc(result.user.uid).set({
            name: result.additionalUserInfo.profile.name,
            email: result.additionalUserInfo.profile.email,
            is_admin: false,
            created_at: firestore.FieldValue.serverTimestamp(),
          });
          ThunkApi.dispatch(
            updateEnteredName(result.additionalUserInfo.profile.name),
          );
        } catch (err) {
          return err;
        }
      }
    } catch (err) {
      return err;
    }
  },
);

export const emailSignupAsync = createAsyncThunk(
  'auth/emailSignup',
  async (details, ThunkApi) => {
    try {
      let result = await auth().createUserWithEmailAndPassword(
        details.email,
        details.password,
      );
      if (result.additionalUserInfo.isNewUser) {
        try {
          await firestore().collection('Users').doc(result.user.uid).set({
            name: details.name,
            email: details.email,
            is_admin: false,
            created_at: firestore.FieldValue.serverTimestamp(),
          });
          ThunkApi.dispatch(updateEnteredName(details.name));
        } catch (err) {
          return err;
        }
      }
    } catch (err) {
      return err;
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    name: null,
    isAdmin: false,
    status: 'success',
    login: false,
    error: false,
    error_msg: '',
    user_id: '',
  },
  reducers: {
    updateEnteredName: (state, action) => {
      state.name = action.payload;
    },
    updateError: state => {
      state.error = false;
      state.error_msg = '';
    },
    updateUserId: (state, action) => {
      state.user_id = action.payload;
    },
  },
  extraReducers: {
    [logoutAsync.fulfilled]: state => {
      state.name = '';
      state.isAdmin = false;
      state.login = false;
    },
    [loginAsync.pending]: (state, action) => {
      state.status = 'loading';
    },
    [loginAsync.fulfilled]: (state, action) => {
      state.status = 'success';
      state.name = action.payload.name;
      state.login = true;
      state.isAdmin = action.payload.is_admin;
      state.error_msg = '';
    },
    [loginAsync.rejected]: (state, action) => {
      state.status = 'success';
      state.login = false;
      state.name = '';
      state.isAdmin = false;
    },
    [emailLoginAsync.rejected]: (state, action) => {
      state.error = true;
    },
    [googleLoginAsync.rejected]: (state, action) => {
      state.error = true;
    },
    [facebookLoginAsync.rejected]: (state, action) => {
      state.error = true;
    },
    [emailSignupAsync.rejected]: (state, action) => {
      state.error = true;
    },
  },
});

export const {updateEnteredName, updateError, updateUserId} = authSlice.actions;

export const selectAuth = state => state.auth;

export default authSlice.reducer;
