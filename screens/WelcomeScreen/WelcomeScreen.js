import React from 'react';
import {Text, Button, Image, Center, Box} from 'native-base';
import {useColor} from '../../Context/ColorContext';
import {ScreenName} from '../../Navigators/RootNavigator/constants';

const WelcomeScreen = ({navigation}) => {
  const {
    state: {theme},
  } = useColor();
  return (
    <Center flex={1} bg={theme.bg}>
      <Center px="3" py="1.5">
        <Button
          onPress={() => {
            navigation.navigate(ScreenName.LOGIN_SCREEN);
          }}>
          <Text fontSize={20}>Get Started</Text>
        </Button>
      </Center>
    </Center>
  );
};

export default WelcomeScreen;
