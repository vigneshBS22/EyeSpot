import React, {useEffect} from 'react';
import {
  Box,
  Center,
  Avatar,
  Text,
  FlatList,
  useToast,
  ScrollView,
  Spinner,
} from 'native-base';
import {useColor} from '../../Context/ColorContext';
import {useDispatch, useSelector} from 'react-redux';
import {selectAuth} from '../../store/authSlice';
import HorizontalCard from '../../components//HorizontalCard';
import {fetchHomeItemData, selectItem} from '../../store/itemSlice';
import {Dimensions} from 'react-native';
import {TYPE} from '../../constants';
import {TOAST} from './constants';

const HomeScreen = ({navigation}) => {
  const windowHeight = Dimensions.get('window').height;

  const {
    state: {theme},
  } = useColor();

  const dispatch = useDispatch();

  const {click} = useSelector(selectAuth);
  const toast = useToast();

  useEffect(() => {
    if (click === true) {
      toast.show({
        title: TOAST.TITLE,
        status: 'success',
        duration: 2000,
        placement: 'top',
      });
    }
  }, [click]);

  useEffect(() => {
    dispatch(fetchHomeItemData({type: TYPE.ANIME}));
    dispatch(fetchHomeItemData({type: TYPE.GAME}));
  }, []);

  const {name} = useSelector(selectAuth);
  const {homeScreenAnimeData, homeScreenGamesData, homeStatus} =
    useSelector(selectItem);
  return (
    <ScrollView flex={1} scrollEnabled={true} bg={theme.homeScreenbg}>
      <Box
        bg={{
          linearGradient: {
            colors: ['lightBlue.300', 'violet.800'],
            start: [0, 0],
            end: [1, 0],
          },
        }}
        p="12"
        flex={1}>
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
        flex={1}
        borderTopRadius={20}
        bg={theme.homeScreenbg}
        position={'relative'}
        _ios={{bottom: windowHeight * 0.03}}
        _android={{bottom: windowHeight * 0.04}}>
        <Box>
          <Text my={4} fontSize={'md'} bold mx={2} color={theme.text}>
            Trending Animes
          </Text>
          {homeStatus === 'loading' ? (
            <Spinner size="lg" />
          ) : (
            <FlatList
              data={homeScreenAnimeData}
              renderItem={({item}) => (
                <HorizontalCard navigation={navigation} item={item} />
              )}
              keyExtractor={item => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </Box>
        <Box>
          <Text my={4} fontSize={'md'} bold mx={2} color={theme.text}>
            Trending Games
          </Text>
          {homeStatus === 'loading' ? (
            <Spinner size="lg" />
          ) : (
            <FlatList
              data={homeScreenGamesData}
              renderItem={({item}) => (
                <HorizontalCard navigation={navigation} item={item} />
              )}
              keyExtractor={item => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </Box>
      </Box>
    </ScrollView>
  );
};

export default HomeScreen;
