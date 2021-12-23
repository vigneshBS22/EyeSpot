import React, {useState, useEffect} from 'react';
import {NativeBaseProvider, FlatList, Text} from 'native-base';
import Card from '../../components/AnimeCard';
import Searchbar from '../../components/Searchbar';
import firestore from '@react-native-firebase/firestore';

const AnimeScreen = ({navigation}) => {
  const [animeData, setAnimeData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    let subscriber;
    if (search === '') {
      subscriber = firestore()
        .collection('Items')
        .where('type', '==', 'anime')
        .onSnapshot(snapshot => {
          const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setAnimeData(data);
        });
    }

    return subscriber;
  }, [search]);

  useEffect(() => {
    let subscriber;
    let timerId;
    if (search !== '') {
      timerId = setTimeout(() => {
        subscriber = firestore()
          .collection('Items')
          .where('name', '>=', search)
          .where('name', '<=', search + 'z')
          .onSnapshot(snapshot => {
            if (snapshot !== null) {
              const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
              }));
              setAnimeData(data);
            } else {
              console.log(snapshot);
            }
          });
      }, 300);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [search]);

  return (
    <NativeBaseProvider>
      <Searchbar search={search} setSearch={setSearch} />
      {animeData.length !== 0 ? (
        <FlatList
          data={animeData}
          renderItem={({item}) => <Card navigation={navigation} item={item} />}
          keyExtractor={item => item.id}
        />
      ) : (
        <Text>No results found</Text>
      )}
    </NativeBaseProvider>
  );
};

export default AnimeScreen;
