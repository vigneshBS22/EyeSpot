import React, {useState, useEffect} from 'react';
import {NativeBaseProvider, Center, Spinner} from 'native-base';
import Searchbar from '../../components/Searchbar';
import {useDispatch, useSelector} from 'react-redux';
import {fetchItemData, searchData, selectItem} from '../../features/itemSlice';
import {selectAuth} from '../../features/authSlice';
import ItemModal from '../../components/itemModal';
import DisplayGame from '../../components/FetchNextItems';
import SearchItems from '../../components/SearchItems';
import {TYPE} from '../../constants';

const GamesScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const {status, gamesData, lastGameItem, gameLastVisible} =
    useSelector(selectItem);
  const {isAdmin} = useSelector(selectAuth);

  useEffect(() => {
    if (search === '') {
      dispatch(fetchItemData({type: TYPE.GAME}));
    }
  }, [search]);

  useEffect(() => {
    let timerId;
    if (search !== '') {
      timerId = setTimeout(() => {
        dispatch(searchData({type: TYPE.GAME, search: search}));
      }, 300);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [search]);

  return (
    <NativeBaseProvider>
      <Searchbar search={search} setSearch={setSearch} />
      {status === 'loading' && gamesData.length === 0 ? (
        <Spinner />
      ) : gamesData.length !== 0 ? (
        search === '' ? (
          <DisplayGame
            data={gamesData}
            type={TYPE.GAME}
            navigation={navigation}
          />
        ) : (
          <SearchItems
            data={gamesData}
            type={TYPE.GAME}
            navigation={navigation}
            search={search}
          />
        )
      ) : (
        <Center>No results found</Center>
      )}
      {isAdmin ? <ItemModal type={TYPE.GAME} /> : null}
    </NativeBaseProvider>
  );
};

export default GamesScreen;
