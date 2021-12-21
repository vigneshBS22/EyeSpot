import React from 'react';
import {NativeBaseProvider, Box, Center, Avatar, Text} from 'native-base';
import {useColor} from '../../Context/ColorContext';
import {useSelector} from 'react-redux';
import {selectAuth} from '../../features/authSlice';
import Card from '../../components/Card';

const HomeScreen = ({navigation}) => {
  const {
    state: {theme},
  } = useColor();
  const config = {
    dependencies: {
      'linear-gradient': require('react-native-linear-gradient').default,
    },
  };

  const {name} = useSelector(selectAuth);
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
      <Card />
    </NativeBaseProvider>
  );
};

export default HomeScreen;
