import React, {useState, useEffect} from 'react';
import {NativeBaseProvider, FlatList, Spinner, Center} from 'native-base';
import Card from '../../components/AnimeCard';
import Searchbar from '../../components/Searchbar';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchItemData,
  searchData,
  selectItem,
  fetchNextItemData,
} from '../../features/itemSlice';
import {selectAuth} from '../../features/authSlice';
import ItemModal from '../../components/itemModal';

const AnimeScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const {status, animeData, lastAnimeItem, animeLastVisible} =
    useSelector(selectItem);
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

  const getNextItems = async () => {
    if (!lastAnimeItem) {
      dispatch(
        fetchNextItemData({
          type: 'anime',
          startAfter: animeLastVisible,
          lastItem: lastAnimeItem,
        }),
      );
    }
  };

  return (
    <NativeBaseProvider>
      <Searchbar search={search} setSearch={setSearch} />
      {status === 'loading' ? (
        <Spinner />
      ) : animeData.length !== 0 ? (
        <FlatList
          data={animeData}
          renderItem={({item}) => <Card navigation={navigation} item={item} />}
          keyExtractor={item => item.id}
          onEndReached={() => getNextItems()}
          onEndReachedThreshold={0.01}
          scrollEventThrottle={150}
          ListFooterComponent={!lastAnimeItem && <Spinner />}
        />
      ) : (
        <Center>No results found</Center>
      )}
      {console.log(isAdmin)}
      {isAdmin ? <ItemModal type={'anime'} /> : null}
    </NativeBaseProvider>
  );
};

export default AnimeScreen;
