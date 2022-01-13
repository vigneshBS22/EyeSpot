import {Box, Text, Icon} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {GoogleIconSVG} from '../constants';
import {useColor} from '../Context/ColorContext';
import {googleLoginAsync, updateClick} from '../store/authSlice';

const GoogleIcon = () => {
  const {
    state: {theme},
  } = useColor();
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(googleLoginAsync());
        dispatch(updateClick());
      }}>
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
