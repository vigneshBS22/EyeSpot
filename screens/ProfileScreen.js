import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

const ProfileScreen = ({navigation, setLogin}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>This is the profile screen</Text>
      <TouchableOpacity
        onPress={() => {
          setLogin(true);
        }}>
        <Text>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
