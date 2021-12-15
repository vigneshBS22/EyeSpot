import {Button, NativeBaseProvider} from 'native-base';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import auth from '@react-native-firebase/auth';

const SettingScreen = ({navigation}) => {
  return (
    <NativeBaseProvider>
      <Text>Setting Screen</Text>
      <Button
        mt="2"
        colorScheme="indigo"
        onPress={() => {
          auth()
            .signOut()
            .then(() => console.log('User signed out!'));
        }}>
        Log out
      </Button>
    </NativeBaseProvider>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
