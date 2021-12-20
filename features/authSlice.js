import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const logoutAsync = createAsyncThunk('auth/logoutUser', async () => {
  return auth().signOut();
});

export const loginAsync = createAsyncThunk('auth/loginUser', async user => {
  const docRef = firestore().collection('Users').doc(user.uid);
  const doc = await docRef.get();
  return doc.data();
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    name: '',
    isAdmin: false,
  },
  reducers: {},
  extraReducers: {
    [logoutAsync.fulfilled]: state => {
      state.name = '';
      state.isAdmin = false;
    },
    [loginAsync.fulfilled]: (state, action) => {
      state.name = action.payload.name;
      state.isAdmin = action.payload.isAdmin;
    },
  },
});

// export const {} = authSlice.actions;

export const selectAuth = state => state.auth;

export default authSlice.reducer;
