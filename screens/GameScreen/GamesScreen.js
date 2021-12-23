import React, {useState, useEffect} from 'react';
import {NativeBaseProvider, FlatList, Text} from 'native-base';
import Card from '../../components/GameCard';
import Searchbar from '../../components/Searchbar';
import firestore from '@react-native-firebase/firestore';

const GamesScreen = ({navigation}) => {
  const [gamesData, setGamesData] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    let subscriber;
    if (search === '') {
      subscriber = firestore()
        .collection('Items')
        .where('type', '==', 'game')
        .onSnapshot(snapshot => {
          const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setGamesData(data);
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
              setGamesData(data);
              console.log(Date.now(), 'changed');
            }
          });
      }, 300);
    }
    return () => {
      clearTimeout(timerId);
      subscriber;
    };
  }, [search]);

  return (
    <NativeBaseProvider>
      <Searchbar search={search} setSearch={setSearch} />
      {gamesData.length !== 0 ? (
        <FlatList
          data={gamesData}
          renderItem={({item}) => <Card navigation={navigation} item={item} />}
          keyExtractor={item => item.id}
        />
      ) : (
        <Text>No results found</Text>
      )}
    </NativeBaseProvider>
  );
};

export default GamesScreen;
