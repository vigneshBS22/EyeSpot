import React from 'react';
import {Text, Box} from 'native-base';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import {facebookLoginAsync, updateClick} from '../store/authSlice';

const FacebookIcon = () => {
  const dispatch = useDispatch();
  return (
    <Box shadow={9}>
      <FontAwesomeIcon.Button
        name="facebook"
        backgroundColor="#4285F4"
        style={{width: 150, height: 47}}
        onPress={() => {
          dispatch(facebookLoginAsync());
          dispatch(updateClick());
        }}>
        <Text fontSize={18} color={'white'} style={{width: 90}} bold>
          Facebook
        </Text>
      </FontAwesomeIcon.Button>
    </Box>
  );
};

export default FacebookIcon;
