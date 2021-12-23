import React, {useState, useEffect} from 'react';
import {NativeBaseProvider, FlatList} from 'native-base';
import Card from '../../components/GameCard';
import Searchbar from '../../components/Searchbar';
import firestore from '@react-native-firebase/firestore';

const GamesScreen = ({navigation}) => {
  const [gamesData, setGamesData] = useState({});

  useEffect(() => {
    const subscriber = firestore()
      .collection('Items')
      .where('type', '==', 'game')
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGamesData(data);
      });
    return subscriber;
  }, []);

  return (
    <NativeBaseProvider>
      <Searchbar />
      <FlatList
        data={gamesData}
        renderItem={({item}) => <Card navigation={navigation} item={item} />}
        keyExtractor={item => item.id}
      />
    </NativeBaseProvider>
  );
};

export default GamesScreen;
