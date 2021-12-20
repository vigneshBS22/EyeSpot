import {Box, Text, Icon} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Path} from 'react-native-svg';
import {GoogleIconSVG} from '../constants';
import {useColor} from '../Context/ColorContext';
import {onGoogleButtonPress} from '../utils/googleLogin';

const GoogleIcon = () => {
  const {
    state: {theme},
  } = useColor();
  return (
    <TouchableOpacity onPress={onGoogleButtonPress}>
      <Box
        flexDirection={'row'}
        pr={4}
        bg={theme.inputbg}
        width={160}
        borderRadius={5}
        shadow={9}>
        {GoogleIconSVG}
        <Text mt={2.5} bold fontSize={18} color={theme.text}>
          Google
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

export default GoogleIcon;
