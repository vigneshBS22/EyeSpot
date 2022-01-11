import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

export const fetchReviewData = createAsyncThunk(
  'review/fetchReviewData',
  async ({item_id, itemsPerLoad = 5}) => {
    try {
      let reviews = [];
      const snapshot = await firestore()
        .collection('Reviews')
        .where('item_id', '==', item_id)
        .orderBy('created_at', 'desc')
        .limit(itemsPerLoad)
        .get();

      const lastVisible = snapshot.docs[snapshot.docs.length - 1];

      snapshot.forEach(doc => {
        let data = doc.data();
        data.id = doc.id;
        reviews.push(data);
      });

      if (reviews.length === 0) {
        return {reviews, lastVisible: lastVisible, lastReview: true};
      } else {
        return {reviews, lastVisible: lastVisible, lastReview: false};
      }
    } catch (err) {
      console.log(err);
    }
  },
);

export const fetchNextReviewData = createAsyncThunk(
  'review/fetchNextReviewData',
  async ({item_id, startAfter, lastReview, itemsPerLoad = 5}) => {
    try {
      let reviews = [];
      let lastVisible;
      if (!lastReview) {
        const snapshot = await firestore()
          .collection('Reviews')
          .where('item_id', '==', item_id)
          .orderBy('created_at', 'desc')
          .startAfter(startAfter)
          .limit(itemsPerLoad)
          .get();

        snapshot.forEach(doc => {
          let data = doc.data();
          data.id = doc.id;
          reviews.push(data);
        });
        lastVisible = snapshot.docs[snapshot.docs.length - 1];
      }

      if (reviews.length === 0)
        return {
          reviews,
          lastVisible: lastVisible,
          lastReview: true,
        };
      else {
        return {
          reviews,
          lastVisible: lastVisible,
          lastReview: false,
        };
      }
    } catch (err) {
      console.log(err);
    }
  },
);

export const addReview = createAsyncThunk(
  'review/addReview',
  async ({item_id, user_id, user_name, message, rating}, ThunkApi) => {
    try {
      firestore().collection('Reviews').add({
        item_id: item_id,
        user_id: user_id,
        user_name: user_name,
        message: message,
        rating: rating,
        created_at: firestore.Timestamp.now(),
      });
      await ThunkApi.dispatch(checkReview({item_id, user_id}));
      ThunkApi.dispatch(fetchReviewData({item_id}));
    } catch (err) {
      console.log(err);
    }
  },
);

export const updateReview = createAsyncThunk(
  'review/updateReview',
  async ({review_id, message, rating, item_id}, ThunkApi) => {
    try {
      firestore().collection('Reviews').doc(review_id).update({
        message: message,
        rating: rating,
        created_at: firestore.Timestamp.now(),
      });
      ThunkApi.dispatch(fetchReviewData({item_id}));
    } catch (err) {
      console.log(err);
    }
  },
);

export const checkReview = createAsyncThunk(
  'review/checkReview',
  async ({item_id, user_id}) => {
    try {
      const user = [];
      const snapshot = await firestore()
        .collection('Reviews')
        .where('item_id', '==', item_id)
        .where('user_id', '==', user_id)
        .get();
      snapshot.forEach(doc => {
        let data = doc.data();
        data.id = doc.id;
        user.push(data);
      });
      return {user: user};
    } catch (err) {
      console.log(err);
    }
  },
);

export const reviewSlice = createSlice({
  name: 'review',
  initialState: {
    reviews: [],
    status: 'success',
    error: '',
    reviewLastVisible: {},
    lastReview: false,
    user: [],
  },
  reducers: {
    clearReviews: state => {
      state.reviews = [];
      state.reviewLastVisible = {};
      state.lastReview = false;
      state.user = [];
    },
  },
  extraReducers: {
    [fetchReviewData.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchReviewData.fulfilled]: (state, action) => {
      state.reviews = action.payload.reviews;
      state.reviewLastVisible = action.payload.lastVisible;
      state.lastReview = action.payload.lastReview;
      state.status = 'success';
    },
    [fetchReviewData.rejected]: (state, action) => {
      state.status = 'success';
      state.error = action.error;
    },
    [fetchNextReviewData.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchNextReviewData.fulfilled]: (state, action) => {
      state.reviews = [...state.reviews, ...action.payload.reviews];
      state.reviewLastVisible = action.payload.lastVisible;
      state.lastReview = action.payload.lastReview;
      state.status = 'success';
    },
    [fetchNextReviewData.rejected]: (state, action) => {
      state.status = 'success';
      state.error = action.error;
    },
    [checkReview.pending]: state => {
      state.status = 'loading';
    },
    [checkReview.fulfilled]: (state, action) => {
      state.status = 'success';
      state.user = action.payload.user;
    },
  },
});

export const {clearReviews} = reviewSlice.actions;

export const selectReview = state => state.review;

export default reviewSlice.reducer;
