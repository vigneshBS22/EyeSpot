import React from 'react';
import {Text, Button, Image, Center, Box} from 'native-base';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useColor} from '../../Context/ColorContext';

const WelcomeScreen = ({navigation}) => {
  const {
    state: {theme},
  } = useColor();
  return (
    <Center flex={1} bg={theme.bg}>
      <Center px="3" py="1.5">
        <Button
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text fontSize={20}>Get Started</Text>
        </Button>
      </Center>
    </Center>
  );
};

export default WelcomeScreen;
