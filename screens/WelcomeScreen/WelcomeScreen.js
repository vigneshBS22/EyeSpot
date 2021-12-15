import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const WelcomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Welcome Screen</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Login');
        }}>
        <Text>Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
