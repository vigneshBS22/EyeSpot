import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

const ProfileScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>This is the profile screen</Text>
      <TouchableOpacity>
        <Text>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
