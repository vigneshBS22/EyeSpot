import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export const fetchItemData = createAsyncThunk(
  'item/fetchItemData',
  async ({type, itemsPerLoad = 3}) => {
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
  async ({type, search, itemsPerLoad = 3}) => {
    try {
      let items = [];
      // {todo:add type here and remove the resultSet filter}
      const snapshot = await firestore()
        .collection('Items')
        .where('type', '==', type)
        .where('name', '>=', search)
        .where('name', '<=', search + 'z')
        .limit(itemsPerLoad)
        .get();

      const lastVisible = snapshot.docs[snapshot.docs.length - 1];

      snapshot.forEach(doc => {
        let data = doc.data();
        data.id = doc.id;
        items.push(data);
      });
      // let resultSet = items.filter(item => item.type === type);

      if (items.length === 0) {
        return {
          resultSet: items,
          type: type,
          lastVisible: lastVisible,
          lastItem: true,
        };
      } else {
        return {
          resultSet: items,
          type: type,
          lastVisible: lastVisible,
          lastItem: false,
        };
      }
    } catch (err) {
      console.log(err);
    }
  },
);

export const searchNextItems = createAsyncThunk(
  'item/searchNextData',
  async ({type, search, startAfter, lastItem, itemsPerLoad = 3}) => {
    try {
      let items = [];
      let lastVisible;
      if (!lastItem) {
        const snapshot = await firestore()
          .collection('Items')
          .where('type', '==', type)
          .where('name', '>=', search)
          .where('name', '<=', search + 'z')
          .orderBy('name')
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
        return {
          resultSet: items,
          type: type,
          lastVisible: lastVisible,
          lastItem: true,
        };
      else {
        return {
          resultSet: items,
          type: type,
          lastVisible: lastVisible,
          lastItem: false,
        };
      }
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
      const imageUri = await ThunkApi.dispatch(uploadImage(image_url));
      if (type === 'anime') {
        await firestore().collection('Items').add({
          name: name,
          description: description,
          image_url: imageUri.payload,
          language: language,
          episodes: episodes,
          critics_rating: rating,
          type: type,
          average_rating: 0,
          total_ratings: 0,
          created_at: firestore.Timestamp.now(),
        });
      } else {
        await firestore().collection('Items').add({
          name: name,
          description: description,
          image_url: imageUri.payload,
          language: language,
          critics_rating: rating,
          type: type,
          average_rating: 0,
          total_ratings: 0,
          created_at: firestore.Timestamp.now(),
        });
      }
      await ThunkApi.dispatch(fetchItemData({type: type}));
    } catch (err) {
      throw err;
    }
  },
);

export const updateItemData = createAsyncThunk(
  'item/updateItemData',
  async ({rating, avgRating, count, itemId, type}, ThunkApi) => {
    const average_rating = (avgRating * count + rating) / (count + 1);
    try {
      await firestore()
        .collection('Items')
        .doc(itemId)
        .update({average_rating: average_rating, total_ratings: +count + 1});
      await ThunkApi.dispatch(fetchItemData({type: type}));
    } catch (err) {
      console.log('here' + err);
    }
  },
);

export const uploadImage = createAsyncThunk(
  'item/uploadImage',
  async image_url => {
    const uploadUri = image_url;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;
    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);
    try {
      await task;

      const url = await storageRef.getDownloadURL();

      return url;
    } catch (err) {
      throw err;
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
    searchLastVisible: {},
    lastAnimeItem: false,
    lastGameItem: false,
    lastSearchItem: false,
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
        state.lastAnimeItem = false;
      } else {
        state.gamesData = action.payload.items;
        state.gameLastVisible = action.payload.lastVisible;
        state.lastGameItem = false;
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
        state.gamesData = [...state.gamesData, ...action.payload.items];
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
        state.gamesData = action.payload.resultSet;
      }
      state.searchLastVisible = action.payload.lastVisible;
      state.lastSearchItem = false;
      state.status = 'success';
    },
    [searchData.rejected]: (state, action) => {
      state.status = 'success';
      state.error = action.error;
    },
    [searchNextItems.pending]: (state, action) => {
      state.status = 'loading';
    },
    [searchNextItems.fulfilled]: (state, action) => {
      if (action.payload.type === 'anime') {
        state.animeData = [...state.animeData, ...action.payload.resultSet];
      } else {
        state.gamesData = [...state.gamesData, ...action.payload.resultSet];
      }
      state.searchLastVisible = action.payload.lastVisible;
      state.lastSearchItem = action.payload.lastItem;
      state.status = 'success';
    },
    [searchNextItems.rejected]: (state, action) => {
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
