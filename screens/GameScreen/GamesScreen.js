import React, {useState, useEffect} from 'react';
import {
  NativeBaseProvider,
  FlatList,
  Center,
  Icon,
  IconButton,
  Spinner,
} from 'native-base';
import Card from '../../components/GameCard';
import Searchbar from '../../components/Searchbar';
import {useDispatch, useSelector} from 'react-redux';
import {fetchItemData, searchData, selectItem} from '../../features/itemSlice';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {selectAuth} from '../../features/authSlice';
import ItemModal from '../../components/itemModal';

const GamesScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const {status, gamesData} = useSelector(selectItem);
  const {isAdmin} = useSelector(selectAuth);

  useEffect(() => {
    if (search === '') {
      dispatch(fetchItemData({type: 'game'}));
    }
  }, [search]);

  useEffect(() => {
    let timerId;
    if (search !== '') {
      timerId = setTimeout(() => {
        dispatch(searchData({type: 'game', search: search}));
      }, 300);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [search]);

  return (
    <NativeBaseProvider>
      <Searchbar search={search} setSearch={setSearch} />
      {status === 'loading' ? (
        <Spinner />
      ) : gamesData.length !== 0 ? (
        <FlatList
          data={gamesData}
          renderItem={({item}) => <Card navigation={navigation} item={item} />}
          keyExtractor={item => item.id}
        />
      ) : (
        <Center>No results found</Center>
      )}
      {isAdmin ? <ItemModal type={'game'} /> : null}
    </NativeBaseProvider>
  );
};

export default GamesScreen;
