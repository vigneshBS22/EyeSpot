import {FlatList, Spinner} from 'native-base';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchNextItemData, selectItem} from '../store/itemSlice';
import GameCard from '../components/GameCard';
import AnimeCard from '../components/AnimeCard';
import {TYPE} from '../constants';
import {useCallback} from 'react';

export default function FetchNextItems({data, navigation, type}) {
  const {lastAnimeItem, animeLastVisible, lastGameItem, gameLastVisible} =
    useSelector(selectItem);
  const dispatch = useDispatch();

  const getNextAnimeItems = useCallback(() => {
    if (!lastAnimeItem) {
      dispatch(
        fetchNextItemData({
          type: TYPE.ANIME,
          startAfter: animeLastVisible,
          lastItem: lastAnimeItem,
        }),
      );
    }
  }, [lastAnimeItem, animeLastVisible]);

  const getNextGameItems = useCallback(() => {
    if (!lastGameItem) {
      dispatch(
        fetchNextItemData({
          type: TYPE.GAME,
          startAfter: gameLastVisible,
          lastItem: lastGameItem,
        }),
      );
    }
  }, [lastGameItem, gameLastVisible]);

  return type === TYPE.ANIME ? (
    <FlatList
      data={data}
      renderItem={({item}) => <AnimeCard navigation={navigation} item={item} />}
      keyExtractor={item => item.id}
      onEndReached={getNextAnimeItems}
      onEndReachedThreshold={0.01}
      scrollEventThrottle={150}
      ListFooterComponent={!lastAnimeItem && <Spinner />}
    />
  ) : (
    <FlatList
      data={data}
      renderItem={({item}) => <GameCard navigation={navigation} item={item} />}
      keyExtractor={item => item.id}
      onEndReached={getNextGameItems}
      onEndReachedThreshold={0.01}
      scrollEventThrottle={150}
      ListFooterComponent={!lastGameItem && <Spinner />}
    />
  );
}
