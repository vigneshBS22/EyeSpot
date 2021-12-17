import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';

export const logoutAsync = createAsyncThunk('auth/logoutUser', async () => {
  return auth().signOut();
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    name: '',
    isAdmin: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.name = action.name;
      state.isAdmin = action.isAdmin;
    },
  },
  extraReducers: {
    [logoutAsync.fulfilled]: state => {
      state.name = '';
      state.isAdmin = false;
    },
  },
});

export const {setUser, logout} = authSlice.actions;

export const selectAuth = state => state.auth;

export default authSlice.reducer;
