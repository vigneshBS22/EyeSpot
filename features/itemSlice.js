import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

export const fetchItemData = createAsyncThunk(
  'item/fetchItemData',
  async ({type, itemsPerLoad = 10}) => {
    try {
      let items = [];
      const snapshot = await firestore()
        .collection('Items')
        .where('type', '==', type)
        .orderBy('created_at', 'desc')
        .limit(itemsPerLoad)
        .get();

      const lastVisible = snapshot.docs[snapshot.docs.length - 1];

      snapshot.forEach(doc => {
        let data = doc.data();
        data.id = doc.id;
        items.push(data);
      });

      if (items.length === 0) {
        return {items, type: type, lastVisible: lastVisible, lastItem: true};
      } else {
        return {items, type: type, lastVisible: lastVisible, lastItem: false};
      }
    } catch (err) {
      console.log(err);
    }
  },
);

export const fetchNextItemData = createAsyncThunk(
  'item/fetchNextItemData',
  async ({type, startAfter, lastItem, itemsPerLoad = 10}) => {
    try {
      let items = [];
      let lastVisible;
      if (!lastItem) {
        const snapshot = await firestore()
          .collection('Items')
          .where('type', '==', type)
          .orderBy('created_at', 'desc')
          .startAfter(startAfter)
          .limit(itemsPerLoad)
          .get();

        snapshot.forEach(doc => {
          let data = doc.data();
          data.id = doc.id;
          items.push(data);
        });

        lastVisible = snapshot.docs[snapshot.docs.length - 1];
      }

      if (items.length === 0)
        return {items, type: type, lastVisible: lastVisible, lastItem: true};
      else {
        return {items, type: type, lastVisible: lastVisible, lastItem: false};
      }
    } catch (err) {
      console.log(err);
    }
  },
);

export const searchData = createAsyncThunk(
  'item/searchData',
  async ({type, search}) => {
    try {
      let items = [];

      // {todo:add type here and remove the resultSet filter}
      const snapshot = await firestore()
        .collection('Items')
        .where('name', '>=', search)
        .where('name', '<=', search + 'z')
        .get();

      snapshot.forEach(doc => {
        let data = doc.data();
        data.id = doc.id;
        items.push(data);
      });
      let resultSet = items.filter(item => item.type === type);
      return {resultSet, type: type};
    } catch (err) {
      console.log(err);
    }
  },
);

export const fetchReviewData = createAsyncThunk(
  'item/fetchReviewData',
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
  'item/fetchNextReviewData',
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
  'item/addReview',
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
      ThunkApi.dispatch(fetchReviewData({item_id}));
    } catch (err) {
      console.log(err);
    }
  },
);

export const addItem = createAsyncThunk(
  'item/addItem',
  async (
    {name, description, rating, episodes, language, image_url, type},
    ThunkApi,
  ) => {
    try {
      if (type === 'anime') {
        firestore().collection('Items').add({
          name: name,
          description: description,
          image_url: image_url,
          language: language,
          episodes: episodes,
          critics_rating: rating,
          type: type,
          created_at: firestore.Timestamp.now(),
        });
      } else {
        firestore().collection('Items').add({
          name: name,
          description: description,
          image_url: image_url,
          language: language,
          critics_rating: rating,
          type: type,
          created_at: firestore.Timestamp.now(),
        });
      }
      ThunkApi.dispatch(fetchItemData({type: type}));
    } catch (err) {
      console.log('here' + err);
    }
  },
);

export const itemSlice = createSlice({
  name: 'item',
  initialState: {
    animeData: [],
    gamesData: [],
    reviews: [],
    status: 'success',
    error: '',
    animeLastVisible: {},
    gameLastVisible: {},
    reviewLastVisible: {},
    lastAnimeItem: false,
    lastGameItem: false,
    lastReview: false,
  },
  reducers: {
    clearReviews: state => {
      state.reviews = [];
    },
    updateReview: (state, action) => {
      const newArray = [...state.reviews];
      newArray.splice(0, 0, {
        user_name: action.payload.user_name,
        message: action.payload.message,
        rating: action.payload.rating,
        id: 1,
        user_id: action.payload.user_id,
      });
      state.reviews = newArray;
    },
    updateItems: (state, action) => {
      if (action.payload.type === 'game') {
        const newArray = [...state.gamesData];
        newArray.splice(0, 0, {
          name: action.payload.name,
          description: action.payload.description,
          image_url: action.payload.image_url,
          language: action.payload.language,
          episodes: action.payload.episodes,
          critics_rating: action.payload.critics_rating,
          type: action.payload.type,
        });
        state.gamesData = newArray;
      } else {
        const newArray = [...state.animeData];
        newArray.splice(0, 0, {
          id: action.payload.name + 1,
          name: action.payload.name,
          description: action.payload.description,
          image_url: action.payload.image_url,
          language: action.payload.language,
          episodes: action.payload.episodes,
          critics_rating: action.payload.critics_rating,
          type: action.payload.type,
        });
        state.animeData = newArray;
      }
    },
  },
  extraReducers: {
    [fetchItemData.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchItemData.fulfilled]: (state, action) => {
      if (action.payload.type === 'anime') {
        state.animeData = action.payload.items;
        state.animeLastVisible = action.payload.lastVisible;
      } else {
        state.gamesData = action.payload.items;
        state.gameLastVisible = action.payload.lastVisible;
      }
      state.status = 'success';
    },
    [fetchItemData.rejected]: (state, action) => {
      state.status = 'success';
      state.error = action.error;
    },
    [fetchNextItemData.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchNextItemData.fulfilled]: (state, action) => {
      if (action.payload.type === 'anime') {
        state.animeData = [...state.animeData, ...action.payload.items];
        state.animeLastVisible = action.payload.lastVisible;
        state.lastAnimeItem = action.payload.lastItem;
      } else {
        state.gameData = [...state.animeData, ...action.payload.items];
        state.gameLastVisible = action.payload.lastVisible;
        state.lastGameItem = action.payload.lastItem;
      }
      state.status = 'success';
    },
    [fetchNextItemData.rejected]: (state, action) => {
      state.status = 'success';
      state.error = action.error;
    },
    [searchData.pending]: (state, action) => {
      state.status = 'loading';
    },
    [searchData.fulfilled]: (state, action) => {
      if (action.payload.type === 'anime') {
        state.animeData = action.payload.resultSet;
      } else {
        state.gameData = action.payload.resultSet;
      }
      state.status = 'success';
    },
    [searchData.rejected]: (state, action) => {
      state.status = 'success';
      state.error = action.error;
    },
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
  },
});

export const {clearReviews, updateReview, updateItems} = itemSlice.actions;

export const selectItem = state => state.item;

export default itemSlice.reducer;
