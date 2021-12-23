import React, {useState, useEffect} from 'react';
import {NativeBaseProvider, FlatList} from 'native-base';
import Card from '../../components/AnimeCard';
import Searchbar from '../../components/Searchbar';
import firestore from '@react-native-firebase/firestore';

const AnimeScreen = ({navigation}) => {
  const [animeData, setAnimeData] = useState();

  useEffect(() => {
    const subscriber = firestore()
      .collection('Items')
      .where('type', '==', 'anime')
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAnimeData(data);
      });
    return subscriber;
  }, []);

  return (
    <NativeBaseProvider>
      <Searchbar />
      <FlatList
        data={animeData}
        renderItem={({item}) => <Card navigation={navigation} item={item} />}
        keyExtractor={item => item.id}
      />
    </NativeBaseProvider>
  );
};

export default AnimeScreen;
