import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'item',
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
      state.isAdmin = action.payload.isAdmin;
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
