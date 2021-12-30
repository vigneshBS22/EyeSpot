import React, {useState, useEffect} from 'react';
import {NativeBaseProvider, FlatList, Center, Spinner} from 'native-base';
import Card from '../../components/GameCard';
import Searchbar from '../../components/Searchbar';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchItemData,
  fetchNextItemData,
  searchData,
  selectItem,
} from '../../features/itemSlice';
import {selectAuth} from '../../features/authSlice';
import ItemModal from '../../components/itemModal';

const GamesScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const {status, gamesData, lastGameItem, gameLastVisible} =
    useSelector(selectItem);
  const {isAdmin} = useSelector(selectAuth);

  useEffect(() => {
    if (search === '') {
      dispatch(fetchItemData({type: 'game'}));
    }
  }, [search]);

  useEffect(() => {
    let timerId;
    if (search !== '') {
      console.log('search');
      timerId = setTimeout(() => {
        dispatch(searchData({type: 'game', search: search}));
      }, 300);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [search]);

  const getNextItems = async () => {
    if (!lastGameItem) {
      dispatch(
        fetchNextItemData({
          type: 'game',
          startAfter: gameLastVisible,
          lastItem: lastGameItem,
        }),
      );
    }
  };

  return (
    <NativeBaseProvider>
      <Searchbar search={search} setSearch={setSearch} />
      {status === 'loading' && gamesData.length === 0 ? (
        <Spinner />
      ) : gamesData.length !== 0 ? (
        <FlatList
          data={gamesData}
          renderItem={({item}) => <Card navigation={navigation} item={item} />}
          keyExtractor={item => item.id}
          onEndReached={() => getNextItems()}
          onEndReachedThreshold={0.01}
          scrollEventThrottle={150}
          ListFooterComponent={!lastGameItem && <Spinner />}
        />
      ) : (
        <Center>No results found</Center>
      )}
      {isAdmin ? <ItemModal type={'game'} /> : null}
    </NativeBaseProvider>
  );
};

export default GamesScreen;
