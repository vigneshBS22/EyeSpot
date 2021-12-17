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
      console.log(action);
      state.name = action.payload.name;
      state.isAdmin = action.payload.isAdmin;
    },
  },
  extraReducers: {
    [logoutAsync.fulfilled]: state => {
      state.name = '';
      state.isAdmin = false;
    },
  },
});

export const {setUser} = authSlice.actions;

export const selectAuth = state => state.auth;

export default authSlice.reducer;
