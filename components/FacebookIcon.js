import React from 'react';
import {Text, Box} from 'native-base';
import {onFacebookButtonPress} from '../utils/facebookLogin';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const FacebookIcon = () => {
  return (
    <Box shadow={9}>
      <FontAwesomeIcon.Button
        name="facebook"
        backgroundColor="#4285F4"
        style={{width: 150, height: 47}}
        onPress={onFacebookButtonPress}>
        <Text fontSize={18} color={'white'} style={{width: 90}} bold>
          Facebook
        </Text>
      </FontAwesomeIcon.Button>
    </Box>
  );
};

export default FacebookIcon;
