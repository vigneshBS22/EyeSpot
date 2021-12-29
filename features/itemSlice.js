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

export const fetchHomeItemData = createAsyncThunk(
  'item/fetchHomeItemData',
  async ({type, itemsPerLoad = 5}) => {
    try {
      let items = [];
      const snapshot = await firestore()
        .collection('Items')
        .where('type', '==', type)
        .orderBy('average_rating', 'desc')
        .limit(itemsPerLoad)
        .get();

      snapshot.forEach(doc => {
        let data = doc.data();
        data.id = doc.id;
        items.push(data);
      });

      return {items: items, type: type};
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
          average_rating: 0,
          total_ratings: 0,
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
          average_rating: 0,
          total_ratings: 0,
          created_at: firestore.Timestamp.now(),
        });
      }
      ThunkApi.dispatch(fetchItemData({type: type}));
    } catch (err) {
      console.log(err);
    }
  },
);

export const updateItemData = createAsyncThunk(
  'item/updateItemData',
  async ({rating, avgRating, count, itemId, type}, ThunkApi) => {
    const average_rating = (+avgRating + +rating) / (+count + 1);
    console.log(average_rating, count);
    try {
      firestore()
        .collection('Items')
        .doc(itemId)
        .update({average_rating: average_rating, total_ratings: +count + 1});
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
    homeScreenAnimeData: [],
    homeScreenGamesData: [],
    status: 'success',
    error: '',
    animeLastVisible: {},
    gameLastVisible: {},
    lastAnimeItem: false,
    lastGameItem: false,
  },
  reducers: {},
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
    [fetchHomeItemData.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchHomeItemData.fulfilled]: (state, action) => {
      if (action.payload.type === 'anime') {
        state.homeScreenAnimeData = action.payload.items;
      } else {
        state.homeScreenGamesData = action.payload.items;
      }
      state.status = 'success';
    },
    [fetchHomeItemData.rejected]: (state, action) => {
      state.status = 'success';
      state.error = action.error;
    },
  },
});

export const selectItem = state => state.item;

export default itemSlice.reducer;
