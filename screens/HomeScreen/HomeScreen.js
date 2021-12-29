import React, {useEffect} from 'react';
import {
  NativeBaseProvider,
  Box,
  Center,
  Avatar,
  Text,
  FlatList,
} from 'native-base';
import {useColor} from '../../Context/ColorContext';
import {useDispatch, useSelector} from 'react-redux';
import {selectAuth} from '../../features/authSlice';
import HorizontalCard from '../../components/HorizontalCard';
import {fetchHomeItemData, selectItem} from '../../features/itemSlice';

const HomeScreen = ({navigation}) => {
  const {
    state: {theme},
  } = useColor();
  const config = {
    dependencies: {
      'linear-gradient': require('react-native-linear-gradient').default,
    },
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHomeItemData({type: 'anime'}));
    dispatch(fetchHomeItemData({type: 'game'}));
  }, []);

  const {name} = useSelector(selectAuth);
  const {homeScreenAnimeData, homeScreenGamesData} = useSelector(selectItem);
  return (
    <NativeBaseProvider config={config}>
      <Box
        bg={{
          linearGradient: {
            colors: ['lightBlue.300', 'violet.800'],
            start: [0, 0],
            end: [1, 0],
          },
        }}
        p="12">
        <Center flexDir={'row'} justifyContent={'space-between'}>
          <Box width={'70%'}>
            <Text fontSize={'lg'} bold color={theme.bg}>
              Welcome, {name}
            </Text>
            <Text fontSize={'md'} color={theme.bg} mt={3}>
              What would you like to explore?
            </Text>
          </Box>
          <Avatar bg="indigo.500" alignSelf="center" size="lg">
            {name.charAt(0)}
          </Avatar>
        </Center>
      </Box>
      <Box
        height={50}
        width={'full'}
        position={'absolute'}
        top={'22%'}
        borderTopRadius={20}
        bg={'#f2f2f2'}></Box>

      <Box height={'full'}>
        <Box>
          <Text my={4} fontSize={'md'} bold mx={2}>
            Trending Animes
          </Text>
          <FlatList
            data={homeScreenAnimeData}
            renderItem={({item}) => (
              <HorizontalCard navigation={navigation} item={item} />
            )}
            keyExtractor={item => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </Box>
        <Box>
          <Text my={4} fontSize={'md'} bold mx={2}>
            Trending Games
          </Text>
          <FlatList
            data={homeScreenGamesData}
            renderItem={({item}) => (
              <HorizontalCard navigation={navigation} item={item} />
            )}
            keyExtractor={item => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </Box>
      </Box>
    </NativeBaseProvider>
  );
};

export default HomeScreen;
