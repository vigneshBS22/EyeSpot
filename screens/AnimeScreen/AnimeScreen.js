import React, {useState, useEffect} from 'react';
import {NativeBaseProvider, FlatList, Spinner, Center} from 'native-base';
import Card from '../../components/AnimeCard';
import Searchbar from '../../components/Searchbar';
import {useDispatch, useSelector} from 'react-redux';
import {fetchItemData, searchData, selectItem} from '../../features/itemSlice';
import {selectAuth} from '../../features/authSlice';
import ItemModal from '../../components/itemModal';
import DisplayAnime from '../../components/FetchNextItems';
import SearchItems from '../../components/SearchItems';

const AnimeScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const {status, animeData} = useSelector(selectItem);
  const {isAdmin} = useSelector(selectAuth);

  useEffect(() => {
    if (search === '') {
      dispatch(fetchItemData({type: 'anime'}));
    }
  }, [search]);

  useEffect(() => {
    let timerId;
    if (search !== '') {
      timerId = setTimeout(() => {
        dispatch(searchData({type: 'anime', search: search}));
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
            type={'anime'}
            navigation={navigation}
          />
        ) : (
          <SearchItems
            data={animeData}
            type={'anime'}
            navigation={navigation}
            search={search}
          />
        )
      ) : (
        <Center>No results found</Center>
      )}
      {isAdmin ? <ItemModal type={'anime'} /> : null}
    </NativeBaseProvider>
  );
};

export default AnimeScreen;
