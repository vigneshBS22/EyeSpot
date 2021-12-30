import React, {useEffect} from 'react';
import {Text, Button, Center, useToast} from 'native-base';
import {useColor} from '../../Context/ColorContext';
import {ScreenName} from '../../Navigators/RootNavigator/constants';
import {useSelector} from 'react-redux';
import {selectAuth} from '../../features/authSlice';
import {ImageBackground} from 'react-native';

const WelcomeScreen = ({navigation}) => {
  const {
    state: {theme},
  } = useColor();

  const {click, name, status} = useSelector(selectAuth);
  const toast = useToast();

  useEffect(() => {
    if (click === false && name === null) {
      toast.show({
        title: 'Logged out successfully',
        status: 'success',
        duration: 2000,
        placement: 'top',
      });
    }
  }, [click]);
  return (
    <ImageBackground
      source={require('../../assets/games_animes.png')}
      resizeMode="cover"
      style={{flex: 1, justifyContent: 'flex-end'}}>
      <Center>
        {status !== 'loading' && (
          <Button
            onPress={() => {
              navigation.navigate(ScreenName.LOGIN_SCREEN);
            }}
            mb={10}
            bg={theme.primary}
            width={'80%'}>
            <Text fontSize={20}>Get Started</Text>
          </Button>
        )}
      </Center>
    </ImageBackground>
  );
};

export default WelcomeScreen;
