import {FlatList, Spinner} from 'native-base';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchNextItemData, selectItem} from '../features/itemSlice';
import GameCard from '../components/GameCard';
import AnimeCard from '../components/AnimeCard';

export default function FetchNextItems({data, navigation, type}) {
  const {lastAnimeItem, animeLastVisible, lastGameItem, gameLastVisible} =
    useSelector(selectItem);
  const dispatch = useDispatch();
  const getNextAnimeItems = async () => {
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

  const getNextGameItems = async () => {
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

  return type === 'anime' ? (
    <FlatList
      data={data}
      renderItem={({item}) => <AnimeCard navigation={navigation} item={item} />}
      keyExtractor={item => item.id}
      onEndReached={() => getNextAnimeItems()}
      onEndReachedThreshold={0.01}
      scrollEventThrottle={150}
      ListFooterComponent={!lastAnimeItem && <Spinner />}
    />
  ) : (
    <FlatList
      data={data}
      renderItem={({item}) => <GameCard navigation={navigation} item={item} />}
      keyExtractor={item => item.id}
      onEndReached={() => getNextGameItems()}
      onEndReachedThreshold={0.01}
      scrollEventThrottle={150}
      ListFooterComponent={!lastGameItem && <Spinner />}
    />
  );
}
