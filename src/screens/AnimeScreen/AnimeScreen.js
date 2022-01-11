import React, {useState, useEffect} from 'react';
import {NativeBaseProvider, FlatList, Spinner, Center} from 'native-base';
import Searchbar from '../../components/Searchbar';
import {useDispatch, useSelector} from 'react-redux';
import {fetchItemData, searchData, selectItem} from '../../features/itemSlice';
import {selectAuth} from '../../features/authSlice';
import ItemModal from '../../components/itemModal';
import DisplayAnime from '../../components/FetchNextItems';
import SearchItems from '../../components/SearchItems';
import {TYPE} from '../../constants';

const AnimeScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const {status, animeData} = useSelector(selectItem);
  const {isAdmin} = useSelector(selectAuth);

  useEffect(() => {
    if (search === '') {
      dispatch(fetchItemData({type: TYPE.ANIME}));
    }
  }, [search]);

  useEffect(() => {
    let timerId;
    if (search !== '') {
      timerId = setTimeout(() => {
        dispatch(searchData({type: TYPE.ANIME, search: search}));
      }, 300);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [search]);

  return (
    <NativeBaseProvider>
      <Searchbar search={search} setSearch={setSearch} />
      {status === 'loading' && animeData.length === 0 ? (
        <Spinner />
      ) : animeData.length !== 0 ? (
        search === '' ? (
          <DisplayAnime
            data={animeData}
            type={TYPE.ANIME}
            navigation={navigation}
          />
        ) : (
          <SearchItems
            data={animeData}
            type={TYPE.ANIME}
            navigation={navigation}
            search={search}
          />
        )
      ) : (
        <Center>No results found</Center>
      )}
      {isAdmin ? <ItemModal type={TYPE.ANIME} /> : null}
    </NativeBaseProvider>
  );
};

export default AnimeScreen;
